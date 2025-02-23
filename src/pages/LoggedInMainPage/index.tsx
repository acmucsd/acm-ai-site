import React from "react";
import { Row, Col } from "antd";
import "./index.less";

interface LoggedInMainPageProps {
  name: string;
  memberSince: string;
  lastLogin: string;
}

const LoggedInMainPage: React.FC<LoggedInMainPageProps> = ({
  name,
  memberSince,
  lastLogin,
}) => {
  return (
    <div className="logged-in-main-page">
      {/* Welcome Section */}
      <Row justify="center" className="welcome">
        <Col>
          <h3>
            Welcome, <span className="highlight">{name}</span>.
          </h3>
        </Col>
      </Row>

      {/* Info Section */}
      <Row className="info-section">
        <Col span={8} style={{ background: '#f0f0f0', textAlign: 'center' }}>
          <div className="info-card">
            <p>Member Since:</p>
            <h2>{memberSince}</h2>
          </div>
        </Col>
        <Col span={8} style={{ background: '#f0f0f0', textAlign: 'center' }}>
          <div className="info-card">
            <p>Last Login:</p>
            <h2>{lastLogin}</h2>
          </div>
        </Col>
      </Row>

      {/* Explore Section */}
      <Row justify="center" className="explore-section">
        <Col span={24}>
          <h3>
            Explore more of <span className="highlight">ACM AI</span>.
          </h3>
        </Col>
        <Row justify="center" gutter={16} className="explore-cards">
          <Col span={8}>
            <div className="explore-card">
              <h3>Events</h3>
              <button className="explore-button">→</button>
            </div>
          </Col>
          <Col span={8}>
            <div className="explore-card">
              <h3>Competitions</h3>
              <button className="explore-button">→</button>
            </div>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default LoggedInMainPage;
