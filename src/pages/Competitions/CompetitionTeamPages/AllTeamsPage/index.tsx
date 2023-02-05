import React, { useEffect, useState, useContext } from 'react';
import DefaultLayout from '../../../../components/layouts/default';
import './index.less';
import { useParams, Link } from 'react-router-dom';
import { getRegisteredState, getTeams, getTeamInfo } from '../../../../actions/teams/utils';
import UserContext from '../../../../UserContext';
import BackLink from '../../../../components/BackLink';

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

  // Get all team data
  useEffect(() => {
    if (user.loggedIn) {
      getRegisteredState(competitionName, username).then((res) => {
        setIsRegistered(res.data.registered);
      })
    }
  }, []);

  // Get all teams if user is registered in comp
  useEffect(() => {
    if (isRegistered) {
      getTeams(competitionName).then((res) => {
        setTeams(res.data);
      });
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
              <h2>Teams</h2>
              {teams.map((team: any) => {
                return (Team(team));
              })}
            </div>
          </div>
        ):(
          <p className='errorMessage'>You must be registered in this competition AND logged in to this site to view this page.</p>
        )}
      </div>
    </DefaultLayout>
  )
}
export default CompetitionAllTeamsPage;
