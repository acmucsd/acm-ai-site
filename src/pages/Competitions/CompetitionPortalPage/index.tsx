import React, { useContext, useEffect, useState } from "react";
import { Avatar, List, Tabs, message } from "antd";
import { Layout, Space, Button } from 'antd';
import UserContext from "../../../UserContext";
import { useHistory } from 'react-router-dom';
import {
    getTeamInfo,
    createTeam,
    getCompetitionUser,
    getTeams,
  } from '../../../actions/teams/utils';

import './index.less';
import path from 'path';

import DefaultLayout from "../../../components/layouts/default";
import { PaginationPosition, PaginationAlign } from "antd/es/pagination/Pagination";
import { all } from "axios";

const { Content } = Layout;


const teamCard = (team: any): React.ReactNode => {
    return (
        <div id = {team.teamID} className = "teamPreviewCard">
            <h3><strong>{team.teamName}</strong></h3>
            <p>{team.teamMembers.length} members</p>
            {/* {team.teamMembers.map((member: string, index: number) => (
                <p key={index}>{member}</p>
            ))} */}


            {/** Clicking the button should open a modal to display team details and the option to join if user isn't part of team yet */}
            <Button size="large" shape="round">
                
                <p>View</p>
            </Button>
        </div>
    );
};


const FindTeamsTab = (data: Array<Object>): React.ReactNode => {
    const [position] = useState<PaginationPosition>('bottom');
    const [align] = useState<PaginationAlign>('center');
  
    return (
      <Content id="findTeamsContainer" className = "portalTabContent">
        <List
            split = {false}
            pagination={{ position, align}}
            dataSource={data}
            renderItem={(item: any) => (
            <List.Item key = {item.competitionName}>
                {teamCard(item)}

            </List.Item>
            )}
        />

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
    const [allTeams, setAllTeams] = useState<Array<Object>>([]);


    const tabItems= [
        {
            label: <p>Leaderboard</p>,
            key: '1',
            children: LeaderBoardTab(),
        },
        {
            label: <p>Find Teams</p>,
            key: '2',
            children: FindTeamsTab(allTeams),
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

        else {
            
            getTeams("TestCompetition2").then(res => {
                if(res.data) {
                    setAllTeams(Array.from(res.data))
                    console.log(Array.from(res.data));
                }
            })
            .catch(error => {
                console.log(error);
            });
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
                        items={
                            [
                                {
                                    label: <p>Leaderboard</p>,
                                    key: '1',
                                    children: LeaderBoardTab(),
                                },
                                {
                                    label: <p>Find Teams</p>,
                                    key: '2',
                                    children: FindTeamsTab(allTeams),
                                },
                                {
                                    label: <p>My Team</p>,
                                    key: '3',
                                    children: MyTeamTab(),
                                }
                            ]
                        }
                    ></Tabs>
                </Content>

            </Content>

        </DefaultLayout>
    );

}


export default CompetitionPortalPage;
