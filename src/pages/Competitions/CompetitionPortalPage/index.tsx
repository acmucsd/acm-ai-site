import React, { useContext, useEffect, useState } from "react";
import { Affix, AutoComplete, Statistic, Drawer, List, Skeleton, Tabs, Tooltip, message, Empty } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
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
import { IoHelp } from "react-icons/io5";
import { BsPatchCheckFill } from "react-icons/bs";
import { FaCheck, FaStar } from "react-icons/fa";
import { GrScorecard } from "react-icons/gr";

import Table, { ColumnsType } from "antd/es/table";
import MainFooter from "../../../components/MainFooter";
import { AxiosResponse } from "axios";
import { BiStats } from "react-icons/bi";

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
          sorter: (a, b) => b.score - a.score,
          defaultSortOrder: 'ascend',
        },
        {
          title: 'Team',
          dataIndex: 'team',
          sorter: (a, b) => a.team.length - b.team.length,
          render(value, record, index) {
            const color1 = genColor(record.team);
            const color2 = genColor(`${record.team}_additional_seed`);

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

                <p id = "lastRefreshedText">
                    Last refreshed{': '}
                    {lastRefresh ? lastRefresh.toLocaleString() : ''}
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
                
                <Affix style={{ position: 'absolute', right: 0, top: 10}} offsetTop={20}>
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

    // User profile data
    const { user } = useContext(UserContext);
    const [compUser, setCompUser] = useState<any>({});
    const [isRegistered, setIsRegistered] = useState<any>(false);

    // array for all teams
    const [allTeams, setAllTeams] = useState<Array<Object>>([]);

    // Competition Team Data
    const [teamInfo, setTeamInfo] = useState<any>({});
    const [isLoadingTeamInfo, setIsLoadingTeamInfo] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('1'); // Set the default active tab key

    // Rank data for all teams
    const [rankingsData, setRankingsData] = useState<CompetitionData[]>([]);

    // Rank data for user's current team
    const [userRankData, setUserRankData] = useState<CompetitionData>({rank: 0,
        team: "",
        score: 0,
        submitHistory: []}
    );

    // Loading states for leaderboard data fetching status
    const [isLoadingLeaderBoard, setIsLoadingLeaderBoard] = useState(false);
    const [lastRefresh, setLastRefresh] = useState<Date | null>(null);


    const [barHeights, setBarHeights] = useState<number[]>([]);
    const [scoreHistoryPercentage, setScoreHistoryPercentage] = useState<number>(0);
    const [scale, setScale] = useState<number>(1);

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

    /** 
     * Fetches the comp user first to handle cases where the user
     * may have joined or left a team prior to this, so we need to get their most up to date
     * competition profile data.
     * More importantly, we need to check if the user is registered before we fetch 
     * any other data.
     **/
    const fetchTeams = () => {
          
        getCompetitionUser(competitionName, user.username).then((res) =>  {
            if(!res.data.registered) {
                message.info("you are not registered!");

                // Expose the register modal. When user registers, the page will reload
                showModal();
            }
            else {  
                // update the compeition user state
                setCompUser(res.data);

                // fetch all the teams
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

    // Function to get compeitition meta data
    const getCompMetaData = async () =>  {

        getMetaData(competitionName).then((res) => {
            setMeta(res.data);
        })
    }

    // Function to get ranking of user's team and all teams
    function updateRankings() {

        // console.log("updating ranks for team: ", teamInfo.teamName);

        setIsLoadingLeaderBoard(true);

        getLeaderboard(competitionName).then((res) => {
            console.log(res.data)
          
            let newData = res.data.sort((a: any, b: any) => b.bestScore - a.bestScore) // Sort by bestScore in descending order
            .map((d: any, index: number) => {

                if(teamInfo != null) {
                    if(d.teamName === teamInfo.teamName) {
                        setUserRankData( {
                            rank: index + 1,
                            team: d.teamName,
                            score: d.bestScore,
                            submitHistory: d.submitHistory,
                        });
    
                        console.log("user rank data: ", userRankData);
                    }
                }
            

                return {
                    rank: index + 1,
                    team: d.teamName,
                    score: d.bestScore,
                    submitHistory: d.submitHistory,
                };
            });

            setLastRefresh(new Date());
            setRankingsData(newData);
            setIsLoadingLeaderBoard(false);
            setIsLoadingTeamInfo(false);

        });
      };


    /**
     * On first page load, check if user is logged in.
     * Otherwise, fetch all the teams and competition metadata
     */
    useEffect(() => {
        if (!user.loggedIn) {
          message.info('You need to login to upload predictions and participate');
          history.replace(path.join(window.location.pathname, '../../../login'));
        }

        else {
            // Fetch teams will set the comp user state and grab all teams
            setIsLoadingTeamInfo(true);

            fetchTeams();
            getCompMetaData();
        }
        
    }, []);



    /**
     * Function to directly get the udpated team information without any 
     * use effect dependencies. Useful whenever the user makes bot 
     * submissions
     */
    const updateTeamInformation = () => {
        getTeamInfo(competitionName, compUser.competitionTeam.teamName).then((res) => {
            setTeamInfo(res.data);
        })  
    }

    /**
     * Whenever the user calls fetchTeams(), the compUser state
     * will usually change. This useEffect will capture 
     * those state transitions and check the comp user
     * details. Here we use the compUser's team property
     * to update the current teamInfo (Object)
     * 
     */
    useEffect(() => {
        setIsLoadingTeamInfo(true);

        // If comp user is in a team, grab the team information
        if(Object.keys(compUser).length !== 0){
            if(compUser.competitionTeam != null){ 
                console.log(compUser)
                updateTeamInformation();
            }
            else {
                setTeamInfo(null)
                setIsLoadingTeamInfo(false);
            }
        }
        else {
            setTeamInfo(null)
            setIsLoadingTeamInfo(false);
        }
            
    }, [compUser])



    /** 
     * Gets the updated rankings on first page load and 
     * based on the state of the user's membership to a team
     */
    useEffect(() => {
        updateRankings();

        if(teamInfo !== null) {
            console.log("setting bar chart")
            // update the score history chart here
            if(teamInfo.scoreHistory) {
                let scores = teamInfo.scoreHistory.slice(-7);
                scores = scores.map(Number);
                setBarHeights(scores);
    
                // Find the maximum score
                const maxScore = Math.max(...scores);

                // Find relative growth of scores
                let lastTwo = scores.slice(-2);
                const diff = lastTwo[1] - lastTwo[0];
                const percent = diff / lastTwo[0];
                setScoreHistoryPercentage(percent);
    
                 // Set your desired maximum height for the bars
                const maxBarHeight = 92;
    
                // Calculate the scaling factor
                const scalingFactor = maxBarHeight / maxScore;
                setScale(scalingFactor);
                console.log(teamInfo.scoreHistory);

            }
         
        }
                
    }, [teamInfo]);



    // When user registers for compeititons, allow access to portal
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
                        <span>
                            <h1 className="title2">Hello, {user.username}</h1>
                            <Tooltip title="Help">
                                <Button icon = {<IoHelp size = {20}/>}></Button>

                            </Tooltip>

                        </span>
                        <div id = "portalBanner">
                            <p>Welcome the the AI Portal for {competitionName}</p>
                        </div>
                            
                    </section>

            
                    <section id = "portalStatsContent">

                         {isLoadingTeamInfo ? (
                            <Skeleton active></Skeleton>
                         ):
                          (  <>
                                {compUser.competitionTeam == null ? 
                                    <section id = "noTeamMessage">
                                        <p>
                                        Uh oh! You’re not in a team yet. Either make your own team or ask your friends to share their invite code, 
                                        then navigate to Find Teams below to join their group!
                                        </p>
                                    </section>
                                    
                                : 
                                    <section id = "portalStatsRow">
                                        <div className = "portalStatsBox">
                                            <span>
                                                <FaCheck size = {20} style = {{padding: "6px", borderRadius: "8px", color: "#ff6f6f", background: "pink", marginRight: "1rem"}}/>
                                                <p>Your Submissions</p>
                                            </span>

                                            <p className = "stat">0</p>
                                            
                                        </div>

                                        <div className = "portalStatsBox">
                                            <span>
                                                <BiStats size = {24} style = {{padding: "4px", borderRadius: "8px", color: "#fe8019", background: "#FCC777", marginRight: "1rem"}}/>
                                                <p>Best Score</p>
                                            </span>
                                            
                                            <p className = "stat">{userRankData.score}</p>
                                        </div>

                                        <div className = "portalStatsBox">
                                            <span>
                                                <FaStar size = {20} style = {{padding: "6px", borderRadius: "8px", color: "red", background: "pink",  marginRight: "1rem"}}/>
                                                <p>Ranking</p>
                                            </span>
                                            <p className = "stat">{userRankData.rank}</p>
                                        </div>

                                        <div className = "portalStatsBox">
                                            <span>
                                                <p>Score History</p>
                                                {scoreHistoryPercentage  ? 
                                                    <Statistic
                                                        value={Math.abs(scoreHistoryPercentage)}
                                                        precision={2}
                                                        valueStyle={{ color: scoreHistoryPercentage < 0 ? '#cf1322' : '#3f8600', fontSize: "1.2rem", display:"inline" }}
                                                        prefix={ scoreHistoryPercentage < 0 ?  <ArrowDownOutlined /> : <ArrowUpOutlined /> }
                                                        suffix="%"
                                                    />
                                                    :
                                                   <></>
                                                }
                                            </span>
                                            <div id = "scoreHistoryChart">
                                                {barHeights.length > 0 ?
                                                    <>
                                                    {barHeights.map((height:number, index:any) => (
                                                        <Tooltip title={height}>
                                                            <div
                                                                key={index}
                                                                className="scoreBar"
                                                                style={{ height: `${height * scale}px`}}
                                                            ></div>

                                                        </Tooltip>
                                                    ))}
                                                    {Array.from({ length: 7 - barHeights.length }, (index : any) => (
                                                        <div
                                                            key={index}
                                                            className="scoreBar"
                                                            style={{ height: `92px`, backgroundColor: "lightgrey"}}
                                                        ></div>

                                                    ))}
                                                    </>
                                                    :
                                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                                }
                                            </div>
            
                                        </div>

                                    </section>
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
                                        rankData = {rankingsData}
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
