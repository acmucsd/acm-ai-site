import React, { useEffect, useState, useContext } from 'react';
import './index.less';
import { Tournament } from 'dimensions-ai';
import DefaultLayout from "../../components/layouts/default";
import TournamentActionButton from '../../components/TournamentActionButton';
import { Table } from 'antd';
import UserContext from '../../UserContext';
import { DIMENSION_ID } from '../../configs';
import axios, { AxiosResponse } from 'axios';

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
interface TournamentRankingsPageHistoricalProps {
  dataDir: string;
  description?: () => JSX.Element;
}

const TournamentRankingsPageHistorical = ({ dataDir, description }: TournamentRankingsPageHistoricalProps) => {
  const [loading, setLoading] = useState(true);
  const [ updateTime, setUpdateTime ] = useState<Date>();
  const { user } = useContext(UserContext);
  const [tournament, setTournament] = useState<Tournament>();
  //@ts-ignore
  const [ranksystem, setRankSystem] = useState<Tournament.RankSystem>('trueskill');
  const [data, setData] = useState<any>([]);
  const update = () => {
    axios.get(`/data/${dataDir}/tournament.json`).then((res) => {
      setTournament(res.data.tournament);
      return res.data.tournament;
    }).then((tournament) => {
      let rankSystem = tournament!.configs.rankSystem;
      setRankSystem(rankSystem!);

      axios.get(`/data/${dataDir}/ranks.json`).then((res: AxiosResponse) => res.data.ranks).then((res) => {
        let newData = [];
        newData = res.map((info: any, ind: number) => {
          return {
            key: `${ind}`,
            username: info.player.username,
            pname: info.player.tournamentID.name,
            score: info,
            matchesPlayed: info.matchesPlayed
          }
        });
        setData(newData);
        setLoading(false);
        setUpdateTime(new Date());
      });
    });
  }
  useEffect(() => {
    update();
  }, []);
  return (
    <DefaultLayout>
      <div className='TournamentRankingsPage'>
        <br />
        <h2>{tournament?.name}</h2>
        <br />
        {description && description()}
        <br />
        <h3>Ranks</h3>
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

export default TournamentRankingsPageHistorical
