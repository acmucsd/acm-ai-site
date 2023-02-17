import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import { useHistory, useParams } from 'react-router-dom';
import DefaultLayout from '../../../components/layouts/default';
import { Link } from 'react-router-dom';
import { getMetaData, getRanks, getLeaderboard } from '../../../actions/competition';
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
  // users: string[];
  score: number;
  submitHistory: Array<string>;
  // last: Date;
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
    title: 'Submissions',
    dataIndex: 'submitHistory',
    // defaultSortOrder: 'descend',
    render: (v) => v.length,
    sorter: (a, b) => a.submitHistory.length - b.submitHistory.length,
  },
];

const CompetitionLeaderboardPage = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [updateTime, setUpdateTime] = useState<Date>();
  // const [data, setData] = useState<any>([]);
  const [meta, setMeta] = useState<{competitionName: string, description: string, startDate: string, endDate: string} | null>(null);
  const [visible, setVisible] = useState(false);
  const [chart, setChart] = useState<ChartJS | null>(null);
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const [scoreHistTitle, setScoreHistTitle] = useState('');
  const params = useParams() as { id: string };
  const competitionID = params.id;

  const [data, setData] = useState<CompetitionData[]>([]);

  const update = () => {
    // Get team listing in order of scores
    getLeaderboard(competitionID).then(res => {
      let newData = res.data.map((d: any, index: number) => {
        return {
          rank: index + 1,
          team: d.teamName,
          score: d.bestScore,
          submitHistory: d.submitHistory
        }
      })
      setData(newData)
    })
    getMetaData(competitionID).then((res) => {
      // console.log("METADATA", res.data);
      setMeta(res.data);
    });
  }

  useEffect(() => {
    update();
  }, []);

  useEffect(() => {
    setData(data.sort((a, b) => a.rank - b.rank));
    setLoading(false);
  }, []);

  return (
    <DefaultLayout>
      <div className="CompetitionLeaderboardPage">
        <br />
        <BackLink to="../" />
        <h2>{meta?.competitionName}</h2>
        {/* TODO: make this configurable */}
        <p>Upload submissions below and view the current leaderboard. This leaderboard will decide the initial seeds for the knockout bracket.</p>
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
            update();
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
