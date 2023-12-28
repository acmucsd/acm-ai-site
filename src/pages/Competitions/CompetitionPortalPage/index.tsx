import React, { useContext, useEffect, useState } from "react";
import { Affix, AutoComplete, Statistic, Drawer, List, Skeleton, Tabs, Tooltip, message, Empty } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined, PlusOutlined, InboxOutlined } from '@ant-design/icons';
import { Form, Layout, Button, Input, Modal, Upload } from 'antd';
import type { UploadProps } from 'antd';
import UserContext, { User } from "../../../UserContext";
import { useHistory } from 'react-router-dom';
import {
    getTeamInfo,
    createTeam,
    getCompetitionUser,
    getTeams,
    leaveTeam
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

import { createAvatar } from '@dicebear/core';
import { botttsNeutral } from '@dicebear/collection';

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
                <Input size="large" placeholder="Look up a team name" />
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






const MyTeamTab = ({ compUser, fetchTeamsCallback }: { compUser: any, fetchTeamsCallback: () => void }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [newTeamName, setNewTeamName] = useState<string>("");
    const [isInviteModalVisible, setIsInviteModalVisible] = useState<boolean>(false);
    const [isLeaveModalVisible, setIsLeaveModalVisible] = useState<boolean>(false);

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
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const TeamMemberAvatar: React.FC<{ username: string }> = ({ username }) => {
        const [avatarUrl, setAvatarUrl] = useState('');
        useEffect(() => {
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
        }, [username]);
        return (
            <img
                src={avatarUrl}
                style={
                    {
                        width: '4rem',
                        height: '4rem',
                        marginRight: '0.75rem'
                    }
                }
                alt={`Avatar for ${username}`}
            />
        );
    }

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
                    height: '4rem',
                    background: `linear-gradient(30deg, ${color1}, ${color2})`,
                    marginRight: '0.75rem',
                }}>
            </div>
        )
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
                            <div>{generateTeamPicture()}</div>
                            <div id="teamNameWrapper">
                                <h3>{compUser.competitionTeam.teamName}</h3>
                                <Button size="large" onClick={showLeaveModal}>Leave</Button>
                                <Modal
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

                        <div id="teamScoreOverview">
                            <p className="statHeader">score</p>
                            <p className="score">0</p>
                            <div id="teamScoreSpecifics">
                                <div>
                                    <p className="statHeader">Sigma</p>
                                    <p className="stat">0.78</p>
                                </div>
                                <div>
                                    <p className="statHeader">Mu</p>
                                    <p className="stat">0.78</p>
                                </div>
                                <div>
                                    <p className="statHeader">MSE</p>
                                    <p className="stat">0.78</p>
                                </div>
                            </div>
                        </div>
                        <h3 className="mainHeader">Upload Submission</h3>

                        <form>
                            <Dragger height={150} {...uploadProps}>
                                <p className="antUploadDragIcon">
                                    <InboxOutlined />
                                </p>
                                <p className="antUploadText">Click or drag file to this area to upload</p>
                            </Dragger>
                            <Button
                                htmlType="submit"
                                className="submitButton"
                            >
                                Submit
                            </Button>
                        </form>

                        <h3 className="mainHeader">Submission Log</h3>
                    </div>

                    {/* <Affix style={{ position: 'absolute', right: 0, top: 10,}} offsetTop={20}> */}
                    <div id="teamAffix">
                        <div id="teamMembersHeader">
                            <h3 className="heading">Members</h3>
                            <Button size="large" id="inviteButton" onClick={showInviteModal}>Invite</Button>
                            <Modal cancelButtonProps={{ style: { display: 'none' } }} title="Invite friends to your team" open={isInviteModalVisible} onOk={handleInviteModalClose}>
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
                            <div id="teamMember" key={index}>
                                <TeamMemberAvatar username={member}></TeamMemberAvatar>
                                <div className="teamMemberTextWrapper">
                                    <p className="teamMemberName">{member}</p>
                                    <p>0 submissions</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* </Affix> */}
                </section>
            )}

        </Content>
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

        if (teamInfo !== null) {
            console.log("setting bar chart")
            // update the score history chart here
            if (teamInfo.scoreHistory) {
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
                            <Tooltip title="Help">
                                <Button icon={<IoHelp size={20} />}></Button>

                            </Tooltip>

                        </span>
                        <div id="portalBanner">
                            <p>Welcome the the AI Portal for {competitionName}</p>
                        </div>

                    </section>


                    <section id="portalStatsContent">

                        {isLoadingTeamInfo ? (
                            <Skeleton active></Skeleton>
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
                                                <FaCheck size={20} style={{ padding: "6px", borderRadius: "8px", color: "#ff6f6f", background: "pink", marginRight: "1rem" }} />
                                                <p>Your Submissions</p>
                                            </span>

                                            <p className="stat">0</p>

                                        </div>

                                        <div className="portalStatsBox">
                                            <span>
                                                <BiStats size={24} style={{ padding: "4px", borderRadius: "8px", color: "#fe8019", background: "#FCC777", marginRight: "1rem" }} />
                                                <p>Best Score</p>
                                            </span>

                                            <p className="stat">{userRankData.score}</p>
                                        </div>

                                        <div className="portalStatsBox">
                                            <span>
                                                <FaStar size={20} style={{ padding: "6px", borderRadius: "8px", color: "red", background: "pink", marginRight: "1rem" }} />
                                                <p>Ranking</p>
                                            </span>
                                            <p className="stat">{userRankData.rank}</p>
                                        </div>

                                        <div className="portalStatsBox">
                                            <span>
                                                <p>Score History</p>
                                                {scoreHistoryPercentage ?
                                                    <Statistic
                                                        value={Math.abs(scoreHistoryPercentage)}
                                                        precision={2}
                                                        valueStyle={{ color: scoreHistoryPercentage < 0 ? '#cf1322' : '#3f8600', fontSize: "1.2rem", display: "inline" }}
                                                        prefix={scoreHistoryPercentage < 0 ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
                                                        suffix="%"
                                                    />
                                                    :
                                                    <></>
                                                }
                                            </span>
                                            <div id="scoreHistoryChart">
                                                {barHeights.length > 0 ?
                                                    <>
                                                        {barHeights.map((height: number, index: any) => (
                                                            <Tooltip title={height}>
                                                                <div
                                                                    key={index}
                                                                    className="scoreBar"
                                                                    style={{ height: `${height * scale}px` }}
                                                                ></div>

                                                            </Tooltip>
                                                        ))}
                                                        {Array.from({ length: 7 - barHeights.length }, (index: any) => (
                                                            <div
                                                                key={index}
                                                                className="scoreBar"
                                                                style={{ height: `92px`, backgroundColor: "lightgrey" }}
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
                                    key: '1',
                                    children: <LeaderBoardTab
                                        rankData={rankingsData}
                                        lastRefresh={lastRefresh}
                                        updateRankingsCallback={updateRankings}
                                        isLoading={isLoadingLeaderBoard} />
                                },
                                {
                                    label: <p>Find Teams</p>,
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
