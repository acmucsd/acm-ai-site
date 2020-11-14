import React, {useEffect} from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Col, Row } from 'antd';
import Card from '../../components/Card';
import { directors,operations,dev,external,ex } from './text';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ColoredLine = () => (
    <hr
        style={{
            color: "gray",
            backgroundColor: "gray",
            height: 5
        }}
    />
);

function AboutPage() {
  useEffect(() => {
    AOS.init({duration: 2000});
  },[]);
  return (
    <DefaultLayout>
      <div className="AboutPage">
        <div data-aos="fade-left">
          <h1>Hello, we are ACM AI at UCSD</h1>
        </div >
        <h2 data-aos="fade-left">And these are the people running the show!</h2>
        <br />
        <Row data-aos="fade-left" gutter={[24, 24]} justify="center" >
          {directors.map((cardText) => {
            return (
              <Col>
                <Card>
                  <img src="https://i.stack.imgur.com/l60Hf.png" alt="Nope" width="220" height="160"></img>
                  <h3>{cardText.role}</h3>
                  <p>{cardText.name}</p>
                  <p>{cardText.year + " "}{cardText.major + " major"}</p>
                </Card>
              </Col>
            );
          })}
        </Row>
        <ColoredLine />
        <div data-aos="fade-left">
          <h2> Our team of event leads who design and host all the events </h2>
        </div>
        <br />
        <Row data-aos="fade-left" gutter={[24, 24]} justify="center">
          {operations.map((cardText) => {
            return (
              <Col>
                <Card>
                  <img src="https://i.stack.imgur.com/l60Hf.png" alt="Nope" width="220" height="160"></img>
                  <h3>{cardText.role}</h3>
                  <p>{cardText.name}</p>
                  <p>{cardText.year + " "}{cardText.major + " major"}</p>
                </Card>
              </Col>
            );
          })}
        </Row>
        <ColoredLine />
        <div data-aos="fade-left">
          <h2> Our team of developers working tirelessly to keep everything running smoothly </h2>
        </div>
        <br />
        <Row data-aos="fade-left" gutter={[24, 24]} justify="center">
          {dev.map((cardText) => {
            return (
              <Col>
                <Card>
                  <img src="https://i.stack.imgur.com/l60Hf.png" alt="Nope" width="220" height="160"></img>
                  <h3>{cardText.role}</h3>
                  <p>{cardText.name}</p>
                  <p>{cardText.year + " "}{cardText.major + " major"}</p>
                </Card>
              </Col>
            );
          })}
        </Row>
        <ColoredLine />
        <div data-aos="fade-left">
          <h2> Our wonderful marketing and sponsorship team </h2>
        </div>
        <br />
        <Row data-aos="fade-left" gutter={[24, 24]} justify="center">
          {external.map((cardText) => {
            return (
              <Col>
                <Card>
                  <img src="https://i.stack.imgur.com/l60Hf.png" alt="Nope" width="220" height="160"></img>
                  <h3>{cardText.role}</h3>
                  <p>{cardText.name}</p>
                  <p>{cardText.year + " "}{cardText.major + " major"}</p>
                </Card>
              </Col>
            );
          })}
        </Row>
        <ColoredLine />
        <div data-aos="fade-left">
          <h2> Your hardwork will not be forgotten </h2>
        </div>
        <br />
        <Row data-aos="fade-left" gutter={[24, 24]} justify="center">
          {ex.map((cardText) => {
            return (
              <Col>
                <Card>
                  <img src="https://i.stack.imgur.com/l60Hf.png" alt="Nope" width="220" height="160"></img>
                  <h3>{cardText.role}</h3>
                  <p>{cardText.name}</p>
                  <p>{cardText.year + " "}{cardText.major + " major"}</p>
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
