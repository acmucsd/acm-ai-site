import React, { useEffect, useState, useContext } from 'react';
import DefaultLayout from '../../../../components/layouts/default';
import './index.less';
import { useParams } from 'react-router-dom';
import { getRegisteredState, getTeamInfo } from '../utils';
import UserContext from '../../../../UserContext';

const CompetitionSpecificTeamPage = () => {

  const { user } = useContext(UserContext);
  const [isRegistered, setIsRegistered] = useState<any>(false);
  const [team, setTeam] = useState<any>({});
  const [teamMembers, setTeamMembers] = useState<any>([]);
  const [isMyTeam, setIsMyTeam] = useState<any>(false);

  let { competitionName, teamName } = useParams<{ competitionName: string, teamName: string }>();

  useEffect(() => {
    if (user.loggedIn) {
      // TODO: it's hardcoded to "testinguser1"; change it to user.username
      getRegisteredState(competitionName, "testinguser1").then((res) => {
        setIsRegistered(res.data.registered);
      })
    }

    getTeamInfo(competitionName, teamName).then((res) => {
      setTeam(res.data);
      setTeamMembers(res.data.teamMembers);
    });

    console.log(isMyTeam);
    console.log(teamMembers);



  }, []);

  return (
    <DefaultLayout>
      <div className="CompetitionSpecificTeamPage">
        {isRegistered ? (
          <div>
            <h1>{competitionName}</h1>
            <h2>Team {team.teamName}</h2>
            <h3>About</h3>
            <p>{team.teamDescription} Insert descriptiong here. Insert descriptiong here.Insert descriptiong here.</p>
            <h3>Team Members</h3>
            <div>
              {teamMembers.map((member: string) => {
                return <li key={member}>{member}</li>
              })}
            </div>
            {/* Change to user.username */}
            {teamMembers.includes("testinguser1") &&
              <div>
                <p>Join Code: {team.joinCode}</p>
              </div>
            }
          </div>
        ):(
          <div>
            You need to be logged in and registered in this competition to view this page.
          </div>
        )}
      </div>
    </DefaultLayout>
  )
}
export default CompetitionSpecificTeamPage;
