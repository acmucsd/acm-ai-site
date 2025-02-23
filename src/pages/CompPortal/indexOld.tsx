import DefaultLayout from '../../components/layouts/default';
import React from "react";
import { Button, Card, Row, Col, Typography, Avatar } from "antd";
import "./index.less";

const { Title, Text } = Typography;

const CompetitionPortal: React.FC = () => {
  return (

    <DefaultLayout>
    <div className="competition-container">
      

      {/* Competition Portal Header */}
      <Title className="portal-title">
        Competition <span className="highlight">Portal</span>
      </Title>

      {/* User Profile Section */}
      <Card className="profile-card">
        <Avatar size={80} className="profile-avatar" />
        <div className="profile-info">
          <Title level={4}>First Name, Last Name</Title>
          <Text>Level: ___</Text>
          <Button className="points-btn"># Points</Button>
        </div>
      </Card>

      {/* Competition Stats Section */}
      <div className="stats-section">
        <Title level={3} className="stats-title">
          Competition Stats:
        </Title>
        <Row gutter={[16, 16]} className="stats-grid">
        <Col span={12}>
            <Card className="stats-card"># of Submissions</Card>
        </Col>
        <Col span={12}>
            <Card className="stats-card">Best Score:</Card>
        </Col>
        <Col span={12}>
            <Card className="stats-card">Ranking:</Card>
        </Col>
        <Col span={12}>
            <Card className="stats-card">Matches Played:</Card>
        </Col>
        </Row>
      </div>

      {/* Gifts Section */}
      <div className="gifts-section">
        <Title level={3} className="gifts-title">Gifts</Title>
        <Text className="gifts-subtext">
          Redeem Gifts based on your # of points!
        </Text>
        <Row gutter={[16, 16]} className="gifts-grid">
          <Col span={8}>
            <Card className="gift-card">
              <Button className="redeem-btn">2000 pts</Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="gift-card">
              <Button className="redeem-btn">2000 pts</Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="gift-card">
              <Button className="redeem-btn">2000 pts</Button>
            </Card>
          </Col>
        </Row>
      </div>
    </div>

    </DefaultLayout>
  );
};

export default CompetitionPortal;
