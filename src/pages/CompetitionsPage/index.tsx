import React, { useEffect } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Link } from 'react-router-dom';
import { Layout, Card, Col, Row } from 'antd';
import DiscordLink from '../../components/DiscordLink';
const { Content, Footer } = Layout;
const { Meta } = Card;

function CompetitionsPage(props: any) {
  useEffect(() => {}, []);
  return (
    <DefaultLayout>
      <div className="CompetitionsPage">

        <Content className="competitionsHero">

            <div className = "headerContent">
              <h1 className = "title2">Competitions</h1>
              <h4>
                These are fun competitions (with prizes) where you employ some aspect (or none at all) 
                of AI to compete. We run standard AI programming competitions as well as Reinforcement Learning (RL) 
                centric competitions using {' '}
                <a
                  href="https://gym.openai.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open AI Gym.{' '} 
                </a>
                All skill levels are welcome!
              </h4>
            </div>
            
        </Content>
        {/* <div className="hero">
          <p className="subtext">
            <span>Element.AI competition starts February 18th</span>
            <br />
            <div className="button-wrapper">
              <Link to={{pathname: "https://acmurl.com/ai-competition-rsvp"}} target="_blank">
                <Button className="registerbtn">RSVP Now</Button>
              </Link>
              <Link to="/competitions/Element.AI">
                <Button className="registerbtn">More Details</Button>
              </Link>
            </div>
          </p>
        </div> */}

        <Footer className="competitionsFooter">
          <section className = "pastCompetitions">
            <h1 className="title2">Past Competitions</h1>
            <p>Explore the roster of our previous endeavors into various aspects of AI. We encourage you to apply to future competitions! </p>
          </section>
          <h3>Element AI</h3>

       
          
{/*           
          <Row className="pastCompetitions" gutter={16}>
            <Col span={8}>
              <Link to={`/old-competitions/nn`}>
                <Card 
                  className="pastCompetitionsCard"
                  hoverable 
                  bordered={false}
                >
                  <h2>2021</h2>
                  <h3>NN Modeling</h3>
                </Card>
              </Link>
            </Col>
            <Col span={8}>
            <Link to={`/old-competitions/nn`}>
                <Card 
                  className="pastCompetitionsCard"
                  hoverable 
                  bordered={false}
                >
                  <p>2021 - NN Modelling</p>
                </Card>
              </Link>
            </Col>
            <Col span={8}>
            <Link to={`/old-competitions/nn`}>
                <Card 
                  className="pastCompetitionsCard"
                  hoverable 
                  bordered={false}
                >
                  <p>2021 - NN Modelling</p>
                </Card>
              </Link>
            </Col>
          </Row>

          <p>
            <Link to={`/old-competitions/nn`}>
              2021 - NN Modelling
            </Link>
          </p>
          <p>
            <Link to={`/old-competitions/hide-and-seek2020`}>
              2020 - Hide and Seek
            </Link>
          </p>
          <p>
            <Link to="/old-competitions/energium/">2020 - Energium AI</Link>
          </p> */}
        </Footer>
      </div>
    </DefaultLayout>
  );
}

export default CompetitionsPage;
