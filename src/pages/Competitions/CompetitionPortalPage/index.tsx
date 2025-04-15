import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Layout, Button, Input, Modal, Upload, AutoComplete, Drawer, List, Skeleton, Tabs, message, Empty, Tooltip, Pagination, Table} from 'antd';
import type { UploadProps } from 'antd';
import { ColumnsType } from "antd/es/table";
import TextArea from "antd/es/input/TextArea";

import { InboxOutlined } from '@ant-design/icons';
import { IoHelp, IoRefresh, IoSearch, IoTime, IoEllipsisVertical, IoPersonAdd } from "react-icons/io5";
import { FaCheck, FaClock, FaStar } from "react-icons/fa";

import UserContext, { User } from "../../../UserContext";
import { Link, useHistory } from 'react-router-dom';
import {
    getTeamInfo,
    createTeam,
    getCompetitionUser,
    getTeams,
    leaveTeam,
    getSubmissionDetails
} from '../../../actions/teams/utils';
import TeamCard from '../../../components/TeamCard/index';
import DefaultLayout from "../../../components/layouts/default";
import { CompetitionData, getLeaderboard, getMetaData, getRanks, registerCompetitionUser, uploadSubmission } from "../../../actions/competition";
import { genColor } from "../../../utils/colors";
import { createAvatar } from '@dicebear/core';
import { botttsNeutral, identicon } from '@dicebear/collection';
import CountdownTimer from "./CountDownTimer";
import LineChart from "./LineChart";
import SubmissionEntryCard from "./SubmissionEntryCard";

import path from 'path';
import './index.less';

const { Content } = Layout;

/**
 * Renders the tab to view all available teams to join or leave
 * 
 * @param {any} data Holds the array of all teams
 * @param {User} user 
 * @param {any} compUser The competition user
 * @param fetchTeamsCallback Function that refetches all team data
 * @param updateRankings Function that retreives the new rankings of teams
 * 
 */
