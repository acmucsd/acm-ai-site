import React, { useEffect, useState, useContext } from 'react';
import DefaultLayout from '../../../../components/layouts/default';
import './index.less';
import { useParams } from 'react-router-dom';
import { getRegisteredState, getTeamInfo } from '../utils';
import UserContext from '../../../../UserContext';

const CompetitionSpecificTeamPage = () => {

  const { user } = useContext(UserContext);
  const [isRegistered, setIsRegistered] = useState<any>(false);
  const [teamInfo, setTeamInfo] = useState<any>({});
  const [teamMembers, setTeamMembers] = useState<any>([]);

  let { competitionName, teamName } = useParams<{ competitionName: string, teamName: string }>();

  useEffect(() => {
    if (user.loggedIn) {
      // TODO: it's hardcoded to "testinguser1"; change it to user.username
      getRegisteredState(competitionName, "testinguser1").then((res) => {
        setIsRegistered(res.data.registered);
      })
    }

    getTeamInfo(competitionName, teamName).then((res) => {
      setTeamInfo(res.data);
      setTeamMembers(res.data.teamMembers);
    });
  }, []);

  return (
    <DefaultLayout>
      <div className="CompetitionSpecificTeamPage">
        {isRegistered ? (
          <div>
            <h1>Team: {teamName}</h1>
            <h2>Team Members</h2>
            <div>
              {teamMembers.map((member: string) => {
                return <li key={member}>{member}</li>
              })}
            </div>
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
