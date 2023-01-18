import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../components/layouts/default';
import { message } from 'antd';
import './index.less';
import axios, { AxiosResponse } from 'axios';
import { COOKIE_NAME } from '../../../configs';
import { getToken } from '../../../utils/token';
import { useParams } from 'react-router-dom';

export const getTeams = async (
  competitionName: string
): Promise<AxiosResponse> => {
  let token = getToken(COOKIE_NAME);
  return new Promise((resolve, reject) => {
    axios
      .get(
        // TODO: remove hardcoded thing
        `http://localhost:9000/v1/competitions/teams/${competitionName}`,
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

const CompetitionAllTeamsPage = () => {

  const [teams, setTeams] = useState<any>([]);

  let { competitionName } = useParams<{ competitionName: string }>();
  getTeams(competitionName).then((res) => {
    setTeams(res.data);
  });

  return (
    <DefaultLayout>
      <div className="CompetitionTeamPage">
        <h1>{competitionName}'s Teams</h1>
        <p>{teams.map((team: any) => {
          return <li key={team.teamID}>{team.teamName}</li>
        })}</p>
      </div>
    </DefaultLayout>
  )
}
export default CompetitionAllTeamsPage;
