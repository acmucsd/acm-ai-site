import React, { useContext, useEffect, useState } from "react";
import { Affix, AutoComplete, Avatar, Col, Drawer, Form, List, Row, Skeleton, Tabs, message } from "antd";
import { Layout, Space, Button, Input, Modal } from 'antd';
import UserContext, { User } from "../../../UserContext";
import { useHistory } from 'react-router-dom';
import {
    getTeamInfo,
    createTeam,
    getCompetitionUser,
    getTeams,
  } from '../../../actions/teams/utils';
import TeamCard from '../../../components/TeamCard/index';
import './index.less';
import path from 'path';
import DefaultLayout from "../../../components/layouts/default";
import { PaginationPosition, PaginationAlign } from "antd/es/pagination/Pagination";
import { registerCompetitionUser } from "../../../actions/competition";
import { genColor } from "../../../utils/colors";
const { Content } = Layout;


const FindTeamsTab = (
    { data, user, compUser, registered, fetchTeams }: 
    { data: Object[], user: User, compUser: any, registered: Boolean, fetchTeams: () => void }
)  => {

    // constants to align the pagination options for the teams list
    const [position] = useState<PaginationPosition>('bottom');
    const [align] = useState<PaginationAlign>('center');

    // dropdown options for search bar
    const [options, setOptions] = useState<Array<Object>>(data);

    // Initialize the teams data once that data defined
    useEffect(() => {
        if(data) {
            setOptions(data);
        }
    }, [data, registered])


    const handleSearch = (value: string) => {
        // Reset options back to the original data if the value is an empty string
        if (value === "") {
          setOptions(data);
        }
    }


    const handleSelect = (value: string) => {

        // filter the list items
        const filteredOptions = data.filter((item: any) =>
            item.teamName.toUpperCase().includes(value.toUpperCase())
        );
        setOptions(filteredOptions)
    }

    return (
      <Content id="findTeamsContainer" className = "portalTabContent">
        <AutoComplete
            id = "teamSearchBar"
            onSearch={(text) => handleSearch(text)}
            onSelect = {handleSelect}

            // list of all possible options for dropdown
            options={options.map((item: any) => ({ value: item.teamName }))}

            // filterOption to handle filtered dropdown items 
            filterOption = {(inputValue, option) => 
                option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            size = "large"
            style = {{width: "100%", fontSize: 1.4}}
        >
            <Input.Search size="large" placeholder="Look up a team name" enterButton />
        </AutoComplete>

        {/** List to preview all the teams based on the user's query */}
        <List
            split = {false}
            pagination={{ position, align}}
            dataSource={options}
            renderItem={(team: any) => (
            <List.Item key = {team.competitionName}>
                {<TeamCard team = {team} user = {user} compUser = {compUser} fetchTeamCallback = {fetchTeams} />}
            </List.Item>
            )}
        />

      </Content>
    );
};




  
const LeaderBoardTab = ( ) => {
    return (
      <Content id="leaderBoardContainer" className = "portalTabContent">
            <h2>Leaderboard</h2>
      </Content>
    );
};






  const MyTeamTab = ( { compUser, fetchTeamsCallback}: {compUser: any, fetchTeamsCallback: () => void}) => {

    const [isLoading, setIsLoading] =  useState<boolean>(false);
    const [newTeamName, setNewTeamName] = useState("");
    
    useEffect(() => {

    }, []);



    const generateTeamPicture = () => {

        const color1 = genColor(compUser.competitionTeam.teamName);
        const color2 = genColor(`${compUser.competitionTeam.teamName}_additional_seed`);

        return (
            <div 
            style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                borderRadius: '50%',
                width: '4rem',
                height:'4rem',
                background: `linear-gradient(30deg, ${color1}, ${color2})`,
                marginRight: '0.75rem',
              }}>
            </div>
        )
    }

    const handleClick = () => {

        if(newTeamName.length == 0) {
            message.info('Name cannot be empty');
            return;
        }

        setIsLoading(true);
        createTeam(compUser.competitionName, compUser.username, newTeamName).then((res) => {
            message.success('Successfully made a new team!');
            fetchTeamsCallback();
            console.log(compUser)
        
        })
        .catch((error) => {
            message.error(error.message);
        });

        setIsLoading(false);
    }

    return (
      <Content id="myTeamContainer" className = "portalTabContent">
        {compUser.competitionTeam == null && (

            <section>
                <Input 
                    id = "teamNameInput" 
                    placeholder="New Team Name" 
                    size = "large"
                    onChange={(e) => setNewTeamName(e.target.value)}
                    >
                </Input><br/>
                <Button 
                    type = "primary" 
                    size = "large" id = "makeTeamButton" 
                    loading = {isLoading} 
                    onClick={handleClick} 
                >
                    Make Team
                </Button>
            </section>
            

        ) }

        {compUser.competitionTeam !== null && (
            <section>
                <span id = "team">
                    {generateTeamPicture()}
                    <div>
                        <h3>{compUser.competitionTeam.teamName}</h3>
                    </div>

                </span>
                
                <Affix style={{ position: 'absolute', top: 10, right: 0 }} offsetTop={100}>
                    <div id = "teamAffix">

                    <h3>Team Members</h3>
                    </div>
                </Affix>
            </section>
        )}
      </Content>
    );
  };

  

