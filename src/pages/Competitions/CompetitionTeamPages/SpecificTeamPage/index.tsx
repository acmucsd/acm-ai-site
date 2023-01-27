import React, { useEffect, useState, useContext } from 'react';
import DefaultLayout from '../../../../components/layouts/default';
import './index.less';
import { useParams } from 'react-router-dom';
import { getRegisteredState, getTeamInfo } from '../../../../actions/teams/utils';
import UserContext from '../../../../UserContext';

const CompetitionSpecificTeamPage = () => {

  const { user } = useContext(UserContext);
  const [isRegistered, setIsRegistered] = useState<any>(false);
  const [team, setTeam] = useState<any>({});
  const [teamMembers, setTeamMembers] = useState<any>([]);

  let { competitionName, teamName } = useParams<{ competitionName: string, teamName: string }>();
  const username = "testinguser5"; // replace with user.username
  useEffect(() => {
    if (user.loggedIn) {
      // TODO: it's hardcoded to "testinguser1"; change it to user.username
      getRegisteredState(competitionName, username).then((res) => {
        setIsRegistered(res.data.registered);
      })
    }

    getTeamInfo(competitionName, teamName).then((res) => {
      setTeam(res.data);
      setTeamMembers(res.data.teamMembers);
    });
  }, []);

  return (
    <DefaultLayout>
      <div className="CompetitionSpecificTeamPage">
        <div className="hero">
          <h1 id="title">{competitionName}</h1>
        </div>
        <div></div>
        {isRegistered ? (
          <div className='main-section'>
            
            <h2 className='statement'>Team {team.teamName}</h2>
            {/* TODO: Change testinguser1 to user.username */}
            {teamMembers.includes(username) &&
              <div className='block'>
                <p>Invite your friends to join this team!</p>
                <h4>Team Join Code: {team.joinCode}</h4>
              </div>
            }
            <h3><span className="subheader">Best Score: {team.bestScore}</span></h3>

            <h3><span className="subheader">Members</span></h3>
            <div>
              {teamMembers.map((member: string) => {
                return <li key={member}>{member}</li>
              })}
            </div>

            <h3><span className="subheader">About</span></h3>
            <p>{team.teamDescription}</p>
          </div>
        ):(
          <p className='errorMessage'>
            You need to be logged in and registered in this competition to view this page.
          </p>
        )}
      </div>
    </DefaultLayout>
  )
}
export default CompetitionSpecificTeamPage;
