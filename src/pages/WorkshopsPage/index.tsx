import React, { useEffect } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import DiscordLink from '../../components/DiscordLink';

function WorkshopsPage(props: any) {
  useEffect(() => {}, []);
  return (
    <DefaultLayout>
      <div className="CompetitionsPage">
        <div className = "hero">
          <h1 id = "title">Workshops</h1>
          <p className = "subtext">
            Welcome to the workshops page!
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default WorkshopsPage;
