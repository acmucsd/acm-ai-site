import React, { useContext, useEffect, useState } from "react";
import { AutoComplete, Drawer, List, Skeleton, Tabs, message, Empty, Tooltip } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { Layout, Button, Input, Modal, Upload } from 'antd';
import type { UploadProps } from 'antd';
import UserContext, { User } from "../../../UserContext";
import { useHistory } from 'react-router-dom';
import {
    getTeamInfo,
    createTeam,
    getCompetitionUser,
    getTeams,
    leaveTeam,
    getSubmissionDetails
} from '../../../actions/teams/utils';
import TeamCard from '../../../components/TeamCard/index';
import './index.less';
import path from 'path';
import DefaultLayout from "../../../components/layouts/default";
import { PaginationPosition, PaginationAlign } from "antd/es/pagination/Pagination";
import { CompetitionData, getLeaderboard, getMetaData, getRanks, registerCompetitionUser, uploadSubmission } from "../../../actions/competition";
import { genColor } from "../../../utils/colors";
import { IoHelp, IoSearch, IoTime } from "react-icons/io5";
import { IoEllipsisVertical , IoPersonAdd} from "react-icons/io5";
import { FaCheck, FaClock, FaStar } from "react-icons/fa";
import Table, { ColumnsType } from "antd/es/table";
import { BiStats } from "react-icons/bi";

import { createAvatar } from '@dicebear/core';
import { botttsNeutral, identicon } from '@dicebear/collection';
import CountdownTimer from "./CountDownTimer";
import TextArea from "antd/es/input/TextArea";
import LineChart from "./LineChart";
import SubmissionEntryCard from "./SubmissionEntryCard";

const { Content } = Layout;


const FindTeamsTab = (
    { data, user, compUser, registered, fetchTeams, updateRankings }:
        { data: Object[], user: User, compUser: any, registered: Boolean, fetchTeams: () => void, updateRankings: () => void }
) => {

    // constants to align the pagination options for the teams list
    const [position] = useState<PaginationPosition>('bottom');
    const [align] = useState<PaginationAlign>('center');

    // dropdown options for search bar
    const [options, setOptions] = useState<Array<Object>>(data);

    // Initialize the teams data once that data defined
    useEffect(() => {
        if (data) {
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
                <Input allowClear bordered ={false} prefix={<IoSearch size = {20} style = {{marginRight: "0.5rem", color: "lightgrey"}} />}  size="large" placeholder="Look up a team name"  />
            </AutoComplete>

            {/** List to preview all the teams based on the user's query */}
            <List
                split={false}
                pagination={{ position, align, pageSize: 6 }}
                dataSource={options}
                renderItem={(team: any) => (
                    <List.Item key={team.competitionName}>
                        {<TeamCard team={team} user={user} compUser={compUser} fetchTeamCallback={fetchTeams} updateRankings={updateRankings} />}
                    </List.Item>
                )}
            />

        </Content>
    );
};

const LeaderBoardTab = (
    { rankData, lastRefresh, updateRankingsCallback, isLoading }:
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



const SubmissionsPreview = ({teamInfo, competitionName}: {teamInfo: any, competitionName: string}) => {

    const [submissions, setSubmissions] = useState<any[]>([]);

    // The actual data inside the teamInfo.submitHistory will be a list of mongoose object ids
    // that point to each competition entry object. This component will query the top three
    // recent entries and display them in a list view
    const dummyData = [
        "63c396f9671b14068b17f681"
    ];

    const fetchRecents = () => {

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
            });


        }
    }
    

    useEffect(() => {
        fetchRecents();
    }, []);

    return (
        // TODO: display preview of teamInfo submitHistory field with hyperlink to view all submissions
        <div id = "submissionsPreviewSection">
            <span id = "submissionsPreviewHeader">
                <h3 style = {{fontWeight: 800}}>Submission Log</h3>
                <Button type="text" id = "viewAllSubmissionsButton"><p>view all</p></Button>
            </span>

            <section id = "submissionsPreviewColumn">
                <List
                split={false}
                dataSource={submissions}
                renderItem={(data: any) => (
                    <List.Item>
                        <SubmissionEntryCard entry = {data}  />
                    </List.Item>
                )}
            />
                
            </section>
        </div>
    );
}


