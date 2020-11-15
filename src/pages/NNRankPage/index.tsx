import React, { useEffect, useState, useContext, useRef } from 'react';
import './index.less';
import { useParams, Link, useHistory } from 'react-router-dom';
import DefaultLayout from "../../components/layouts/default";
import { getNNRanks } from '../../actions/dimensions/tournament';
import { Table, Button } from 'antd';
import UserContext from '../../UserContext';
import TournamentContext from '../../contexts/tournament';
import BackLink from '../../components/BackLink';
import path from 'path';

function TournamentRankingsPage() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [ updateTime, setUpdateTime ] = useState<Date>();
  const [data, setData] = useState<any>([]);

  // TODO: Define New Update function for NN Ranks
  const update = () => {
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
    });
    
  }

  useEffect(() => {
      update();
  }, []);

  const cols = [
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
        <h2>Neural Network Competition</h2>
        <Button onClick={() => {
          history.push(path.join(history.location.pathname, 'upload'));
        }}>Upload Neural Network</Button>
        <Button className='refresh-btn' onClick={() => {
           update();
        }}>Refresh Leaderboard</Button>
        <br />
        <br />
        
        <Table 
          loading={loading}
          columns={cols}
          dataSource={data}
        />
        { updateTime && 
          <p>Last updated: {updateTime?.toLocaleString()}</p>
        }
      </div>
    </DefaultLayout>
  );
}

export default TournamentRankingsPage
