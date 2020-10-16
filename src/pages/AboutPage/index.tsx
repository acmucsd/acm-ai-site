import React from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Col, Row } from 'antd';
import Card from '../../components/Card';
import { text } from './text';

function AboutPage() {
  return (
    <DefaultLayout>
      <div className="AboutPage">
        <div>
          <h2>Hello, we are ACM AI at UCSD</h2>
        </div>
        <p>And these are the people running the show</p>
        <br />
        <Row gutter={[24, 24]} justify="center">
          {text.map((cardText) => {
            return (
              <Col>
                <Card>
                  <h3>{cardText.role}</h3>
                  <p>{cardText.name}</p>
                  <p>{cardText.major}</p>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </DefaultLayout>
  );
}

export default AboutPage;
