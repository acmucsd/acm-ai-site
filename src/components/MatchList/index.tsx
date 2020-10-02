import React, { useState, useEffect, useContext, useCallback } from 'react';

import './index.less';
import { Match, Agent } from 'dimensions-ai';
import { Link, useParams } from 'react-router-dom';
import { Table, Button } from 'antd';
import MatchActionButton from '../MatchActionButton';
import UserContext from '../../UserContext';
import { DIMENSION_ID } from '../../configs';
import { downloadReplay } from '../../actions/tournament';
import { getUrlForAgentLog } from '../../actions/match';



export function useForceUpdate() {
  const [, setTick] = useState(0);
  const update = useCallback(() => {
    setTick(tick => tick + 1);
  }, [])
  return update;
}

const MatchList = (props: 
  {
    matches: {
      [x in string]: Match
    } | Array<Match>, 
    className?: string,
    loading?: boolean,
  } = {matches: {}, className:"", loading: false}
) => {
  const params: any = useParams();
  const { user } = useContext(UserContext);
  const [ data, setData ] = useState<Array<any>>([]);
  const update = () => {};

  const [ matchlogs, setMatchLogs ] = useState<Map<string, Array<{ url: string; agent: Agent; }>>>(new Map());
  const forceUpdate = useForceUpdate();
  const matchLinkRender = (match: Match) => 
  {
    if (params.tournamentID) {
      return (
        <Link to={`/tournaments/${params.tournamentID}/match/${match.id}`}>{match.name}</Link>
      )
    }
    else {
      return (
        <Link to={`/match/${match.id}`}>{match.name}</Link>
      )
    }
  }
  const columns = [
    {
      title: 'Match Name',
      dataIndex: 'matchname',
      render: matchLinkRender
    },
    {
      title: 'Players',
      dataIndex: 'players',
      render: (agents: Array<Agent>) => {
        return (
          <div>
            {
              (agents && agents.length) ? agents.map((a) => {
                return <Link className='profile-link' target='_blank' rel="noopener noreferrer" to={`/tournaments/${params.tournamentID}/user/${a.tournamentID.id}`}>{a.name}</Link>
              }) : <span>loading...</span>
            }
          </div>
        )
      }
    },
    {
      title: 'Creation Date',
      dataIndex: 'creationdate',
      render: (date: string) => {
        return (new Date(date)).toLocaleString()
      }
    },
    {
      title: 'Replay',
      dataIndex: 'replay',
      render: (match: Match) => {
        return (
          <>
            {match.id ? <Button onClick={
              () => {
                downloadReplay(DIMENSION_ID, params.tournamentID, match.id);
              }
            }>Replay</Button> : 'No Replay'}
          </>
        )
      }
    },
    {
      title: 'Result',
      dataIndex: 'result',
      render: (match: Match) => {
        return (
          <>
           {match.results ? <a target='_blank' rel="noopener noreferrer" href={process.env.REACT_APP_API + `/api/dimensions/${DIMENSION_ID}/match/${match.id}/results`}><div>Winner: {match.results.winner}, Loser: {match.results.loser}</div><div>Seeker: {match.results.seeker}, Hider: {match.results.hider}</div></a> : 'No results yet'}
          </>
        )
      }
    },
    {
      title: 'Logs',
      dataIndex: 'logs',
      render: (match: Match) => {
        return (
          <>
            {matchlogs.get(match.id) !== undefined ? matchlogs.get(match.id)!.map((info) => {
            console.log(info);
              return (
              <a target='_blank' rel="noopener noreferrer" href={info.url}><div>{info.agent.name} logs</div></a>
              );
            }) : 'No results yet'}
          </>
        );
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
    }
  ];
  const adminColumns = [...columns, {
    title: 'Action',
    dataIndex: 'action',
    render: (match: Match) => {
      //@ts-ignore
      return (<MatchActionButton match={match} update={update} dimensionID={DIMENSION_ID}/>)
    }
  }];
  const fetchLogs = (match: Match) => {
    let promises: Array<Promise<{url: string, agent: Agent}>> = [];
    if (match.results) {
      match.agents.forEach((agent) => {
        let geturlpromise = getUrlForAgentLog(DIMENSION_ID, match.id, agent.id).then((res) => {return {url: res.url, agent: agent}});
        promises.push(geturlpromise);
      });
    }
    Promise.all(promises).then((info) => {
      let newmatchlogs = matchlogs.set(match.id, info);
      setMatchLogs(newmatchlogs);
      forceUpdate();
    });
  }
  useEffect(() => {
    let newData: Array<any> = [];
    if (props.matches.length) {
      newData = (props.matches as Array<any>);
      newData = newData.map((match: Match) => {
        fetchLogs(match);
        return {
          key: match.id,
          matchname: match,
          result: match,
          players: match.agents,
          creationdate: match.creationDate,
          status: match.matchStatus,
          action: match,
          replay: match,
          logs: match,
        }
      });
    }
    else {
      let keys = Object.keys(props.matches);

      let matches = (props.matches as {[x in string]: Match});
      if (keys.length > 0) {
        for (let key in matches) {
          let match = matches[key];
          fetchLogs(match);
          newData.push({
            key: key,
            matchname: match,
            results: match,
            players: match.agents,
            creationdate: match.creationDate,
            status: match.matchStatus,
            action: match,
            replay: match,
            logs: match,
          });
        }
        
      }
    }
    setData(newData);
  }, [props.matches, matchlogs]);
  return (
    <div className={"MatchList " + props.className}>
      {
        user.admin ?
        <Table className='matchTable'
          columns={adminColumns}
          dataSource={data}
          loading={props.loading}
        /> :
        <Table className='matchTable'
          columns={columns}
          dataSource={data}
          loading={props.loading}
        />
      }
    </div>
  )
}

export default MatchList
