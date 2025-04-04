import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Card, Button, Avatar, Input, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./index.less";
import DefaultLayout from '../../components/layouts/default';
import UserContext from "../../UserContext";

import { getCompetitionUser, getTeamInfo, searchTeam, searchUser } from '../../actions/teams/utils'

const CompetitionPortal: React.FC = () => {

    const { user } = useContext(UserContext);
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [teamInfo, setTeamInfo] = useState<any>({});
    const [teamName, setTeamName] = useState<string>("");
    const [teamMembers, setTeamMembers] = useState<string[]>([]);
    const [isMyTeam, setIsMyTeam] = useState<boolean>(false);
    const competitionName: string = process.env.CURRENT_COMP || 'test';

    const [submitCount, setSubmitCount] = useState<number>(0);
    const [bestScore, setBestScore] = useState<number>(0);
    const [ranking, setRanking] = useState<number|string>("N/A");
    const [match, setMatch] = useState<number>(0);

    const [displayList, setDisplayList] = useState<any[]>([]);

    

    // const [submissionData, setSubmissionData] = useState<SubmissionData[]>([]);
    // const [submissionIds, setSubmissionIds] = useState<any>([]);


    // Check if user is logged in
    useEffect(() => {
        if (user.loggedIn) {
        // TODO: it's hardcoded to "testinguser1"; change it to user.username
            getCompetitionUser(competitionName, user.username).then((res) => {
                setIsRegistered(res.data.registered);
                if (res.data.competitionTeam) {
                    console.log("hello")
                  getTeamInfo(competitionName, res.data.competitionTeam.teamName).then(
                    (res) => {
                        console.log(res.data)
                      setTeamMembers(Object.values(res.data.teamMembers))
                      setTeamName(JSON.stringify(res.data.teamName).slice(1, -1))

                      setSubmitCount(res.data.submitHistory.length)
                      setBestScore(res.data.bestScore)
                    }
                  );
                }
              });
              setDisplayList([1, 2, 3])

            
            // getTeams(competitionName).then((res)=>{
                
            // })
        }
    }, [user, competitionName]);

    const [selectedTab, setSelectedTab] = useState<string>('My Team');

    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);
    };
    const { Search } = Input;
    const onSearch = async (value: string, tab: string) => {
        if (!value.trim()) {
            setDisplayList([]); 
            return;
        }
    
        try {
            console.log(value)
            console.log(tab)
            let response;
            if (tab == "Find Team") {
                response = await searchTeam(competitionName, value);
            }
            else {
                response = await searchUser(competitionName, value);
            }

            setDisplayList(response.data); 
        } catch (error) {
            console.error("Search error:", error);
        }
    };
    


    // need to fetch from backend
    let stats = [ "1260", "9th", "5"]

    console.log("submitCount: ", submitCount)

    return (
    <DefaultLayout>
    <div className="competition-portal">
        <h1>
        Welcome to <span className="highlight">Competitions Portal.</span>
        </h1>

        <div className="stats-container">
        {/* Titles Row */}
        <Row gutter={16} justify="center" className="stats-row titles">
        <Col span={6} className="stat-title">Your Submissions</Col>
        <Col span={6} className="stat-title">Best Score</Col>
        <Col span={6} className="stat-title">Ranking</Col>
        <Col span={6} className="stat-title">Matches Played</Col>
        </Row>

        {/* Values Row */}
        <Row gutter={16} justify="center" className="stats-row values">

            <Col span={6} className="stat-col">
            <Card className="stat-card" bordered={false}>
                <div className="stat-value">{submitCount}</div>
            </Card>
            </Col>

            <Col span={6} className="stat-col">
            <Card className="stat-card" bordered={false}>
                <div className="stat-value">{bestScore}</div>
            </Card>
            </Col>

            <Col span={6} className="stat-col">
            <Card className="stat-card" bordered={false}>
                <div className="stat-value">{ranking}</div>
            </Card>
            </Col>

            <Col span={6} className="stat-col">
            <Card className="stat-card" bordered={false}>
                <div className="stat-value">{match}</div>
            </Card>
            </Col>
        
        </Row>
    </div>

        {/* Tabs Section */}
        <div className="tabs-container">

        <Row gutter={64}>
            <Col className={`tab-left ${selectedTab === 'My Team' ? 'selected' : ''}`} onClick={() => handleTabClick('My Team')}>My Team</Col>
            <Col className={`tab ${selectedTab === 'Find Team' ? 'selected' : ''}`} onClick={() => handleTabClick('Find Team')}>Find Team</Col>
            <Col className={`tab ${selectedTab === 'Search Member' ? 'selected' : ''}`} onClick={() => handleTabClick('Search Member')}>Search Member</Col>
            <Col className={`tab-right ${selectedTab === 'Leaderboard' ? 'selected' : ''}`} onClick={() => handleTabClick('Leaderboard')}>Leaderboard</Col>
        </Row>
        
        </div>

        {/* Team Section */}
        {selectedTab === 'My Team' ? 
        (teamName === "" ? 
            (
                <Card className="stats-container"> 
                    Find a team to join under the Find Team tab ^_^
                </Card>
            )
        : (<Card className="team-section">
        <div className="team-info">
            <div className="team-name">{teamName}</div>
        </div>
        <div className="team-members">
            {teamMembers.map((mem, index) => (
            <Card className="member-card" key={index}>
                <Avatar size={40} icon={<UserOutlined />} />
                <span>{mem}</span>
            </Card>
            ))}
        </div>
        <div className="team-actions">
            <Button danger className="leave-group">
            Leave Group
            </Button>
            <Button type="primary" className="add-member">
            Add Member
            </Button>
        </div>
        </Card>)) : null }



        {selectedTab === 'Find Team' ? (
        <div className="search-tab">
            <Search
            placeholder="Search"
            allowClear
            onSearch={(e) => onSearch(e, selectedTab)}
            style={{ width: 304 }}
            />

            {displayList.map((_, index) => (
                <div className="all-teams">
                <Card className="team-section" key={index}>
                <div className="team-info">
                    <div className="team-name">{teamName}</div>
                </div>
                <div className="team-members">
                    {displayList.map((_, index) => (
                    <Card className="member-card" key={index}>
                        <Avatar size={40} icon={<UserOutlined />} />
                        <span>Name L.</span>
                    </Card>
                    ))}
                </div>
                <div className="one-btn">
                    <Button type="primary" className="join-team">
                    Join Team
                    </Button>
                </div>
                </Card>
                </div>
            ))}
        
        </div>) :null }



        {selectedTab === 'Search Member' ? (
        <div className="search-tab">
            <Search
            placeholder="Search"
            allowClear
            onSearch={(e) => onSearch(e, selectedTab)}
            style={{ width: 304 }}
            />

            {displayList.map((_, index) => (
                
                <Card className="member-section" key={index}>

                    <div className="member-info">
                        <Avatar size={50} icon={<UserOutlined />} />
                        <div className="member-name">
                            <Row>
                                <Col>First Name, Last Name</Col>
                            </Row>
                        </div>
                    </div>

                    <Row>
                        <Col className="tags">
                            <Tag color="red">Computer Science</Tag>
                            <Tag color="red">Third Year</Tag>
                            <Tag color="red">ML</Tag>
                            <Tag color="red">Computer Vision</Tag>
                            <Tag color="red">Tag 3</Tag>
                            <Tag color="red">Tag 4</Tag>
                            <Tag color="red">Tag 5</Tag>
                        </Col>
                    </Row>

                
                <div className="one-btn">
                    <Button type="primary" className="join-team">
                    Add Team Member
                    </Button>
                </div>
                </Card>
            ))}
        
        </div>) :null }

    </div>

    </DefaultLayout>
    );
};

export default CompetitionPortal;
