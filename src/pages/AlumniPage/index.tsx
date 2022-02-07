import React, { useEffect } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Col, Row } from 'antd';
import { Card } from '../../components/Card';
import { ex } from './text';

const ColoredLine = () => (
  <hr
    style={{
      color: 'gray',
      backgroundColor: 'gray',
      height: '10%',
    }}
  />
);

const AlumniPage = () => {
  return (

    <DefaultLayout>
      <div className="AlumniPage">
        <div className="hero">
          <h1 id="title">Hello, we are ACM AI at UCSD</h1>
        </div>
        <div>
        <div className="main-section">
        <h2 className="statement"> Your hardwork will not be forgotten </h2>
        <br />
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
          justify="center"
        >
          {ex.map((cardText) => {
            return (
              <Col xs={12} md={8}>
                <Card>
                  <h3>{cardText.role +': '}{cardText.name}</h3>
                  <p className="position">
                    {cardText.year + ' '}
                    {cardText.major + ' major'}
                  </p>
                  <ColoredLine />
                  <p className="quote">
                    {cardText.bio}
                  </p>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
      </div>
      </div>
    </DefaultLayout>
  );
};

export default AlumniPage;