const FindTeamsTab = (
    { data, user, compUser, registered, fetchTeamsCallback, updateRankings }:
    { data: Object[], user: User, compUser: any, registered: Boolean, fetchTeamsCallback: () => void, updateRankings: () => void }
) => {

    // Constants to align the pagination options for the teams list
    const [position] = useState<('top' | 'bottom' | 'both')>('bottom');
    const [align] = useState<'start' | 'center' | 'end'>('center');

    // Dropdown options for search bar
    const [options, setOptions] = useState<Array<Object>>(data);

    // Initialize the teams data once that data defined
    useEffect(() => {
        if (data) {
            setOptions(data);
        }
    }, [data, registered])

    const handleSearch = (value: string) => {
        // Resets search options back to the original data if the value is an empty string
        if (value === "") {
            setOptions(data);
        }
    }

    const handleSelect = (value: string) => {

        // Filter the list items
        const filteredOptions = data.filter((item: any) =>
            item.teamName.toUpperCase().includes(value.toUpperCase())
        );
        setOptions(filteredOptions)
    }

    return (
        <Content id="findTeamsContainer">
            <AutoComplete
                id="teamSearchBar"
                onSearch={(text) => handleSearch(text)}
                onSelect={handleSelect}

                // list of all possible options for dropdown
                options={options.map((item: any) => ({ value: item.teamName }))}

                // filterOption to handle filtered dropdown items 
                filterOption={(inputValue, option) =>
                    option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                size="large"
                style={{ width: "100%" }}
            >
                <Input allowClear bordered ={false} prefix={<IoSearch size = {20} id = "searchIcon" style = {{marginRight: "0.5rem", color: "lightgrey"}} />}  size="large" placeholder="Look up a team name"  />
            </AutoComplete>

            {/** List to preview all the teams based on the user's query */}
            <List
                split={false}
                pagination={{ position, align, pageSize: 6 }}
                dataSource={options}
                renderItem={(team: any) => (
                    <List.Item key={team.competitionName}>
                        {<TeamCard team={team} user={user} compUser={compUser} fetchTeamCallback={fetchTeamsCallback} updateRankings={updateRankings} />}
                    </List.Item>
                )}
            />

        </Content>
    );
};




/**
 * Renders the leaderboard of all teams based on their ranking
 * 
 * @param {any} rankData The ranking data of all teams
 * @param {Date} lastRefresh The last time when the leaderboard was refreshed
 * @param updateRankingsCallback Function that refetches the rankings for all teams
 * @param {boolean} isLoading Indicates if all the competitions teams info is being fetched
 * 
 */
const LeaderBoardTab = (
    {rankData, lastRefresh, updateRankingsCallback, isLoading}:
    { rankData: any,
      lastRefresh: Date | null,
      updateRankingsCallback: () => void,
      isLoading: boolean
    }
) => {

    // Formats how the columns should be arranged and styled
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

                <p id="lastRefreshedText">
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


/**
 * Renders the submission preview list for the user's team
 * 
 * @param {any} teamInfo The team's general information
 * @param {string} competitionName The name of the current competition
 *
 */
const SubmissionsPreview = ({teamInfo, competitionName}: {teamInfo: any, competitionName: string}) => {

    const [submissions, setSubmissions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /* The actual data inside the teamInfo.submitHistory will be a list of mongoose object ids
       that point to each competition entry object. This component will query the
       recent entries and display them in a list view */

    const dummyData = [
        "63c396f9671b14068b17f681"
    ];

    const fetchRecents = async() => {
        setSubmissions([]);
        setIsLoading(true);

        if (teamInfo) {
            teamInfo.submitHistory.slice(0, 3).map((id: any) => {
                getSubmissionDetails(competitionName, id).then((res) => {
                let submission = res.data[0];
                if (!submission) return;
                let date = new Date(submission.submissionDate);
                let submissionDetails = {
                    date: date,
                    status: submission.status,
                    dateString:
                    date.toLocaleDateString() + ' at ' + date.toLocaleTimeString(),
                    description: submission.description,
                    tags: submission.tags.join(', '),
                    score: submission.score,
                    key: id,
                };
                setSubmissions((submissionData: any) => [
                    ...submissionData,
                    submissionDetails,
                ]);
            });
        })

        setTimeout(() => {
            // Your code to be executed after the delay
            console.log("Delayed code executed!");
            setIsLoading(false);
        }, 500);

      }

    }


    useEffect(() => {
        fetchRecents();
    }, []);

    return (
        <div id = "submissionsPreviewSection">
            <span id = "submissionsPreviewHeader">
                <h3>Submission Log</h3>
                <span>
                    <Button id = "viewSubmissionsButton" type = "link" icon = {<IoRefresh size = {20} />} onClick={()=> fetchRecents()}/>
                    <Link to={`/${competitionName}/submissionLog/${teamInfo.teamName}`} rel="noopener noreferrer">
                        <Button type="text" id = "viewAllSubmissionsButton"><p>view all</p></Button>
                    </Link>
                </span>
            </span>

            <section id = "submissionsPreviewColumn">
                {isLoading ? <Skeleton active   paragraph={{ rows: 10 }}/> :
                    <List
                        split={false}
                        // loading = {isLoading}
                        dataSource={submissions}
                        renderItem={(data: any) => (
                            <List.Item>
                                <SubmissionEntryCard entry = {data}  />
                            </List.Item>
                        )}
                    />
                }     
            </section>
        </div>
    );
}




/**
 * Generates a unique avatar for each team member 
 * using a third party avatar library 
 * 
 * @param {string} username A team member's name
 *
 */
export const TeamMemberAvatar = ( {username}:{username: string}) => {
    const [avatarUrl, setAvatarUrl] = useState('');
    const [loadingImage, setLoadingImage] = useState(false);
    
    useEffect(() => {
        setLoadingImage(true);
        // Generate avatar based on username using DiceBear
        const svg = createAvatar(botttsNeutral, {
            seed: username,
            radius: 50,
            backgroundType: ["gradientLinear"]
        });

        // Convert the SVG string to a data URL
        const dataUrl = `data:image/svg+xml;base64,${btoa(svg.toString())}`;

        // Set the avatar URL
        setAvatarUrl(dataUrl);

        setLoadingImage(false);
    }, [username]);

    return (
        <>
        {loadingImage ? (
           <Skeleton active = {true}  /> 
        ) : (
            <img
                className="teamMemberImage"
                src={avatarUrl}
                style={{
                    width: '3.5rem',
                    height: '3.5rem',
                    marginRight: '0.75rem'
                }}
                alt={`Avatar for ${username}`}
            />
        )}
    </>
    )
}

export const generateTeamPicture = (teamName: any) => {

    const color1 = genColor(teamName);
    const color2 = genColor(`${teamName}_additional_seed`);
    

    return (
        <div
            style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                borderRadius: '100%',
                width: '4rem',
                height: '4rem',
                background: `linear-gradient(30deg, ${color1}, ${color2})`,
                marginRight: '0.75rem',
            }}>
        </div>
    )
}




/**
 * Component that displays a team's data. Contains several components 
 * to create a team, view team members, upload submissions, view submission previews, 
 * and navigate to the matches page. 
 * 
 * @param {boolean} isLoadingTeamInfo    the current team the user is viewing
 * @param {any} compUser    schema that holds user's competition profile data
 * @param {any} rankData    schema that holds the team's ranking data
 * @param {any} teamInfo    schema that holds the team's general information
 * @param fetchTeamCallback callback function to update the team data and the competition user 
 * 
 */
const MyTeamTab = ( { isLoadingTeamInfo, compUser, rankData, teamInfo, metaData , fetchTeamsCallback}: 
                    { isLoadingTeamInfo: boolean, compUser: any, rankData: any, teamInfo: any, metaData: any, fetchTeamsCallback: () => void }
) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    // Form field to create a new etam with a name
    const [newTeamName, setNewTeamName] = useState<string>("");

    // Modal states 
    const [isInviteModalVisible, setIsInviteModalVisible] = useState<boolean>(false);
    const [isLeaveModalVisible, setIsLeaveModalVisible] = useState<boolean>(false);
    
    // Submission description input
    const [desc, setDesc] = useState<string>('');

    // Submission tags input (not being used for now as there isn't UI to add tags yet)
    // const [tags, setTags] = useState<Array<string>>([]); 

    const [submissionFile, setFile] = useState<any>();
    const [uploading, setUploading] = useState<boolean>(false);

    const showLeaveModal = () => {
        setIsLeaveModalVisible(true);
    };

    const handleLeaveModalClose = () => {
        setIsLeaveModalVisible(false);
    };

    const showInviteModal = () => {
        setIsInviteModalVisible(true);
    };

    const handleInviteModalClose = () => {
        setIsInviteModalVisible(false);
    };

    // Upload submission
    const { Dragger } = Upload;
    const uploadProps: UploadProps = {
        name: 'file',
        multiple: false,
        // TODO: replace placeholder link with actual file uploading logic
        // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                setFile(info.file)
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    /**
     * Helper function to refresh the submission history or log
     * when the user successfully uploads a submission. Also
     * performs a refresh of the team data in case the eval server
     * updates the team's ranking, score, etc.
     * 
     * @param event A react form event
     */
    const handleSubmit = (event: React.FormEvent) => {

        event.preventDefault();
        fetchTeamsCallback();

        /* TODO: When eval servers are up, uncomment this portion
        event.preventDefault();
        setUploading(true);
        uploadSubmission(
          submissionFile,
          // use the username as first tag value
          [compUser.username],
          desc,
          compUser.competitionName,
          compUser.username as string
        )
          .then((res) => {
            message.success('Submission Uploaded Succesfully');
            fetchTeamsCallback();
          })
          .catch((err) => {
            message.error(`${err}`);
          })
          .finally(() => {
            setUploading(false);
          }); */
    };

    /**
     * Converts a numeric rankinginto a ordinal label 
     * e.g. 1 = 1st, 2 = 2nd, 3 = 3rd, 4 = 4th...
     * 
     * @param number Represents the team's ranking
     * @returns {string} 
     */
    function getOrdinal(number: any) {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const v = number % 100;
        return number + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    }

    /**
     * Helper function that removes the user from the team.
     * Invokes callback to update the dashboard data and competition user info
     */
    const handleLeaveTeam = () => {
        leaveTeam(compUser.competitionName, compUser.username, compUser.competitionTeam.teamName).then((res) => {
            message.success('Successfully left team.');
            handleLeaveModalClose();
            fetchTeamsCallback();
        })
        .catch((error) => (
            message.error(error)
        ));
    }

    /**
     * Helper function that calls API to create a new team
     * for the user upon submission of a new name
     * 
     */
    const handleClick = () => {

        if (newTeamName.length == 0) {
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
        <>
        {isLoadingTeamInfo  ?
        <Skeleton active avatar = {true}  paragraph={{ rows: 6 }} />
        :
        <Content id="myTeamContainer" >
            
            {teamInfo !== null && teamInfo.teamName && (
                <section>
                    <div id="teamMainContent">

                        <div id="teamHeader">
                            {generateTeamPicture(teamInfo.teamName)}
                            <div id="teamNameWrapper">
                                <article>
                                    <h3>{teamInfo.teamName}</h3>
                                    <p id = "rankingTag">{getOrdinal(rankData.rank)} place</p>
                                </article>
                            
                                <Button type = "link" size="large" id = "leaveTeamButton" onClick={showLeaveModal} icon = {<IoEllipsisVertical size = {28} style = {{color: "black"}}/>}></Button>
                                <Modal
                                    centered
                                    title="Are you sure you want to leave this team?"
                                    okText="Yes"
                                    cancelText="No"
                                    open={isLeaveModalVisible}
                                    onOk={handleLeaveTeam}
                                    onCancel={handleLeaveModalClose}
                                >
                                </Modal>
                            </div>
                        </div>

                        <div id="teamScoreHistorySection">
                            <h3>Score History</h3>
                            <LineChart scoreHistory={(teamInfo != null) ? teamInfo.scoreHistory.map(Number) : []}/>
                        </div>

                        <form id = "uploadFileSection">
                            <span id = "uploadFileHeader">
                                <h3>Upload Submission</h3>
                                <Tooltip title = {<p id = "submissionCountDown">{metaData.submissionsEnabled ? <CountdownTimer endDate={metaData.endDate}/> : "Submissions have closed" }</p> }>
                                    <FaClock size = {28} />
                                </Tooltip>
                            
                            </span>

                            <TextArea
                                id ="uploadDescription"
                                rows={1}
                                autoSize
                                maxLength={300}
                                size="large"
                                placeholder="Add a description. Max character limit of 300"
                                value={desc}
                                onChange={(evt) => setDesc(evt.target.value)}
                            />

                            {/*Inline style needed here */}
                            <Dragger id = "uploadDragArea" style = {{borderRadius: "20px", background: "white", border: "none"}}height={150} {...uploadProps}>
                                <p id="antUploadDragIcon">
                                    <InboxOutlined style={{color: "darkgray"}}/>
                                </p>
                                <p id="antUploadText">Click or drag file to this area to upload</p>
                            </Dragger>
                        
                            <Button
                                size = "large"
                                htmlType="submit"
                                id ="submitFileButton"
                                onClick = {(event) => handleSubmit(event)}
                                disabled = {metaData.submissionsEnabled ? false : true}
                            >
                                Submit
                            </Button>   
                        </form>

                        <SubmissionsPreview  teamInfo={teamInfo} competitionName= {metaData.competitionName} />
                    </div>

                    <div id ="sideContent">

                        <div id = "membersBox">
                            <div id="teamMembersHeader">
                                <h3  className="heading">Members</h3>
                                <Button size="large" id="inviteButton" onClick={showInviteModal} icon = {<IoPersonAdd size = {14}/>}>Invite</Button>
                                <Modal 
                                    className = "inviteCodeModal"
                                    centered 
                                    cancelButtonProps={{ style: { display: 'none' } }} 
                                    title="Invite friends to your team" 
                                    open={isInviteModalVisible} 
                                    onOk={handleInviteModalClose}
                                    onCancel={handleInviteModalClose}
                                >
                                    <p>Share your Invite Code to your friend. Make sure to tell them your team name as well!</p>

                                    {/* inline style here needed */}
                                    <h3 id = "inviteCode" style={{
                                        fontWeight: 'bold',
                                        marginTop: '12px'
                                    }}>
                                        {compUser.competitionTeam && compUser.competitionTeam.joinCode}
                                    </h3>
                                </Modal>
                            </div>

                            {compUser.competitionTeam && compUser.competitionTeam.teamMembers.map((member: string, index: number) => (
                                <div className="teamMember" key={index}>
                                    <TeamMemberAvatar username={member}></TeamMemberAvatar>
                                    <div className="teamMemberTextWrapper">
                                        <p className="teamMemberName">{member}</p>
                                        <p>0 submissions</p>
                                    </div>
                                </div>
                            ))}

                        </div>

                        <div id = "matchesBox">
                            <h3>Matches</h3>
                            <p>Check out your team's match replays to see how well youre performing!</p>
                            <Link to={`/matches/${teamInfo.teamName}`} rel="noopener noreferrer">
                                <p style = {{color: "white", marginTop: "1rem"}}>view all &gt;</p>
                            </Link>
                        </div>
                    </div>
                    
                </section>
            )}

            {teamInfo == null && (

                <section>
                    <Input
                        id="teamNameInput"
                        placeholder="New Team Name"
                        size="large"
                        onChange={(e) => setNewTeamName(e.target.value)}
                    >
                    </Input><br />
                    <Button
                        type="primary"
                        size="large" id="makeTeamButton"
                        loading={isLoading}
                        onClick={handleClick}
                    >
                        Make Team
                    </Button>
                </section>
            )}
        </Content>
        }
    </>
    );
};


/**
 * Renders the entire dashboard for the competition portal.
 */
function CompetitionPortalPage() {

    // This enables us to specify the most current competition
    const competitionName = "StarChess.TEST";
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

    // Tab state when navigating between different sections(Leaderboard, Find Teams, My Team)
    const [activeTab, setActiveTab] = useState('1'); 

    // Rank data for all teams
    const [rankingsData, setRankingsData] = useState<CompetitionData[]>([]);

    // Rank data for user's current team
    const [userRankData, setUserRankData] = useState<CompetitionData>({
        rank: 0,
        team: "",
        score: 0,
        submitHistory: []
    }
    );

    // Loading states for leaderboard data fetching status
    const [isLoadingLeaderBoard, setIsLoadingLeaderBoard] = useState(false);
    const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

    // meta data for current competition
    const [metaData, setMetaData] = useState<{
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

        getCompetitionUser(competitionName, user.username).then((res) => {
            if (!res.data.registered) {
                message.info("you are not registered!");

                // Expose the register modal. When user registers, the page will reload
                showModal();
            }
            else {
                // update the compeition user state
                setCompUser(res.data);

                // fetch all the teams
                getTeams(competitionName).then(res => {
                    if (res.data) {
                        setAllTeams(Array.from(res.data))
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            }
        })
    }

    // Function to get competition meta data
    const getCompMetaData = async () => {
        getMetaData(competitionName).then((res) => {
            setMetaData(res.data);
        })
    }


    // Function to get ranking of user's team and all teams
    function updateRankings() {

        setIsLoadingLeaderBoard(true);

        getLeaderboard(competitionName).then((res) => {
            console.log(res.data)

            let newData = res.data
                .sort((a: any, b: any) => b.bestScore - a.bestScore) // Sort by bestScore in descending order
                .map((d: any, index: number) => {

                        if (teamInfo != null) {
                            if (d.teamName === teamInfo.teamName) {
                                setUserRankData({
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
            setTimeout(() => {
                setIsLoadingTeamInfo(false);
              }, 800);
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

            // Set the selected tab and persist it local storage
            const storedActiveTab = localStorage.getItem("activeTab");
            if (storedActiveTab) {
                setActiveTab(JSON.parse(storedActiveTab));
            }

            // Fetch teams will set the comp user state and grab all teams
            setIsLoadingTeamInfo(true);

            fetchTeams();
            getCompMetaData();
        }

    }, []);



    /**
     * Function to directly get the udpated team information without any 
     * use effect dependencies. Useful whenever the user uploads  
     * submissions
     */
    const updateTeamInformation = () => {
        getTeamInfo(competitionName, compUser.competitionTeam.teamName).then((res) => {
            setTeamInfo(res.data);
        })
    }

    /**
     * Whenever the user calls fetchTeams(), the compUser state
     * will sometimes change. This useEffect will capture 
     * those state transitions and check the comp user
     * details. Here we use the compUser's team property
     * to update the current teamInfo object
     * 
     */
    useEffect(() => {
        setIsLoadingTeamInfo(true);

        // If comp user is in a team, grab the team information
        if (Object.keys(compUser).length !== 0) {
            if (compUser.competitionTeam != null) {
                console.log(compUser)
                updateTeamInformation();
            }
            else {
                setTeamInfo(null)
                setTimeout(() => {
                    setIsLoadingTeamInfo(false);
                  }, 800);
            }
        }
        else {
            setTeamInfo(null)
            setTimeout(() => {
                setIsLoadingTeamInfo(false);
              }, 800);
        }

    }, [compUser])



    /** 
     * Gets the updated rankings on first page load and 
     * based on the state of the user's membership to a team
     */
    useEffect(() => {
        updateRankings();

    }, [teamInfo]);


    // When user registers for compeititons, allow access to portal
    const onSubmit = () => {
        registerCompetitionUser(competitionName, user.username).then((res) => {
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
                closeIcon={false}
                open={isModalOpen}
                maskClosable={false}
                onCancel={handleCancel}
                title={<h3 style={{ fontWeight: '700' }}>Register</h3>}
                footer={null}
            >
                <p>
                    Looks like we don't have you registered for {competitionName} yet. Click register below to get started. The page will
                    reload once we confirm your registration. Otherwise, feel free to leave this page.
                </p>
                <Button onClick={onSubmit} >
                    Register
                </Button>

                <Button
                    onClick={() => {
                        history.push(path.join(history.location.pathname, '../competitions'));
                    }}
                >Go Back</Button>
            </Modal>

            {/** Main Content */}
            <Content className="CompetitionPortalPage">
                <Content id="portalHeader">
                    <section>
                        <div id="hello">
                            <h1 className="title2">Hello, <span className="colorful">{user.username}</span></h1>
                            <Button size = "large"><p>Help</p></Button>
                        </div>
                        <div id="portalBanner">
                            <p>Welcome the the AI Portal for {competitionName}</p>
                        </div>

                    </section>

                    {/** Header for displaying the user's team stats */}
                    <section id="portalStatsContent">

                        {isLoadingTeamInfo ? (
                            <Skeleton active  paragraph={{ rows: 4 }} ></Skeleton>
                        ) :
                            (<>
                                {compUser.competitionTeam == null ?
                                    <section id="noTeamMessage">
                                        <p>
                                            Uh oh! You’re not in a team yet. Either make your own team or ask your friends to share their invite code,
                                            then navigate to Find Teams below to join their group!
                                        </p>
                                    </section>

                                    :
                                    <section id="portalStatsRow">
                                        {/* Titles Row */}
                                        <Row gutter={16} justify="center" className="stats-row titles">
                                        <Col span={6} className="stat-title">Submissions</Col>
                                        <Col span={6} className="stat-title">Latest Score</Col>
                                        <Col span={6} className="stat-title">Ranking</Col>
                                        <Col span={6} className="stat-title">W-L-D</Col>
                                        </Row>
                                        
                                        {/* Values Row */}
                                        <Row gutter={16} justify="center" className="stats-row values">
                                            <Col span={6} className="stat-col">
                                                <div className="stat-value">0</div>
                                            </Col>

                                            <Col span={6} className="stat-col">
                                                <div className="stat-value">{userRankData.score}</div>
                                            </Col>

                                            <Col span={6} className="stat-col">
                                                <div className="stat-value">{userRankData.rank}</div>
                                            </Col>

                                            <Col span={6} className="stat-col">
                                                <div className="stat-value">0-0-0</div>
                                            </Col>
                                        </Row>
                                    </section>
                                }
                            </>
                            )}
                    </section>
                </Content>

                {/* Tab for switching between different sections */}

                <Content id="portalTabContent">
                    <Tabs
                        size="small"
                        animated={true}
                        tabPosition="top"
                        onTabClick={(key: string) => {
                            localStorage.setItem("activeTab", JSON.stringify(key));
                        }}
                        activeKey={activeTab} onChange={(key) => setActiveTab(key)}
                        items={
                            [
                                {
                                    label: <p>Leaderboard</p>,
                                    disabled: isLoadingTeamInfo,
                                    key: '1',
                                    children: <LeaderBoardTab
                                        rankData={rankingsData}
                                        lastRefresh={lastRefresh}
                                        updateRankingsCallback={updateRankings}
                                        isLoading={isLoadingLeaderBoard} />
                                },
                                {
                                    label: <p>Find Teams</p>,
                                    disabled: isLoadingTeamInfo,
                                    key: '2',
                                    children: <FindTeamsTab
                                        data={allTeams}
                                        user={user}
                                        compUser={compUser}
                                        registered={isRegistered}
                                        fetchTeamsCallback={fetchTeams}
                                        updateRankings={updateRankings} />
                                },
                                {
                                    label: <p>My Team</p>,
                                    disabled: isLoadingTeamInfo,
                                    key: '3',
                                    children: <MyTeamTab
                                        isLoadingTeamInfo = {isLoadingTeamInfo}
                                        compUser={compUser}
                                        rankData={userRankData}
                                        teamInfo={teamInfo}
                                        metaData={metaData}
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
