import React, { useEffect } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Col, Row } from 'antd';
import { Card } from '../../components/Card';
import { directors, operations, dev, external, ex } from './text';

const ColoredLine = () => (
  <hr
    style={{
      color: 'gray',
      backgroundColor: 'gray',
      height: '10%',
    }}
  />
);

const AboutPage = () => {
  return (

    <DefaultLayout>
      <div className="AboutPage">
        <div>
          <h1>Hello, we are ACM AI at UCSD</h1>
        </div>
        <h2>And these are the people running the show!</h2>
        <br />
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
          justify="center"
        >
          {directors.map((cardText) => {
            return (
              <Col xs={12} md={8}>
                <Card hoverable='True'
                      cover={<img
                        src={cardText.picture}
                        alt="Nope"
                        width="40%"
                        height="40%"
                      ></img>}
                >
                  <h3>{cardText.role +'- '}{cardText.name}</h3>
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
        <ColoredLine />
        <div>
          <h2> Our team of event leads who design and host all the events </h2>
        </div>
        <br />
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
          justify="center"
        >
          {operations.map((cardText) => {
            return (
              <Col xs={12} md={8}>
                <Card hoverable='True'
                      cover={<img
                        src={cardText.picture}
                        alt="Nope"
                        width="40%"
                        height="40%"
                      ></img>}
                >
                <h3>{cardText.role +'- '}{cardText.name}</h3>
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
        <ColoredLine />
        <div>
          <h2>
            {' '}
            Our team of developers working tirelessly to keep everything running
            smoothly{' '}
          </h2>
        </div>
        <br />
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
          justify="center"
        >
          {dev.map((cardText) => {
            return (
              <Col xs={12} md={8}>
                <Card hoverable='True'
                      cover={<img
                        src={cardText.picture}
                        alt="Nope"
                        width="40%"
                        height="40%"
                      ></img>}
                >
                  <h3>{cardText.role +'- '}{cardText.name}</h3>
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
        <ColoredLine />
        <div>
          <h2> Our wonderful marketing and sponsorship team </h2>
        </div>
        <br />
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
          justify="center"
        >
          {external.map((cardText) => {
            return (
              <Col xs={12} md={8}>
                <Card hoverable='True'
                      cover={<img
                        src={cardText.picture}
                        alt="Nope"
                        width="40%"
                        height="40%"
                      ></img>}
                >
                  <h3>{cardText.role +'- '}{cardText.name}</h3>
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
        <ColoredLine />
        <div>
          <h2> Your hardwork will not be forgotten </h2>
        </div>
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
                <Card hoverable='True'>
                  <h3>{cardText.role +'- '}{cardText.name}</h3>
                  <p className="position">
                    {cardText.year + ' '}
                    {cardText.major + ' major'}
                  </p>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </DefaultLayout>
  );
};

export default AboutPage;
