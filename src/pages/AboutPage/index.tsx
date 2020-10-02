import React, { useEffect, useState } from 'react';
import './index.less';
import DefaultLayout from "../../components/layouts/default";
import { Col, Row } from 'antd';
import Card from '../../components/Card';

function AboutPage(props: any) {
  return (
    <DefaultLayout>
      <div className='AboutPage'>
        <div><h2>Hello, we are ACM AI at UCSD</h2></div>
        <p>And these are the people running the show</p>
        <br/>
        <Row gutter={[24, 24]} justify="center">
          <Col>
            <Card>
              <h3>President</h3>
              <p>Stone Tao</p>
              <p>Computer Science and Cognitive Science (ML)</p>
            </Card>
          </Col>
          <Col>
            <Card>
              <h3>Director of Operations</h3>
              <p>Catherine Lee</p>
              <p>Computer Science</p>
            </Card>
          </Col>
          <Col>
            <Card>
              <h3>Director of Marketing</h3>
              <p>Jonathan Zamora</p>
              <p>Computer Science</p>
            </Card>
          </Col>
          <Col>
            <Card>
              <h3>Event Lead</h3>
              <p>Alvin Wang</p>
              <p>Computer Science</p>
            </Card>
          </Col>
          <Col>
            <Card>
              <h3>Event Lead</h3>
              <p>Edward Yang</p>
              <p>Computer Science</p>
            </Card>
          </Col>
          <Col>
            <Card>
              <h3>Event Lead</h3>
              <p>Jason Vega</p>
              <p>Computer Science</p>
            </Card>
          </Col>
        </Row>
      </div>
    </DefaultLayout>
  );
}

export default AboutPage