function CompetitionPortalPage ()  {
    const history = useHistory();
    const { user } = useContext(UserContext);
    const [compUser, setCompUser] = useState<any>({});

    const [allTeams, setAllTeams] = useState<Array<Object>>([]);
    const [activeTab, setActiveTab] = useState('1'); // Set the default active tab key
    const [isRegistered, setIsRegistered] = useState<any>(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isLoadingTeamInfo, setIsLoadingTeamInfo] = useState(false);
    const [teamInfo, setTeamInfo] = useState<any>({});
    const competitionName  = "TestCompetition2";


    // callback function to trigger manual tab focus from elsewhere in the UI
    const switchActiveTab = (key: string) => {
        setActiveTab(key);
    }


     // Modal props
     const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Function to directly fetch all the teams
    const fetchTeams = () => {
          
        getCompetitionUser(competitionName, user.username).then((res) =>  {
            console.log(res.data)
            if(!res.data.registered) {
                message.info("you are not registered!");
                showModal();
            }
            else {
                setCompUser(res.data);
                console.log(compUser)
                getTeams(competitionName).then(res => {
                    if(res.data) {
                        setAllTeams(Array.from(res.data))
                        console.log(Array.from(res.data));
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            }
        })
    }

    useEffect(() => {
        if (!user.loggedIn) {
          message.info('You need to login to upload predictions and participate');
          history.replace(path.join(window.location.pathname, '../../../login'));
        }

        else {
            fetchTeams();
        }
        
    }, [user]);

    // only grab team info when user is in a team
    useEffect(() => {
        setIsLoadingTeamInfo(true);

        if(Object.keys(compUser).length !== 0){
            if(compUser.competitionTeam != null){ 
                console.log(compUser)
                getTeamInfo(competitionName, compUser.competitionTeam.teamName).then((res) => {
                    setTeamInfo(res.data);

                })  
            }
            setIsLoadingTeamInfo(false);


        }
        

    }, [compUser])

    
    const onSubmit = () => {
        registerCompetitionUser(competitionName, user.username).then((res) =>  {
            if (res.data.msg == "Success") {
                window.location.reload();
                setIsRegistered(true);
            }
            else {
                message.info(res.data.msg);
            }
        })

      }

    
    return (
        <DefaultLayout>

            {/** Register Modal */}
            <Modal
                 className="registerUserModal"
                 width={800}
                 centered
                 closeIcon = {false}
                 open={isModalOpen}
                 maskClosable = {false}
                 onCancel={handleCancel}
                 title={<h3 style={{ fontWeight: '700' }}>Register</h3>}
                 footer = {null}
             >
                <p>
                    Looks like we don't have you registered for {competitionName} yet. Click register below to get started. The page will 
                    reload once we confirm your registration. Otherwise, feel free to leave this page.
                </p>
                <Button onClick = {onSubmit} >
                    Register
                </Button>

                <Button
                    onClick={() => {
                        history.push(path.join(history.location.pathname, '../competitions'));
                    }}
                >Go Back</Button>
            </Modal> 


            <Content className="CompetitionPortalPage">
                <Content id = "portalHeader">
                    <section>
                        <h1 className="title2">Hello, {user.username}</h1>
                        <h4>Welcome the the AI Portal</h4>
                    </section>

                    {/** This section will display the stats for the user's team otherwise shows default message telling them to find a team */}
                    
                    <section id = "portalStatsContent">

                         {isLoadingTeamInfo ? (
                            <Skeleton active></Skeleton>
                         ):
                          (  <>
                                {compUser.competitionTeam == null ? (
                                    <p id = "noTeamMessage">
                                        Uh oh! You’re not in a team yet. Either make your own team or ask your friends to share their invite code, 
                                        then navigate to Find Teams below to join their group!
                                    </p>
                                )
                                : 
                                    <div>
                                        <p>Team Name: {teamInfo.teamName}</p>
                                    </div>
                                }
                            </>
                         )}
                        

                    </section>
                </Content>

            

                <Content id = "portalTabContent">
                    <Tabs
                        size="small"
                        animated={true}
                        tabPosition="top"
                        activeKey={activeTab} onChange={(key) => setActiveTab(key)}
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
                                    children: <FindTeamsTab 
                                        data = {allTeams} 
                                        user = {user} 
                                        compUser={compUser}
                                        registered = {isRegistered} 
                                        fetchTeams={fetchTeams}/>
                                },
                                {
                                    label: <p>My Team</p>,
                                    key: '3',
                                    children: <MyTeamTab 
                                        compUser={compUser} 
                                        fetchTeamsCallback={fetchTeams} />,
                                },
                            ]
                        }
                    ></Tabs>
                </Content>
            </Content>

        </DefaultLayout>
    );

}


export default CompetitionPortalPage;
