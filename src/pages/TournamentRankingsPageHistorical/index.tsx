import React, { useEffect, useState } from 'react';
import './index.less';
import { Tournament } from '../../types/dimensions';
import DefaultLayout from '../../components/layouts/default';
import { Table, Layout } from 'antd';
import axios, { AxiosResponse } from 'axios';
const { Content } = Layout;
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
      let score = (
        info.rankState.rating.mu -
        info.rankState.rating.sigma * 3
      ).toFixed(3);
      return <span>{score}</span>;
    },
  },
  {
    title: 'Mu: µ',
    dataIndex: 'score',
    render: (info: any) => info.rankState.rating.mu.toFixed(3),
  },
  {
    title: 'Sigma: σ',
    dataIndex: 'score',
    render: (info: any) => info.rankState.rating.sigma.toFixed(3),
  },
  {
    title: 'Matches Played',
    dataIndex: 'matchesPlayed',
  },
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
    dataIndex: 'matchesPlayed',
  },
];
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
    render: (info: any) => <span>{info.rankState.rating.score}</span>,
  },
  {
    title: 'Matches Played',
    dataIndex: 'matchesPlayed',
  },
];
interface TournamentRankingsPageHistoricalProps {
  dataDir: string;
  description?: () => JSX.Element;
}

const TournamentRankingsPageHistorical = ({
  dataDir,
  description,
}: TournamentRankingsPageHistoricalProps) => {
  const [loading, setLoading] = useState(true);
  const [updateTime, setUpdateTime] = useState<Date>();
  const [tournament, setTournament] = useState<Tournament>();
  const [ranksystem, setRankSystem] = useState('trueskill');
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    axios
      .get(`/data/${dataDir}/tournament.json`)
      .then((res) => {
        setTournament(res.data.tournament);
        return res.data.tournament;
      })
      .then((tournament) => {
        let rankSystem = tournament!.configs.rankSystem;
        setRankSystem(rankSystem!);

        axios
          .get(`/data/${dataDir}/ranks.json`)
          .then((res: AxiosResponse) => res.data.ranks)
          .then((res) => {
            let newData = [];
            newData = res.map((info: any, ind: number) => {
              return {
                key: `${ind}`,
                username: info.player.username,
                pname: info.player.tournamentID.name,
                score: info,
                matchesPlayed: info.matchesPlayed,
              };
            });
            setData(newData);
            setLoading(false);
            setUpdateTime(new Date());
          });
      });
  }, [dataDir]);

  return (
    // <DefaultLayout> // This adds a header, but since its only usied for HideAndSeek2020Page,HideAndSeek2020 already has a header 
      <div className="TournamentRankingsPageHistorical">
        <Content>
          <div className="tournamentTitles">
            <h2>{tournament?.name} Final Rankings</h2>
            <p>{description && description()}</p>
          </div>
        </Content>
        <Content>
          <h3>Rankings</h3>
          {ranksystem === 'trueskill' && (
            <Table
              loading={loading}
              columns={trueskillCols}
              dataSource={data}
            />
          )}
          {ranksystem === 'elo' && (
            <Table loading={loading} columns={eloCols} dataSource={data} />
          )}
          {ranksystem === 'wins' && (
            <Table loading={loading} columns={winsCols} dataSource={data} />
          )}
          {updateTime && <p>Last updated: {updateTime?.toLocaleString()}</p>}
        </Content>
      </div>
    // </DefaultLayout>
  );
};

export default TournamentRankingsPageHistorical;
