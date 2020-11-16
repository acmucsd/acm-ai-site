import React, { useEffect, useState } from 'react';
import './index.less';
import { useHistory } from 'react-router-dom';
import DefaultLayout from '../../components/layouts/default';
import { getNNRanks } from '../../actions/dimensions/tournament';
import { Table, Button } from 'antd';
import BackLink from '../../components/BackLink';
import path from 'path';

const NNRankPage = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [updateTime, setUpdateTime] = useState<Date>();
  const [data, setData] = useState<any>([]);

  // TODO: Define New Update function for NN Ranks
  const update = () => {
    getNNRanks().then((res) => {
      let newData = [];
      newData = res.data.map((info: any, ind: number) => {
        console.log(info, info.bestScore);
        return {
          username: info.username,
          score: info.bestScore,
          scorehist: info.scoreHistory.map((score: any, ind: number) => {
            return {
              x: ind,
              y: score,
            };
          }),
        };
      });
      setData(newData);
      setLoading(false);
      setUpdateTime(new Date());
    });
  };

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
        return <span>{info}</span>;
      },
    },
    {
      title: 'Score History',
      dataIndex: 'scorehist',
      render: (info: any) => {
        return (
          <Button
            onClick={() => {
              history.push({
                pathname: 'scorehist',
                state: {
                  data: info,
                },
              });
            }}
          >
            View Score History
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <DefaultLayout>
      <div className="NNRankPage">
        <br />
        <BackLink to="../" />
        <h2>Neural Network Modelling Competition Fall 2020</h2>
        <p>
          The objective of this competition is to model a unknown function as
          accurately as possible! All data, starter code can be found on{' '}
          <a href="https://github.com/acmucsd/NN-competition">the github</a>.
        </p>
        <p>
          This public leaderboard is ranked based on lowest Mean Squared Error
          scores, testing on 20% of the test data. Once the competition
          concludes, final results will be computed on 100% of the test data
        </p>
        <br />
        <Button
          onClick={() => {
            history.push(path.join(history.location.pathname, 'upload'));
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

        <Table loading={loading} columns={cols} dataSource={data} />
        {updateTime && <p>Last updated: {updateTime?.toLocaleString()}</p>}
      </div>
    </DefaultLayout>
  );
};

export default NNRankPage;
