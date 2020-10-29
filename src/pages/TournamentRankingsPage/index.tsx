import React, { useEffect, useState, useContext } from 'react';
import './index.less';
import { Tournament } from '../../types/dimensions';
import { useParams, Link, useHistory } from 'react-router-dom';
import DefaultLayout from "../../components/layouts/default";
import { getRanks } from '../../actions/dimensions/tournament';
import TournamentActionButton from '../../components/TournamentActionButton';
import { Table, Button } from 'antd';
import UserContext from '../../UserContext';
import TournamentContext from '../../contexts/tournament';
import BackLink from '../../components/BackLink';
import path from 'path';

const trueskillCols = [
  {
    title: 'User',
    dataIndex: 'username',
  },
  {
    title: 'Bot name',
    dataIndex: 'pname',
  },
  {
    title: 'Score = µ - 3 * σ',
    dataIndex: 'score',
    render: (info: any) => {
      let score = (info.rankState.rating.mu - info.rankState.rating.sigma * 3).toFixed(3)
      return (
        <span>{score}</span>
      )
    }
  },
  {
    title: 'Mu: µ',
    dataIndex: 'score',
    render: (info: any) => info.rankState.rating.mu.toFixed(3)
  },
  {
    title: 'Sigma: σ',
    dataIndex: 'score',
    render: (info: any) => info.rankState.rating.sigma.toFixed(3)
  },
  {
    title: 'Matches Played',
    dataIndex: 'matchesPlayed'
  }
];
const winsCols = [
  {
    title: 'User',
    dataIndex: 'username',
  },
  {
    title: 'Bot name',
    dataIndex: 'pname',
  },
  {
    title: 'Wins',
    dataIndex: 'wins',
  },
  {
    title: 'Ties',
    dataIndex: 'ties',
  },
  {
    title: 'Losses',
    dataIndex: 'losses',
  },
  {
    title: 'Points',
    dataIndex: 'points',
  },
  {
    title: 'Matches Played',
    dataIndex: 'matchesPlayed'
  }
]
const eloCols = [
  {
    title: 'User',
    dataIndex: 'username',
  },
  {
    title: 'Bot name',
    dataIndex: 'pname',
  },
  {
    title: 'Score',
    dataIndex: 'score',
    render: (info: any) => <span>{info.rankState.rating.score}</span>
  },
  {
    title: 'Matches Played',
    dataIndex: 'matchesPlayed'
  }
]


function TournamentRankingsPage() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [ updateTime, setUpdateTime ] = useState<Date>();
  const { user } = useContext(UserContext);
  const { tournament } = useContext(TournamentContext);
  //@ts-ignore
  const [ranksystem, setRankSystem] = useState<Tournament.RankSystem>('trueskill');
  const [data, setData] = useState<any>([]);
  const update = () => {
    let rankSystem = tournament.configs.rankSystem;
    setRankSystem(rankSystem!);

    getRanks(tournament.dimID, tournament.id).then((res) => {
      let newData = [];
      newData = res.map((info: any, ind: number) => {
        return {
          key: `${ind}`,
          username: <Link to={`${path.join(window.location.pathname, `../user/${info.player.tournamentID.id}`)}`}>{info.player.username}</Link>,
          pname: info.player.tournamentID.name,
          score: info,
          matchesPlayed: info.matchesPlayed
        }
      });
      setData(newData);
      setLoading(false);
      setUpdateTime(new Date());
    });
  }
  useEffect(() => {
    if (tournament.id) {
      update();
    }
  }, [tournament]);
  return (
    <DefaultLayout>
      <div className='TournamentRankingsPage'>
        <br />
        <BackLink to='../'/>
        <h2>{tournament.configs.name}</h2>
        <Button onClick={() => {
          history.push(path.join(history.location.pathname, '../upload'));
        }}>Upload Bot</Button>
        <Button className='refresh-btn' onClick={() => {
          update();
        }}>Refresh Leaderboard</Button>
        <br />
        <br />
        {
          tournament && user.admin && 
          <TournamentActionButton dimensionID={tournament.id} tournament={tournament} update={update}/>
        }
        
        { ranksystem === 'trueskill' && 
          <Table 
            loading={loading}
            columns={trueskillCols}
            dataSource={data}
          />
        }
        { ranksystem === 'elo' && 
          <Table 
            loading={loading}
            columns={eloCols}
            dataSource={data}
          />
        }
        { ranksystem === 'wins' && 
          <Table 
            loading={loading}
            columns={winsCols}
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