const TeamMemberAvatar: React.FC<{ username: string }> = ({ username }) => {
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
           <Skeleton active avatar = {true} /> 
        ) : (
            <img
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

const generateTeamPicture = (compUser: any) => {

    const color1 = genColor(compUser.competitionTeam.teamName);
    const color2 = genColor(`${compUser.competitionTeam.teamName}_additional_seed`);

    return (
        <div
            style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                borderRadius: '50%',
                width: '4rem',
                height: '4rem',
                background: `linear-gradient(30deg, ${color1}, ${color2})`,
                marginRight: '0.75rem',
            }}>
        </div>
    )
}


const MyTeamTab = ({ isLoadingTeamInfo, compUser, rankData, teamInfo, metaData , fetchTeamsCallback}: { isLoadingTeamInfo: boolean, compUser: any, rankData: any, teamInfo: any, metaData: any, fetchTeamsCallback: () => void }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [newTeamName, setNewTeamName] = useState<string>("");
    const [isInviteModalVisible, setIsInviteModalVisible] = useState<boolean>(false);
    const [isLeaveModalVisible, setIsLeaveModalVisible] = useState<boolean>(false);
    
    const [submissionFile, setFile] = useState<any>();
    const [desc, setDesc] = useState<string>('');
    // const [tags, setTags] = useState<Array<string>>([]); // not being used for now
    const [uploading, setUploading] = useState<boolean>(false);

  
    // Leave button modal
    const showLeaveModal = () => {
        setIsLeaveModalVisible(true);
    };

    const handleLeaveModalClose = () => {
        setIsLeaveModalVisible(false);
    };

    // Invite button modal
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

    const handleSubmit = (event: React.FormEvent) => {

        event.preventDefault();
        fetchTeamsCallback();

        // TODO: When eval servers are up, uncomment this portion
        // setUploading(true);
        // uploadSubmission(
        //   submissionFile,
        //   [compUser.username],
        //   desc,
        //   compUser.competitionName,
        //   compUser.username as string
        // )
        //   .then((res) => {
        //     message.success('Submission Uploaded Succesfully');
        //     fetchTeamsCallback();
        //   })
        //   .catch((err) => {
        //     message.error(`${err}`);
        //   })
        //   .finally(() => {
        //     setUploading(false);
        //   });
    };


    function getOrdinal(number: any) {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const v = number % 100;
        return number + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    }


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
        {isLoadingTeamInfo ?
        <Skeleton active avatar = {true}  paragraph={{ rows: 6 }} />
        :
        <Content id="myTeamContainer" >
            {compUser.competitionTeam == null && (

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

            {compUser.competitionTeam !== null && (
                <section>
                    <div id="teamMainContent">

                        <div id="teamHeader">
                            <span>{generateTeamPicture(compUser)}</span>
                            <div id="teamNameWrapper">
                                <article>
                                    <h3>{compUser.competitionTeam.teamName}</h3>
                                    <p id = "rankingTag">{getOrdinal(rankData.rank)} place</p>
                                </article>
                            
                                <Button type = "link" size="large" id = "leaveTeamButton" onClick={showLeaveModal} icon = {<IoEllipsisVertical size = {28}/>}></Button>
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

                        {/** TODO: Lowkey don't know what stats would work best here as everything besides the score is not finalized */}

                        <div id="teamScoreHistorySection">
                            <h3>Score History</h3>
                            <LineChart scoreHistory={(teamInfo != null) ? teamInfo.scoreHistory.map(Number) : []}/>
                        </div>

                        <form id = "uploadFileSection">
                            <span id = "uploadFileHeader">
                                <h3  style = {{fontWeight: 800}}>Upload Submission</h3>
                                <Tooltip title = {<p id = "submissionCountDown">{metaData.submissionsEnabled ? <CountdownTimer endDate={metaData.endDate}/> : "Submissions have closed" }</p> }>
                                    <FaClock size = {28} />
                                </Tooltip>
                            
                            </span>
                            <TextArea
                                // showCount
                                id ="uploadDescription"
                                rows={1}
                                autoSize
                                maxLength={300}
                                size="large"
                                placeholder="Add a description. Max character limit of 300"
                                value={desc}
                                style = {{marginBottom: "2rem", height: "100px", border: "none", resize: "none"}}
                                onChange={(evt) => setDesc(evt.target.value)}
                            />
                            <Dragger style = {{borderRadius: "20px", background: "white", border: "none"}}height={150} {...uploadProps}>
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

                        {/** TODO: This might have to be its own component
                         *  Requirements to do this: The submissionLog component will have to utilize some prop drilling (yeah ik it sucks) to access callback functions
                         *  to update the team information whenever the user deletes their own submissions. Also the whenever the user uploads a file
                         *  from the myTeam tab, it should trigger an update for the team info and the submission log.
                         */}
                        <SubmissionsPreview  teamInfo={teamInfo} competitionName= {metaData.competitionName} />


                    </div>

                    <div id ="sideContent">

                        <div id = "membersBox">
                            <div id="teamMembersHeader">
                                <h3  className="heading" style = {{marginRight: "1rem", fontWeight: 800}}>Members</h3>
                                <Button size="large" id="inviteButton" onClick={showInviteModal} icon = {<IoPersonAdd size = {14}/>}>Invite</Button>
                                <Modal centered cancelButtonProps={{ style: { display: 'none' } }} title="Invite friends to your team" open={isInviteModalVisible} onOk={handleInviteModalClose}>
                                    <p>Share your Invite Code to your friend. Make sure to tell them your team name as well!</p>
                                    {/* TODO: For some reason, I couldn't get the CSS to show up when I put it in the CSS file */}
                                    <h3 style={{
                                        fontWeight: 'bold',
                                        marginTop: '5px'
                                    }}>
                                        {compUser.competitionTeam.joinCode}
                                    </h3>
                                </Modal>
                            </div>
                            {compUser.competitionTeam.teamMembers.map((member: string, index: number) => (
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
                            <h3  className="heading" style = {{marginRight: "1rem", fontWeight: 800, color: "white", marginBottom: "1rem"}}>Matches</h3>
                            <p style = {{color: "white"}}>Check out your team's match replays to see how well youre performing!</p>
                        </div>
                    </div>
                </section>
            )}
        </Content>
         }
        </>
    );
    
};



function CompetitionPortalPage() {

    const competitionName = "TestCompetition2";
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

    // Function to get compeitition meta data
    const getCompMetaData = async () => {

        getMetaData(competitionName).then((res) => {
            setMetaData(res.data);
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
        if (Object.keys(compUser).length !== 0) {
            if (compUser.competitionTeam != null) {
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


            <Content className="CompetitionPortalPage">
                <Content id="portalHeader">
                    <section>
                        <span>
                            <h1 className="title2">Hello, {user.username}</h1>
                            <Button size = "large"><p>Help</p></Button>
                        </span>
                        <div id="portalBanner">
                            <p>Welcome the the AI Portal for {competitionName}</p>
                        </div>

                    </section>


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
                                        <div className="portalStatsBox">
                                            <span>
                                                {/* <FaCheck size={20} style={{ padding: "6px", borderRadius: "8px", color: "#ff6f6f", background: "pink", marginRight: "1rem" }} /> */}
                                                <FaCheck size={20} style={{ padding: "6px", borderRadius: "8px", color: "white", background: "black", marginRight: "1rem" }} />
                                                <p>Your Submissions</p>
                                            </span>

                                            <p className="stat">0</p>

                                        </div>

                                        <div className="portalStatsBox">
                                            <span>
                                                <BiStats size={24} style={{ padding: "4px", borderRadius: "8px", color: "white", background: "black", marginRight: "1rem" }} />
                                                <p>Best Score</p>
                                            </span>

                                            <p className="stat">{userRankData.score}</p>
                                        </div>

                                        <div className="portalStatsBox">
                                            <span>
                                                <FaStar size={20} style={{ padding: "6px", borderRadius: "8px", color: "white", background: "black", marginRight: "1rem" }} />
                                                <p>Ranking</p>
                                            </span>
                                            <p className="stat">{userRankData.rank}</p>
                                        </div>

                                        <div className="portalStatsBox">
                                            <span>
                                                <FaStar size={20} style={{ padding: "6px", borderRadius: "8px", color: "white", background: "black", marginRight: "1rem" }} />
                                                <p>Matches Played</p>
                                            </span>
                                            <p className="stat">0</p>
                                        </div>
                                    </section>
                                }
                            </>
                            )}
                    </section>
                </Content>

                <Content id="portalTabContent">
                    <Tabs
                        size="small"
                        animated={true}
                        tabPosition="top"
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
                                        fetchTeams={fetchTeams}
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
