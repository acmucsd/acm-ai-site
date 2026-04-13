import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import { useHistory, useParams } from 'react-router-dom';
import DefaultLayout from '../../../components/layouts/default';
import { getMetaData, getLeaderboard, CompetitionData } from '../../../actions/competition';
import { Table, Button, Modal } from 'antd';
import path from 'path';
import { getColumnsForCompetition } from '../CompetitionPortalPage/leaderboardColumns';

const CompetitionLeaderboardPage = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [updateTime, setUpdateTime] = useState<Date>();
  // const [data, setData] = useState<any>([]);
  const [meta, setMeta] = useState<{
    competitionName: string;
    description: string;
    startDate: string;
    endDate: string;
    submissionsEnabled: boolean;
    teamGroups?: string[];
  } | null>(null);
  const [visible, setVisible] = useState(false);
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const [scoreHistTitle, setScoreHistTitle] = useState('');
  const params = useParams() as { id: string };
  const competitionID = params.id;

  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [data, setData] = useState<CompetitionData[]>([]);
  const [intervalObj, setIntervalObj] = useState<any>(null);
  const update = () => {
    // Get team listing in order of scores
    getLeaderboard(competitionID).then((res) => {
      let newData = res.data.map((d: any, index: number) => {
        return {
          rank: index + 1,
          team: d.teamName,
          teamGroup: d.teamGroup,
          score: d.displayScore,
          submitHistory: d.submitHistory,
          scoreHistory: d.scoreHistory,
          publicScoreHistory: d.publicScoreHistory,
          privateScoreHistory: d.privateScoreHistory,
          winHistory: d.winHistory,
          lossHistory: d.lossHistory,
          drawHistory: d.drawHistory,
        };
      });
      setLastRefresh(new Date());
      setData(newData);
    });
    getMetaData(competitionID).then((res) => {
      setMeta(res.data);
    });
  };

  const scheduleUpdate = () => {
    const interval = setInterval(() => {
      update();
    }, 1000 * 60);
    setIntervalObj(interval);
  };
  const clearAutoRefresh = () => {
    clearInterval(intervalObj);
    setIntervalObj(null);
  };

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
        {/* <BackLink to="../" /> */}
        <h2>{meta?.competitionName}</h2>
        <p>
          {(() => {
            if (!meta) return null;

            const now = new Date();
            const startDate = new Date(meta.startDate);
            const endDate = new Date(meta.endDate);

            if (now < startDate) {
              return `The competition hasn't started yet. It will begin on ${startDate.toLocaleString()}.`;
            } else if (now > endDate) {
              return `This competition has concluded. It ended on ${endDate.toLocaleString()}.`;
            } else if (!meta.submissionsEnabled) {
              return `Submissions are not being accepted at this time. However, you can still view the leaderboard.`;
            } else {
              return `Upload submissions below and view the current leaderboard.`;
            }
          })()}
        </p>
        <Modal
          title={scoreHistTitle}
          open={visible}
          footer={null}
          onCancel={() => {
            setVisible(false);
          }}
        >
          <div>
            <canvas ref={chartContainer} />
          </div>
        </Modal>
        { meta?.submissionsEnabled && (
          <Button
            size="large"
            className="upload-btn"
            onClick={() => {
              history.push(path.join(history.location.pathname, '../upload'));
            }}
          >
            Upload Predictions
          </Button>
        )}
        <Button
          size="large"
          className="refresh-btn"
          onClick={() => {
            update();
          }}
        >
          Refresh Leaderboard
        </Button>
        <Button
          size="large"
          className="refresh-btn"
          onClick={() => {
            if (intervalObj) {
              clearAutoRefresh();
            } else {
              scheduleUpdate();
            }
          }}
        >
          {intervalObj ? 'Stop Auto Refresh' : 'Auto Refresh'}
        </Button>
        <br />
        <br />

        <p style={{ marginBottom: '12px', fontWeight: 600 }}>
          (Table last refreshed{': '}
          {lastRefresh ? lastRefresh.toLocaleString() : 'never'})
        </p>

        <Table loading={loading} columns={getColumnsForCompetition(meta?.teamGroups)} dataSource={data} />
        {updateTime && <p>Last updated {updateTime?.toLocaleString()}</p>}
      </div>
    </DefaultLayout>
  );
};

export default CompetitionLeaderboardPage;
