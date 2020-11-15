import React, { useEffect, useState, useContext, useRef } from 'react';
import './index.less';
import { Tournament } from '../../types/dimensions';
import { useParams, Link, useHistory } from 'react-router-dom';
import DefaultLayout from "../../components/layouts/default";
import { getNNRanks } from '../../actions/dimensions/tournament';
import TournamentActionButton from '../../components/TournamentActionButton';
import { Table, Button } from 'antd';
import UserContext from '../../UserContext';
import TournamentContext from '../../contexts/tournament';
import BackLink from '../../components/BackLink';
import path from 'path';

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
  const update = () => {
    // let rankSystem = tournament.configs.rankSystem;
    // setRankSystem(rankSystem!);
    console.log("getting ranks")
    getNNRanks().then((res) => {
      let newData = [];
      newData = res.data.map((info: any, ind: number) => {
        console.log(info, info.bestScore);
        return {
            'username': info.username,
            'score': info.bestScore,
            'scorehist' : info.scoreHistory.map((score:any, ind:number) => {
                return {
                  x : ind,
                  y : score
                }
            }), 
          }
        
      });
      setData(newData);
      setLoading(false);
      setUpdateTime(new Date());
      console.log('sadge')
    });
    
  }

  useEffect(() => {
      update();
  }, []);

  const trueskillCols = [
    {
      title: 'User',
      dataIndex: 'username',
    },
    {
      title: 'Latest Top Score',
      dataIndex: 'score',
      render: (info: any) => {
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
                pathname: 'scorehist',
                state: {
                  data: info
                }
              })
            }}>View Score History</Button>

        );
      }
    }
  ];

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
          history.push(path.join(history.location.pathname, 'upload'));
        }}>Upload Neural Network</Button>
        <Button className='refresh-btn' onClick={() => {
           update();
        }}>Refresh Leaderboard</Button>
        <br />
        <br />
        
        { ranksystem === 'trueskill' && 
          <Table 
            loading={loading}
            columns={trueskillCols}
            dataSource={data}
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
