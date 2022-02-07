import React from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Col, Row } from 'antd';
import { Card } from '../../components/Card';
import { directors, operations, dev, external} from './text';

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
        <div className="hero">
          <h1 id="title">Hello, we are ACM AI at UCSD</h1>
        </div>
        <div>
        <div className="main-section">
        <h2 className="statement">And these are the people running the show!</h2>
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
                <Card cover={<img
                        src={cardText.picture}
                        alt="Nope"
                        width="40%"
                        height="40%"
                      ></img>}
                >
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
        <div className="main-section">
          <h2 className="statement"> Our team of event leads who design and host all the events </h2>
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
                <Card cover={<img
                        src={cardText.picture}
                        alt="Nope"
                        width="40%"
                        height="40%"
                      ></img>}
                >
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
        <div className="main-section">
           <h2 className="statement"> Our team of developers working tirelessly to keep everything running smoothly</h2>
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
                <Card   cover={<img
                        src={cardText.picture}
                        alt="Nope"
                        width="40%"
                        height="40%"
                      ></img>}
                >
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
        <div className="main-section">
          <h2 className="statement"> Our wonderful marketing and sponsorship team </h2>
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
                <Card cover={<img
                        src={cardText.picture}
                        alt="Nope"
                        width="40%"
                        height="40%"
                      ></img>}
                >
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

export default AboutPage;
