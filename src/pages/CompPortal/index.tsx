import React, { useState } from "react";
import { Row, Col, Card, Button, Avatar, Input, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./index.less";
import DefaultLayout from '../../components/layouts/default';

const CompetitionPortal: React.FC = () => {

    const [selectedTab, setSelectedTab] = useState<string>('My Team');

    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);
    };
    const { Search } = Input;
    const onSearch = (value : string) => console.log(value);


    // need to fetch from backend
    let stats = ["12", "1260", "9th", "5"]
    let teamName = "I love cats <33"
    let member = [1, 2, 3, 4]

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
        {stats.map((value, index) => (
            <Col span={6} key={index} className="stat-col">
            <Card className="stat-card" bordered={false}>
                <div className="stat-value">{value}</div>
            </Card>
            </Col>
        ))}
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
        (<Card className="team-section">
        <div className="team-info">
            <div className="team-name">{teamName}</div>
        </div>
        <div className="team-members">
            {member.map((_, index) => (
            <Card className="member-card" key={index}>
                <Avatar size={40} icon={<UserOutlined />} />
                <span>Name L.</span>
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
        </Card>) : null }



        {selectedTab === 'Find Team' ? (
        <div className="search-tab">
            <Search
            placeholder="Search"
            allowClear
            onSearch={(e) => onSearch(e)}
            style={{ width: 304 }}
            />

            {member.map((_, index) => (
                <div className="all-teams">
                <Card className="team-section" key={index}>
                <div className="team-info">
                    <div className="team-name">{teamName}</div>
                </div>
                <div className="team-members">
                    {member.map((_, index) => (
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
            onSearch={(e) => onSearch(e)}
            style={{ width: 304 }}
            />

            {member.map((_, index) => (
                
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
