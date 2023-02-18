import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../../components/layouts/default';
import './index.less';
import { useParams } from 'react-router-dom';
import { getSubmissionDetails } from '../../../../actions/teams/utils';
import { Button, Table } from 'antd';
import BackLink from '../../../../components/BackLink';
import {
  getSubmissionMatches,
  getSubmissionReplay,
} from '../../../../actions/competition';
import { ColumnsType } from 'antd/lib/table';
import { DownloadOutlined } from '@ant-design/icons';
interface MatchData {
  competitionTeams: string[];
  competitionEntries: string[];
  _id: string;
  date: Date;
}

const CompetitionSubmissionDetailsPage = () => {
  let { competitionName, submissionId, teamName } = useParams<{
    competitionName: string;
    teamName: string;
    submissionId: string;
  }>();
  const columns: ColumnsType<MatchData> = [
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: 'Teams',
      render(value, record, index) {
        const teamData = value.competitionTeams.map((v: any, i: number) => {
          return {
            data: `${v.teamName} (${value.scores[i]})`,
            teamName: v.teamName,
            score: value.scores[i],
          };
        });
        teamData.sort((a: any, b: any) => b.score - a.score);
        return (
          <>
            {teamData.map((v: any, i: number) => {
              if (v.teamName === teamName) {
                return (
                  <span style={{ color: 'rgb(51,159,200)' }}>
                    {v.data}
                    {', '}
                  </span>
                );
              } else {
                return (
                  <span>
                    {v.data}
                    {', '}
                  </span>
                );
              }
            })}
          </>
        );
      },
    },
    {
      title: 'Ranking',
      render(value, record, index) {
        const teams: any[] = value.competitionTeams;
        for (let i = 0; i < value.scores.length; i++) {
          teams[i].score = value.scores[i];
        }
        const teamScores = teams
          .sort((a: any, b: any) => b.score - a.score)
          .map((v: any) => {
            return { teamName: v.teamName, score: v.score };
          });
        let rank = 1;
        for (let i = 0; i < teamScores.length; i++) {
          const d = teamScores[i];
          if (d.teamName === teamName) {
            // reverse search for finding ties
            rank = i + 1;
            for (let j = i - 1; j >= 0; j--) {
              if (teamScores[j].score === d.score) {
                rank = j + 1;
              } else {
                break;
              }
            }
            break;
          }
        }
        return rank;
      },
    },
    {
      title: 'Replay',
      render(value, record, index) {
        return (
          <Button
            onClick={() => {
              getSubmissionReplay(competitionName, value._id);
            }}
          >
            <DownloadOutlined />
          </Button>
        );
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      render(value, record, index) {
        return new Date(value).toLocaleString();
      },
    },
  ];

  const [submissionDetails, setSubmissionDetails] = useState<any>(null);
  const [submissionMatches, setSubmissionMatches] = useState<any>(null);
  useEffect(() => {
    getSubmissionDetails(competitionName, submissionId).then((res) => {
      setSubmissionDetails(res.data[0]);
    });
    getSubmissionMatches(competitionName, submissionId).then((res) => {
      setSubmissionMatches(res.data);
    });
  }, [competitionName, submissionId]);

  if (!submissionMatches || !submissionDetails) {
    return <DefaultLayout></DefaultLayout>;
  }
  let status = '?';
  switch (submissionDetails.status) {
    case 1:
      status = 'unverified';
      break;
    case 2:
      status = 'verified';
      break;
    case 3:
      status = 'failed';
      break;
  }
  return (
    <DefaultLayout>
      <div className="SubmissionDetailsPage">
        <br />
        <BackLink to="../../" />
        <h2>Submission {submissionId}</h2>
        <div>
          <p>
            All submission matches and submission information is below. Click
            the download button next to a match to get the replay and watch it
            locally.
          </p>
        </div>
        <br />
        <div>
          <p>Status: {status} </p>
          {status === 'failed' && (
            <>
              <p>Error logs from validation match</p>
              <p>{submissionDetails.error}</p>
            </>
          )}
          {submissionDetails.rank.score && (
            <>
              <p>Ranking Score = µ - 3 * σ = {submissionDetails.rank.score}</p>
              <p>µ = {submissionDetails.rank.mu}</p>
              <p>σ = {submissionDetails.rank.sigma}</p>
              <p>Episodes Run = {submissionDetails.rank.episodes}</p>
            </>
          )}
        </div>
        <br />
        <div>
          <Table columns={columns} dataSource={submissionMatches} />
        </div>
      </div>
    </DefaultLayout>
  );
};
export default CompetitionSubmissionDetailsPage;
