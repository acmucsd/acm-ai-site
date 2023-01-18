import React, { useEffect, useRef, useState } from 'react';
import DefaultLayout from '../../../components/layouts/default';
import Card from '../../../components/Card';
import { Form, Input, message, Button } from 'antd';
import './index.less';
import { Table, Modal } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { COOKIE_NAME } from '../../../configs';
import { getToken } from '../../../utils/token';

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
        console.log(res)
        // resolve(res);
      })
      .catch((error) => {
        message.error(error.response.data.error.message);
        reject(error);
      });
  });
};

const CompetitionAllTeamsPage = () => {

  getTeams('TestCompetition1');

  return (
    <DefaultLayout>
      <div className="CompetitionTeamPage">
        <p>hi</p>
      </div>
    </DefaultLayout>
  )
}
export default CompetitionAllTeamsPage;
