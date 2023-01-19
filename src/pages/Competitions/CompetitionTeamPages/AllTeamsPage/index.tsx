import React, { useEffect, useState, useContext } from 'react';
import DefaultLayout from '../../../../components/layouts/default';
import './index.less';
import { useParams, Link } from 'react-router-dom';
import { getRegisteredState, getTeams } from '../utils';
import UserContext from '../../../../UserContext';


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
      <div className="CompetitionTeamPage">
        {isRegistered ? (
          <div>
            <h1>{competitionName}'s Teams</h1>
            <p>{teams.map((team: any) => {
              return (
                <li key={team.teamID}>
                  <Link to={"teams/"+team.teamName}>{team.teamName}</Link>
                </li>
            )})}
            </p>
          </div>
        ):(
          <p>You need to be logged in and registered in this competition to view this page.</p>
        )}
      </div>
    </DefaultLayout>
  )
}
export default CompetitionAllTeamsPage;
