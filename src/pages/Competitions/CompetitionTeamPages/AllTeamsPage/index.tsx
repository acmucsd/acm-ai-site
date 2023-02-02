import React, { useEffect, useState, useContext } from 'react';
import DefaultLayout from '../../../../components/layouts/default';
import './index.less';
import { useParams, Link } from 'react-router-dom';
import { getRegisteredState, getTeams, getTeamInfo, getSubmissionDetails } from '../../../../actions/teams/utils';
import UserContext from '../../../../UserContext';
import BackLink from '../../../../components/BackLink';

import { Table, Button, Modal } from 'antd';
import { ColumnsType } from 'antd/lib/table';

interface SubmissionData {
  description: string;
  score: number;
  tags: string[];
  submissionDate: string;
  // last: Date;
}

const columns: ColumnsType<SubmissionData> = [
  {
    title: 'Submission Date',
    dataIndex: 'submissionDate',
    // defaultSortOrder: 'descend',
    // sorter: (a, b) => a.score - b.score,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    // defaultSortOrder: 'descend',
    // sorter: (a, b) => a.score - b.score,
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    // defaultSortOrder: 'descend',
    // sorter: (a, b) => a.score - b.score,
  },
  {
    title: 'Score',
    dataIndex: 'score',
    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.score - b.score,
  },
];

// Block for each team
const Team = (team: any) => {
  return (
    <div className='teamBlock'>
      {/* Note: change to Link to={team.teamName} if the routing doesn't work; idk why this happens*/}
      <Link to={'teams/' + team.teamName}>
        <h3><span className='subheader'>{team.teamName}</span></h3>
        <p className="teamBlockSection"><span className="teamBlockHeader">Best Score</span> <span>{team.bestScore}</span></p>
        <p className="teamBlockSection"><span className="teamBlockHeader">Members</span> <span className="teamMembers">{team.teamMembers.join(", ")}</span></p>
        <p className="teamBlockSection"><span className="teamBlockHeader">About</span><span>{team.teamDescription}</span></p>
      </Link>
    </div>
  )
}

const CompetitionAllTeamsPage = () => {

  const { user } = useContext(UserContext);
  const [isRegistered, setIsRegistered] = useState<any>(false);
  const [teams, setTeams] = useState<any>([]);
  let { competitionName } = useParams<{ competitionName: string }>();
  const username = "testinguser4";

  // submission page messing around 
  const [submissionData, setSubmissionData] = useState<SubmissionData[]>([]);
  const [submissionIds, setSubmissionIds] = useState<any>([]);

  // Get all team data
  useEffect(() => {
    if (user.loggedIn) {
      getRegisteredState(competitionName, username).then((res) => {
        setIsRegistered(res.data.registered);
      })
    }
    getTeams(competitionName).then((res) => {
      setTeams(res.data);
    });
  }, []);

  // Store submission IDs (right now, of random IDs)
  useEffect(() => {
    if (isRegistered) {
      getTeamInfo(competitionName, "testTeam1").then((res) => {
        // console.log(res.data.submitHistory);

        // These are just random IDs
        setSubmissionIds([
          "63c396f9671b14068b17f681",
          "63c396f9671b14068b17f682",
          "63c396f9671b14068b17f683"
        ]);
      });
    }
  }, [isRegistered])

  // Get submission data from submission IDs
  useEffect(() => {
    submissionIds.map((id: any) => {
      getSubmissionDetails(competitionName, id).then((res) => {
        let submission = res.data[0];
        let submissionDetails = {
          submissionDate: submission.submissionDate,
          description: submission.description,
          tags: submission.tags,
          score: submission.score
        }
        setSubmissionData(submissionData => [...submissionData, submissionDetails]);
      })
    })
  }, [submissionIds])

  return (
    <DefaultLayout>
      <div className='AllTeamsPage'>
        <br />
        <BackLink to="../" />
        {isRegistered ? (
          <div>
            <div className='main-section'>
              <h2>My Team Submissions</h2>
              <Table columns={columns} dataSource={submissionData} />
              <h2>Teams</h2>
              {teams.map((team: any) => {
                return (Team(team));
              })}
            </div>
          </div>
        ):(
          <p className='errorMessage'>You must be logged in and registered in this competition to view this page.</p>
        )}
      </div>
    </DefaultLayout>
  )
}
export default CompetitionAllTeamsPage;
