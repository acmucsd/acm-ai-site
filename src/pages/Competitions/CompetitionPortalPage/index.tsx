import React, { useContext, useEffect, useState } from "react";
import { AutoComplete, Avatar, List, Tabs, message } from "antd";
import { Layout, Space, Button, Input } from 'antd';
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
    const [searchTerm, setSearchTerm] = useState("");

    // dropdown options for search bar
    const [options, setOptions] = useState<Array<Object>>(data);

    // data for the list


    useEffect(() => {
        if(data) {
            setOptions(data);
        }
    }, [data])

    const handleSearch = (value: string) => {
        setSearchTerm(value);

        // Reset options back to the original data if the value is an empty string
        if (value === "") {
          setOptions(data);
        }
    }


    const handleSelect = (value: string) => {

        const filteredOptions = data.filter((item: any) =>
            item.teamName.toLowerCase().includes(value.toLowerCase())
        );
        
        setOptions(filteredOptions)

    }

    return (
      <Content id="findTeamsContainer" className = "portalTabContent">
        <AutoComplete
            id = "teamSearchBar"
            onSearch={(text) => handleSearch(text)}
            onSelect = {handleSelect}
            options={options.map((item: any) => ({ value: item.teamName }))}
            filterOption = {(inputValue, option) => 
                option?.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
            }
            size = "large"
            style = {{width: "100%", fontSize: 1.4}}
        >
            <Input.Search size="large" placeholder="Look up a team name" enterButton />

        </AutoComplete>

        <List
            split = {false}
            pagination={{ position, align}}
            dataSource={options}
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


    {/** Might save for later when we need to edit the tab Items */}
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
            // Grab all the teams for the current competitions
            // Note: I am using the test competition name from mongoDB
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

                    {/** This section will display the stats for the user's team otherwise shows default message telling them to find a team */}
                    <section id = "portalStatsContent">
                        <p id = "noTeamMessage">
                            Uh oh! You’re not in a team yet. Either make your own team or ask your friends to share their invite code, 
                            then navigate to Find Teams below to join their group!
                        </p>
                    </section>
                </Content>

            
                <Content id = "portalTabContent">
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
