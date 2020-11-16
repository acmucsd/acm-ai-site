import React, { useState, useEffect, useContext, useCallback } from 'react';

import './index.less';
import { Agent, Match } from '../../../types/dimensions';
import { Link, useParams } from 'react-router-dom';
import { Table, Button } from 'antd';
import UserContext from '../../../UserContext';
import { downloadReplay } from '../../../actions/dimensions/tournament';
import { getUrlForAgentLog } from '../../../actions/dimensions/match';
import { competitionAPI } from '../../../configs';

export function useForceUpdate() {
  const [, setTick] = useState(0);
  const update = useCallback(() => {
    setTick((tick) => tick + 1);
  }, []);
  return update;
}

const MatchList = (
  props: {
    matches:
      | {
          [x in string]: Match;
        }
      | Array<Match>;
    className?: string;
    loading?: boolean;
    tournamentID: string;
    dimID: string;
    competitionKey: string;
  } = {
    matches: {},
    className: '',
    loading: false,
    tournamentID: '',
    dimID: '',
    competitionKey: '',
  }
) => {
  const params: any = useParams();
  const { user } = useContext(UserContext);
  const [data, setData] = useState<Array<any>>([]);
  const update = () => {};

  const [matchlogs, setMatchLogs] = useState<
    Map<string, Array<{ url: string; agent: Agent }>>
  >(new Map());
  const forceUpdate = useForceUpdate();
  const matchLinkRender = (match: Match) => {
    if (props.tournamentID) {
      return (
        <Link to={`/competitions/energium/match/${match.id}`}>
          {match.name}
        </Link>
      );
    } else {
      return <Link to={`/match/${match.id}`}>{match.name}</Link>;
    }
  };
  const columns = [
    {
      title: 'Match Name',
      dataIndex: 'matchname',
      render: matchLinkRender,
    },
    {
      title: 'Players',
      dataIndex: 'players',
      render: (agents: Array<Agent>) => {
        return (
          <div>
            {agents && agents.length ? (
              agents.map((a) => {
                return (
                  <Link
                    className="profile-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    to={`/competitions/${props.competitionKey}/user/${a.tournamentID.id}`}
                  >
                    {a.name}
                  </Link>
                );
              })
            ) : (
              <span>loading...</span>
            )}
          </div>
        );
      },
    },
    {
      title: 'Creation Date',
      dataIndex: 'creationdate',
      render: (date: string) => {
        return new Date(date).toLocaleString();
      },
    },
    {
      title: 'Replay',
      dataIndex: 'replay',
      render: (match: Match) => {
        return (
          <>
            {match.id ? (
              <>
                <Button
                  className="replaydownloadbtn"
                  onClick={() => {
                    downloadReplay(props.dimID, props.tournamentID, match.id);
                  }}
                >
                  Download Replay
                </Button>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`http://localhost:5000/?matchID=${match.id}`}
                >
                  <Button>Watch Replay</Button>
                </a>
              </>
            ) : (
              'No Replay'
            )}
          </>
        );
      },
    },
    {
      title: 'Result',
      dataIndex: 'result',
      render: (match: Match) => {
        let matchResult: JSX.Element = <span>Tie</span>;
        if (match.results) {
          const ranks = match.results.ranks;
          const agentRanks: Record<number, any> = {};
          agentRanks[ranks[0].agentID] = ranks[0].rank;
          agentRanks[ranks[1].agentID] = ranks[1].rank;
          if (agentRanks[0] < agentRanks[1]) {
            matchResult = (
              <span>
                1st: {match.results.stats['' + 0].name}, 2nd:{' '}
                {match.results.stats['' + 1].name}
              </span>
            );
          } else if (agentRanks[0] > agentRanks[1]) {
            matchResult = (
              <span>
                1st: {match.results.stats['' + 1].name}, 2nd:{' '}
                {match.results.stats['' + 0].name}
              </span>
            );
          }
          return (
            <>
              {match.results ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    competitionAPI +
                    `/dimensions/${props.dimID}/match/${match.id}/results`
                  }
                >
                  <div>{matchResult}</div>
                </a>
              ) : (
                'No results yet'
              )}
            </>
          );
        } else {
          return (
            <>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={
                  competitionAPI +
                  `/dimensions/${props.dimID}/match/${match.id}/results`
                }
              >
                <div>Error</div>
              </a>
            </>
          );
        }
      },
    },
    {
      title: 'Logs',
      dataIndex: 'logs',
      render: (match: Match) => {
        return (
          <>
            {matchlogs.get(match.id) !== undefined
              ? matchlogs.get(match.id)!.map((info) => {
                  return (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={info.url}
                    >
                      <div>{info.agent.name} logs</div>
                    </a>
                  );
                })
              : 'No results yet'}
          </>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  const fetchLogs = (match: Match) => {
    let promises: Array<Promise<{ url: string; agent: Agent }>> = [];
    match.agents.forEach((agent) => {
      if (agent.logkey !== null) {
        let geturlpromise = getUrlForAgentLog(
          props.dimID,
          match.id,
          agent.id
        ).then((res) => {
          return { url: res.url, agent: agent };
        });
        promises.push(geturlpromise);
      }
    });
    Promise.all(promises).then((info) => {
      let newmatchlogs = matchlogs.set(match.id, info);
      setMatchLogs(newmatchlogs);
      forceUpdate();
    });
  };
  useEffect(() => {
    let newData: Array<any> = [];
    if (props.matches.length) {
      newData = props.matches as Array<any>;
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
        };
      });
    } else {
      let keys = Object.keys(props.matches);

      let matches = props.matches as { [x in string]: Match };
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
    <div className={'MatchList ' + props.className}>
      {
        <Table
          className="matchTable"
          columns={columns}
          dataSource={data}
          loading={props.loading}
        />
      }
    </div>
  );
};

export default MatchList;
