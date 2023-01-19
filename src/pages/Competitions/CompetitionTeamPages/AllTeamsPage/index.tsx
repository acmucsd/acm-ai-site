import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../../components/layouts/default';
import './index.less';
import { useParams, Link } from 'react-router-dom';
import { getRegisteredState, getTeams } from '../utils';

const CompetitionAllTeamsPage = () => {

  const [registeredState, setRegisteredState] = useState<any>(false);
  const [teams, setTeams] = useState<any>([]);
  let { competitionName } = useParams<{ competitionName: string }>();

  useEffect(() => {
    getRegisteredState(competitionName, "testinguser1").then((res) => {
      setRegisteredState(res.data.registered);
    })

    getTeams(competitionName).then((res) => {
      setTeams(res.data);
    });
  }, []);

  return (
    <DefaultLayout>
      <div className="CompetitionTeamPage">
        {registeredState ? (
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
          <p>You need to be registered in this competition to view this page.</p>
        )}
      </div>
    </DefaultLayout>
  )
}
export default CompetitionAllTeamsPage;
