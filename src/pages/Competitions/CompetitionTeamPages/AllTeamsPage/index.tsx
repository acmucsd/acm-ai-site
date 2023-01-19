import React, { useEffect, useState, useContext } from 'react';
import DefaultLayout from '../../../../components/layouts/default';
import './index.less';
import { useParams, Link } from 'react-router-dom';
import { getRegisteredState, getTeams } from '../utils';
import UserContext from '../../../../UserContext';

// Block for each team
const Team = (team: any) => {
  return (
    <div className="teamBlock">
      <h3><Link to={"teams/"+team.teamName}>{team.teamName}</Link></h3>
      <p className="teamBlockSection"><span className="teamBlockHeader">Members</span> <span className="teamMembers">{team.teamMembers.join(", ")}</span></p>
      <p className="teamBlockSection"><span className="teamBlockHeader">Best Score</span> <span>{team.bestScore}</span></p>
      <p className="teamBlockSection"><span className="teamBlockHeader">About</span><span>{team.teamDescription}</span></p>
    </div>
  )
}

const CompetitionAllTeamsPage = () => {

  const { user } = useContext(UserContext);
  const [isRegistered, setIsRegistered] = useState<any>(false);
  const [teams, setTeams] = useState<any>([]);
  let { competitionName } = useParams<{ competitionName: string }>();
  
  useEffect(() => {
    if (user.loggedIn) {
      // TODO: it's hardcoded to "testinguser1"; change it to user.username
      getRegisteredState(competitionName, "testinguser1").then((res) => {
        setIsRegistered(res.data.registered);
      })
    }
    
    getTeams(competitionName).then((res) => {
      setTeams(res.data);
    });
  }, []);

  return (
    <DefaultLayout>
      <div className="CompetitionAllTeamsPage">
        {isRegistered ? (
          <div>
            <h1>{competitionName}</h1>
            <h2>Teams</h2>
            <p>{teams.map((team: any) => {
              return (
                Team(team)
            )})}
            </p>
          </div>
        ):(
          <p className="errorMessage">You need to be logged in and registered in this competition to view this page.</p>
        )}
      </div>
    </DefaultLayout>
  )
}
export default CompetitionAllTeamsPage;
