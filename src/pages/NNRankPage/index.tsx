import React, { useEffect, useState, useContext, useRef } from 'react';
import './index.less';
import { useParams, Link, useHistory } from 'react-router-dom';
import DefaultLayout from "../../components/layouts/default";
import { getRanks } from '../../actions/dimensions/tournament';
import TournamentActionButton from '../../components/TournamentActionButton';
import { Table, Button } from 'antd';
import UserContext from '../../UserContext';
import TournamentContext from '../../contexts/tournament';
import BackLink from '../../components/BackLink';
import path from 'path';

import Chart from 'chart.js';
import ScoreHistoryChart from '../../components/ScoreHistoryChart'

function TournamentRankingsPage() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [ updateTime, setUpdateTime ] = useState<Date>();
  const { user } = useContext(UserContext);
  const { tournament } = useContext(TournamentContext);
  //@ts-ignore
  const [ranksystem, setRankSystem] = useState<Tournament.RankSystem>('trueskill');
  const [data, setData] = useState<any>([]);

  // TODO: Define New Update function for NN Ranks
  // const update = () => {
  //   let rankSystem = tournament.configs.rankSystem;
  //   setRankSystem(rankSystem!);

  //   getRanks(tournament.dimID, tournament.id).then((res) => {
  //     let newData = [];
  //     newData = res.map((info: any, ind: number) => {
  //       return {
  //         key: `${ind}`,
  //         username: <Link to={`${path.join(window.location.pathname, `../user/${info.player.tournamentID.id}`)}`}>{info.player.username}</Link>,
  //         pname: info.player.tournamentID.name,
  //         score: info,
  //         matchesPlayed: info.matchesPlayed
  //       }
  //     });
  //     setData(newData);
  //     console.log(newData)
  //     setLoading(false);
  //     setUpdateTime(new Date());
  //   });
  // }

  // useEffect(() => {
  //   // if (tournament.id) {
  //   //   update();
  //   // }
  // }, [tournament]);

  const trueskillCols = [
    {
      title: 'User',
      dataIndex: 'username',
    },
    {
      title: 'Latest Top Score',
      dataIndex: 'score',
      render: (info: any) => {
        // let score = info.rankState.rating.score
        return (
          <span>{info}</span>
        )
      }
    },
    {
      title: 'Score History',
      dataIndex: 'scorehist',
      render: (info: any) => {

        return(
          
            <Button onClick={() => {
              history.push({
                pathname: 'nnranks/scorehist',
                state: {
                  data: info
                }
              })
            }}>View Score History</Button>

        );
      }
    }
  ];

  const sampleData = [
    {
      'username': "DDFTW",
      'score': 10,
      'scorehist': [
        {
          x: "01/11/2020", //new Date(2020, 11, 1, 0, 0, 0, 0),
          y: 1
        },
        {
          x: "02/11/2020",
          y: 2
        },
        {
          x: "03/11/2020",
          y: 6
        }
      ] 
    },
    {
      'username': "Jack",
      'score': 20,
      'scorehist': [
        {
          x: "01/11/2020", //new Date(2020, 11, 1, 0, 0, 0, 0),
          y: 2
        },
        {
          x: "02/11/2020",
          y: 5
        },
        {
          x: "03/11/2020",
          y: 7
        },
        {
          x: "04/11/2020",
          y: 10
        }
      ] 
    }
  ];

  // testing
  useEffect(() => {
    setLoading(false);
  },[])

  return (
    <DefaultLayout>
      <div className='TournamentRankingsPage'>
        <br />
        <BackLink to='../'/>
        {/* <h2>{tournament.configs.name}</h2> */}
        <h2>Neural Network</h2>
        <Button onClick={() => {
          history.push(path.join(history.location.pathname, '../upload'));
        }}>Upload Neural Network</Button>
        <Button className='refresh-btn' onClick={() => {
          // update();
        }}>Refresh Leaderboard</Button>
        <br />
        <br />
        {/* {
          tournament && user.admin && 
          <TournamentActionButton dimensionID={tournament.id} tournament={tournament} update={update}/>
        } */}
        
        { ranksystem === 'trueskill' && 
          <Table 
            loading={loading}
            columns={trueskillCols}
            dataSource={sampleData}
          />
        }
        { updateTime && 
          <p>Last updated: {updateTime?.toLocaleString()}</p>
        }
      </div>
    </DefaultLayout>
  );
}

export default TournamentRankingsPage
