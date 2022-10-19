import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import { useHistory, useParams } from 'react-router-dom';
import DefaultLayout from '../../../components/layouts/default';
import { Link } from 'react-router-dom';
import { getMetaData, getRanks } from '../../../actions/competition';
import { Table, Button, Modal } from 'antd';
import BackLink from '../../../components/BackLink';
import path from 'path';
import ChartJS from 'chart.js';
import { ColumnsType } from 'antd/lib/table';
const chartConfig = {
  type: 'line',
  data: {
    labels: [0],
    datasets: [
      {
        label: 'MSE Score',
        data: [],
        backgroundColor: '#ff6f6f80',
        borderColor: '#ff6f6f',
      },
    ],
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Score History',
    },
  },
};

const fakeCompetitionData = {
  name: 'Big Data Competition 2022',
  description:
    'Some filler description or explanation for how the scoring works.',
};

interface CompetitionData {
  rank: number;
  team: string;
  users: string[];
  score: number;
  entries: number;
  last: Date;
}

const columns: ColumnsType<CompetitionData> = [
  {
    title: 'Rank',
    dataIndex: 'rank',
    sorter: (a, b) => a.rank - b.rank,
    defaultSortOrder: 'ascend',
  },
  {
    title: 'Team',
    dataIndex: 'team',
    sorter: (a, b) => a.team.length - b.team.length,
    // sortDirections: ['descend'],
  },
  {
    title: 'Score',
    dataIndex: 'score',
    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.score - b.score,
  },
  {
    title: 'Entries',
    dataIndex: 'entries',
    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.entries - b.entries,
  },
];

const fakeData = [
  {
    rank: 1,
    team: 'A Team',
    users: ['Alex', 'Andy', 'Amy'],
    score: 0.999972,
    entries: 220,
    last: new Date('2022-10-16T03:24:00'),
  },
  {
    rank: 3,
    team: 'B List',
    users: ['Boron', 'Baux'],
    score: 0.2314,
    entries: 100,
    last: new Date('2022-10-13T15:52:00'),
  },
  {
    rank: 2,
    team: 'Team Solo Scoring',
    users: ['Gordon'],
    score: 0.42124,
    entries: 2,
    last: new Date('2022-10-16T13:10:00'),
  },
  {
    rank: 4,
    team: 'Kachow',
    users: ['Lightning McQueen'],
    score: 0.1293,
    entries: 1,
    last: new Date('2022-10-15T07:32:00'),
  },
];

const CompetitionLeaderboardPage = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [updateTime, setUpdateTime] = useState<Date>();
  // const [data, setData] = useState<any>([]);
  const [visible, setVisible] = useState(false);
  const [chart, setChart] = useState<ChartJS | null>(null);
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const [scoreHistTitle, setScoreHistTitle] = useState('');
  const [meta, setMeta] = useState<{ competitionName?: string }>({});
  const params = useParams() as { id: string };
  const competitionID = params.id;

  const [data, setData] = useState<CompetitionData[]>(fakeData);

  // const [chartTrigger, setTrigger] = useState(false);
  // useEffect(() => {
  //   if (chartContainer && chartContainer.current) {
  //     const myChartRef = chartContainer!.current!.getContext('2d');
  //     const newchart = new ChartJS(myChartRef!, chartConfig);
  //     setChart(newchart);
  //   }
  // }, [chartContainer, chartTrigger]);

  // // uses a second hook to address bug where chartContainer ref does not update in time nor triggers callback
  // useEffect(() => {
  //   setTrigger(visible);
  // }, [visible]);

  // const update = () => {
  //   getMetaData(competitionID).then((res) => {
  //     console.log('METADATA', res.data);
  //     setMeta(res.data);
  //   });
  //   getRanks(competitionID).then((res) => {
  //     let newData = [];
  //     newData = res.data.map((info: any) => {
  //       return {
  //         username: info.username,
  //         score: info.scoreHistory[info.scoreHistory.length - 1],
  //         scorehist: {
  //           startIndex: Math.max(info.scoreHistory.length - 10, 0),
  //           data: info.scoreHistory
  //             .slice(-10)
  //             .map((score: any, ind: number) => {
  //               return score.toFixed(6);
  //             }),
  //           username: info.username,
  //         },
  //       };
  //     });
  //     newData = newData
  //       .sort((a: any, b: any) => {
  //         return a.score - b.score;
  //       })
  //       .map((a: any, ind: number) => {
  //         return { ...a, username: `${ind + 1}. ${a.username}` };
  //       });
  //     setData(newData);
  //     setLoading(false);
  //     setUpdateTime(new Date());
  //   });
  // };

  // useEffect(() => {
  //   update();
  // }, []);

  // const cols = [
  //   {
  //     title: 'User',
  //     dataIndex: 'username',
  //   },
  //   {
  //     title: 'Latest Submission Score',
  //     dataIndex: 'score',
  //     render: (info: any) => {
  //       return <span>{info.toFixed(6)}</span>;
  //     },
  //   },
  //   {
  //     title: 'Score History',
  //     dataIndex: 'scorehist',
  //     render: (info: any) => {
  //       return (
  //         <Button
  //           onClick={() => {
  //             const data = info.data;
  //             setVisible(true);
  //             chartConfig.data.datasets[0].data = data;
  //             chartConfig.data.labels = [];
  //             for (let i = 0; i < data.length; i++) {
  //               chartConfig.data.labels.push(i + info.startIndex);
  //             }
  //             const title = 'Score history for ' + info.username;
  //             chartConfig.options.title.text = title;
  //             chart?.update();
  //             setScoreHistTitle(title);
  //           }}
  //         >
  //           View Score History
  //         </Button>
  //       );
  //     },
  //   },
  // ];

  // TODO: remove later
  useEffect(() => {
    setData(data.sort((a, b) => a.rank - b.rank));
    setLoading(false);
  }, []);

  return (
    <DefaultLayout>
      <div className="CompetitionLeaderboardPage">
        <br />
        <BackLink to="../" />
        <h2>{fakeCompetitionData.name}</h2>
        <p>{fakeCompetitionData.description}</p>
        <br />
        <Modal
          title={scoreHistTitle}
          visible={visible}
          footer={null}
          onCancel={() => {
            setVisible(false);
          }}
        >
          <div>
            <canvas ref={chartContainer} />
          </div>
        </Modal>
        <Button
          onClick={() => {
            history.push(path.join(history.location.pathname, '../upload'));
          }}
        >
          Upload Predictions
        </Button>
        <Button
          className="refresh-btn"
          onClick={() => {
            // update();
          }}
        >
          Refresh Leaderboard
        </Button>
        <br />
        <br />

        <Table loading={loading} columns={columns} dataSource={data} />
        {updateTime && <p>Last updated: {updateTime?.toLocaleString()}</p>}
      </div>
    </DefaultLayout>
  );
};

export default CompetitionLeaderboardPage;
