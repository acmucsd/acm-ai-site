import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../../components/layouts/default';
import './index.less';
import { useParams } from 'react-router-dom';
import { getRegisteredState, getTeamInfo } from '../utils';

const CompetitionSpecificTeamPage = () => {

  const [registeredState, setRegisteredState] = useState<any>(false);
  const [teamInfo, setTeamInfo] = useState<any>({});
  const [teamMembers, setTeamMembers] = useState<any>([]);

  let { competitionName, teamName } = useParams<{ competitionName: string, teamName: string }>();

  useEffect(() => {
    getRegisteredState(competitionName, "testinguser1").then((res) => {
      setRegisteredState(res.data.registered);
    })

    getTeamInfo(competitionName, teamName).then((res) => {
      setTeamInfo(res.data);
      setTeamMembers(res.data.teamMembers);
    });
  }, []);

  return (
    <DefaultLayout>
      <div className="CompetitionSpecificTeamPage">
        {registeredState ? (
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
            You need to be registered in this competition to view this page.
          </div>
        )}
      </div>
    </DefaultLayout>
  )
}
export default CompetitionSpecificTeamPage;
