import React, { useContext, useEffect, useState } from "react";
import { Affix, AutoComplete, Avatar, Col, Drawer, List, Row, Skeleton, Tabs, message } from "antd";
import { Layout, Button, Input, Modal } from 'antd';
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
import { CompetitionData, getLeaderboard, getMetaData, getRanks, registerCompetitionUser } from "../../../actions/competition";
import { genColor } from "../../../utils/colors";
import Table, { ColumnsType } from "antd/es/table";
const { Content } = Layout;


const FindTeamsTab = (
    { data, user, compUser, registered, fetchTeams, updateRankings }: 
    { data: Object[], user: User, compUser: any, registered: Boolean, fetchTeams: () => void, updateRankings: () => void }
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
      <Content id="findTeamsContainer">
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
            size="large"
            style = {{width: "100%"}}
        >
            <Input size="large" placeholder="Look up a team name"/>
        </AutoComplete>

        {/** List to preview all the teams based on the user's query */}
        <List
            split = {false}
            pagination={{ position, align, pageSize: 6}}
            dataSource={options}
            renderItem={(team: any) => (
            <List.Item key = {team.competitionName}>
                {<TeamCard team = {team} user = {user} compUser = {compUser} fetchTeamCallback = {fetchTeams} updateRankings = {updateRankings}/>}
            </List.Item>
            )}
        />

      </Content>
    );
};

const LeaderBoardTab = (
    {rankData, lastRefresh, updateRankingsCallback, isLoading}: 
    {   
        rankData: any,
        lastRefresh: Date | null, 
        updateRankingsCallback: () => void, 
        isLoading: boolean
    }
) => {
    const columns: ColumnsType<CompetitionData> = [
        {
          title: 'Rank',
          dataIndex: 'rank',
          sorter: (a, b) => a.rank - b.rank,
          defaultSortOrder: 'ascend',
        },
        {
          title: 'Team',
          dataIndex: 'team',
          sorter: (a, b) => a.team.length - b.team.length,
          render(value, record, index) {
            const color1 = genColor(record.team);
            const color2 = genColor(`${record.team}_abcs`);
            return (
              <span>
                <div
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    borderRadius: '50%',
                    width: '2rem',
                    height: '2rem',
                    background: `linear-gradient(30deg, ${color1}, ${color2})`,
                    marginRight: '0.75rem',
                  }}
                ></div>
                {value.length > 28 ? (
                  <span>{value.substring(0, 28)}...</span>
                ) : (
                  <span>{value.substring(0, 28)}</span>
                )}
              </span>
            );
          },
        },
        {
          title: 'Score',
          dataIndex: 'score',
          sorter: (a, b) => a.score - b.score,
        },
    ];
    
    return (
      <Content id="leaderBoardContainer">
            <section>

                <p style={{ marginBottom: '12px', fontWeight: 600 }}>
                    (Table last refreshed{': '}
                    {lastRefresh ? lastRefresh.toLocaleString() : ''})
                </p>
                <Button
                    size="large"
                    className="refresh-btn"
                    onClick={() => {
                        updateRankingsCallback();
                    }}
                    >
                        Refresh
                    </Button> 
            </section>

            
            <Table loading={isLoading} columns={columns} dataSource={rankData} />
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
      <Content id="myTeamContainer" >
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

                    <h4>Team Members</h4>
                    </div>
                </Affix>
            </section>
        )}
      </Content>
    );
  };

  

function CompetitionPortalPage ()  {

    const competitionName  = "TestCompetition2";

    const history = useHistory();
    const { user } = useContext(UserContext);
    const [compUser, setCompUser] = useState<any>({});
    const [isRegistered, setIsRegistered] = useState<any>(false);

    const [allTeams, setAllTeams] = useState<Array<Object>>([]);
    const [teamInfo, setTeamInfo] = useState<any>({});

    const [isLoadingTeamInfo, setIsLoadingTeamInfo] = useState(false);
    const [isLoadingLeaderBoard, setIsLoadingLeaderBoard] = useState(false);
    const [lastRefresh, setLastRefresh] = useState<Date | null>(null);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('1'); // Set the default active tab key

    const [rankData, setRankData] = useState<CompetitionData[]>([]);

    // meta data for current competition
    const [meta, setMeta] = useState<{
        competitionName: string;
        description: string;
        startDate: string;
        endDate: string;
        submissionsEnabled: boolean;
    } | null>(null);



     // Modal callback to show modal to register user for competition
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
                getTeams(competitionName).then(res => {
                    if(res.data) {
                        setAllTeams(Array.from(res.data))
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            }
        })
    }

    const getCompMetaData = () => {
        getMetaData(competitionName).then((res) => {
            setMeta(res.data);
        });
    }


    const updateRankings = () => {

        setIsLoadingLeaderBoard(true);
        getLeaderboard(competitionName).then((res) => {
        
            let newData = res.data.map((d: any, index: number) => {
                return {
                    rank: index + 1,
                    team: d.teamName,
                    score: d.bestScore,
                    submitHistory: d.submitHistory,
                };
            });
            setLastRefresh(new Date());
            setRankData(newData);
            setIsLoadingLeaderBoard(false);
        });
       
      };


    useEffect(() => {
        if (!user.loggedIn) {
          message.info('You need to login to upload predictions and participate');
          history.replace(path.join(window.location.pathname, '../../../login'));
        }

        else {
            fetchTeams();
            getCompMetaData();
            updateRankings();
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

            
                    <section id = "portalStatsContent">

                         {isLoadingTeamInfo ? (
                            <Skeleton active></Skeleton>
                         ):
                          (  <>
                                {compUser.competitionTeam == null ? 
                                    <p id = "noTeamMessage">
                                        Uh oh! You’re not in a team yet. Either make your own team or ask your friends to share their invite code, 
                                        then navigate to Find Teams below to join their group!
                                    </p>
                                
                                : 
                                    <div><p>Team Name: {teamInfo.teamName}</p></div>
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
                                    children: <LeaderBoardTab 
                                        rankData = {rankData}
                                        lastRefresh = {lastRefresh}
                                        updateRankingsCallback={updateRankings} 
                                        isLoading={isLoadingLeaderBoard}/>
                                },
                                {
                                    label: <p>Find Teams</p>,
                                    key: '2',
                                    children: <FindTeamsTab 
                                        data = {allTeams} 
                                        user = {user} 
                                        compUser={compUser}
                                        registered = {isRegistered} 
                                        fetchTeams={fetchTeams}
                                        updateRankings={updateRankings}/>
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
