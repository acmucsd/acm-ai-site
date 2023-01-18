import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../components/layouts/default';
import { message } from 'antd';
import './index.less';
import axios, { AxiosResponse } from 'axios';
import { COOKIE_NAME } from '../../../configs';
import { getToken } from '../../../utils/token';
import { useParams } from 'react-router-dom';

export const getTeamInfo = async (
  competitionName: string,
  teamName: string
): Promise<AxiosResponse> => {
  let token = getToken(COOKIE_NAME);
  return new Promise((resolve, reject) => {
    axios
      .get(
        // TODO: remove hardcoded thing
        `http://localhost:9000/v1/competitions/teams/${competitionName}/${teamName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        message.error(error.response.data.error.message);
        reject(error);
      });
  });
};

const CompetitionSpecificTeamPage = () => {

  const [teamInfo, setTeamInfo] = useState<any>({});
  const [teamMembers, setTeamMembers] = useState<any>([]);

  let { competitionName, teamName } = useParams<{ competitionName: string, teamName: string }>();
  getTeamInfo(competitionName, teamName).then((res) => {
    setTeamInfo(res.data);
    setTeamMembers(res.data.teamMembers);
  });

  useEffect(()=> {
    console.log(JSON.stringify(teamInfo));
  }, [])

  return (
    <DefaultLayout>
      <div className="CompetitionSpecificTeamPage">
        <h1>Team: {teamName}</h1>
        <h2>Team Members</h2>
        <div>
          {teamMembers.map((member: string) => {
            return <li key={member}>{member}</li>
          })}
        </div>
      </div>
    </DefaultLayout>
  )
}
export default CompetitionSpecificTeamPage;
