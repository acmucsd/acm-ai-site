import React, { useEffect, useState, useContext } from 'react';
import DefaultLayout from '../../../../components/layouts/default';
import './index.less';
import { useParams, Link } from 'react-router-dom';
import { getRegisteredState, getTeams } from '../../../../actions/teams/utils';
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
  const [data, setData] = useState<SubmissionData[]>([]);
  let { competitionName } = useParams<{ competitionName: string }>();
  const username = "testinguser1";

  useEffect(() => {
    if (user.loggedIn) {
      getRegisteredState(competitionName, username).then((res) => {
        setIsRegistered(res.data.registered);
      })
    }
    
    getTeams(competitionName).then((res) => {
      setTeams(res.data);
    });

    const newData = [{
      score: 5,
      description: "description",
      tags: ["hi", "tag"],
      submissionDate: "2023-01-14T06:02:27.945Z"
    },]
    setData(newData);

  }, []);

  useEffect(() => {
    if (isRegistered) {
      console.log("registered!!!!!")
    }
  }, [isRegistered])

  return (
    <DefaultLayout>
      <div className='AllTeamsPage'>
        <br />
        <BackLink to="../" />
        {isRegistered ? (
          <div>
            <div className='main-section'>
              <h2>My Team Submissions</h2>
              <Table columns={columns} dataSource={data} />
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
