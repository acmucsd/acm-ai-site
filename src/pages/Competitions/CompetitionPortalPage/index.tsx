import React, { useContext, useEffect } from "react";
import { List, Tabs, message } from "antd";
import { Layout, Space, Button } from 'antd';
import UserContext from "../../../UserContext";
import { useHistory } from 'react-router-dom';
import {
    getTeamInfo,
    createTeam,
    getCompetitionUser,
  } from '../../../actions/teams/utils';

import './index.less';
import path from 'path';

import DefaultLayout from "../../../components/layouts/default";

const { Content } = Layout;



const FindTeamsTab = (): React.ReactNode => {
    return (
      <Content id="findTeamsContainer" className = "portalTabContent">
        <h2>Find Teams</h2>

      </Content>
    );
  };

  
const LeaderBoardTab = (): React.ReactNode => {
    return (
      <Content id="leaderBoardContainer" className = "portalTabContent">
            <h2>Leaderboard</h2>

      </Content>
    );
  };


  const MyTeamTab = (): React.ReactNode => {
    return (
      <Content id="myTeamContainer" className = "portalTabContent">
        <h2>My Team</h2>
      </Content>
    );
  };

  

function CompetitionPortalPage ()  {
    const history = useHistory();
    const { user } = useContext(UserContext);

    const tabItems= [
        {
            label: <p>Leaderboard</p>,
            key: '1',
            children: LeaderBoardTab(),
        },
        {
            label: <p>Find Teams</p>,
            key: '2',
            children: FindTeamsTab(),
        },
        {
            label: <p>My Team</p>,
            key: '3',
            children: MyTeamTab(),
        }
        ];

    useEffect(() => {
        if (!user.loggedIn) {
          message.info('You need to login to upload predictions and participate');
          history.replace(path.join(window.location.pathname, '../../../login'));
        }
      }, []);


      useEffect(() => {
        if (!user.loggedIn) {
          message.info('You need to login to upload predictions and participate');
          history.replace(path.join(window.location.pathname, '../../../login'));
        }
      }, []);
    
    return (
        <DefaultLayout>

            <Content className="CompetitionPortalPage">
                <Content id = "portalHeader">
                    <section>
                        <h1 className="title2">Hello, {user.username}</h1>
                        <h4>Welcome the the AI Portal</h4>
                    </section>

                    <section id = "portalStatsContent">
                        <p id = "noTeamMessage">Uh oh! You’re not in a team yet. Ask your friends to share their invite code, then navigate to Find Teams below to join their group!</p>

                    </section>
                </Content>

                

    
            

                <Content id = "portalTabContent">
                    {/* If the user is not part of a team yet, then */}
                    <Tabs
                        size="small"
                        animated={true}
                        tabPosition="top"
                        items={tabItems}
                    ></Tabs>
                </Content>

            </Content>

        </DefaultLayout>
    );

}


export default CompetitionPortalPage;
