import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import Number from '../../components/Statistic';
import { Layout, Button, Row, Col } from 'antd';
import MainFooter from '../../components/MainFooter';
import competitionsData from './competitionsData.json';
import { Competition } from './competition';
import tempComp from '../../../public/temp_comp.png'
const { Content } = Layout;


function CompetitionsPage(props: any) {
  useEffect(() => {}, []);
  const spaceSize = 10;
  const color = ['#ff4d4f','#ff8d8b','#fe8019']
  const competitions: Competition[] = competitionsData;
  
  return (
    <DefaultLayout>
      <Content className="CompetitionsPage">

      <img src={tempComp} className="mobileIcon"/>

        <Row className="competitionMain">
          <Col className="containerForImage">
          <img src={tempComp} />
          </Col>

          <Col className="info">
            <h1><span className="colorful">AI</span> Competitions</h1>
            <h3>All skill levels are welcome!</h3>
            <p>These are fun competitions (with prizes) where you employ some aspect (or none at all) of AI to compete. </p>

            <Row className="buttons">
              <Col>
                  <a href="https://acmurl.com/ai-competition-signup-2025" target="_blank" rel="noopener noreferrer">
                      <Button size="large" shape="round" className="interestButton">Interest Form &gt;</Button>
                  </a>
              </Col>
              {/* <Col>
                  <Link to={{ pathname: "#" }} target="_blank" >
                      <Button size="large" shape="round" className="portalButton">Competitions Portal &gt;</Button>
                  </Link>
              </Col> */}
            </Row>
          </Col>

        </Row>

        <Content className="competitionsSection">
          
          {competitions.map((competition, index) => (
            <div key={index} className="competitionDiv">

              <div className="pastCompetitions">

              <Row justify="space-between" align="middle" wrap>
                <Col flex="0 0 3rem" style={{ marginRight: '1rem' }}>
                  <img src={competition.icon} alt="icon"/>
                </Col>
                <Col flex="1 1 3rem">
                  <h3>{competition.competitionName}</h3>
                </Col>
                <Col flex="0 0 3rem" offset={2} className="year" >
                  <h3>{competition.year}</h3>
                </Col>
              </Row>

              <Row>
                <p className="description">{competition.description}</p>
              </Row>


              <Row className="competitionInfo">
                {Object.entries(competition.stats).map(([key, value], statIndex) => (
                  <Number
                  color={color[statIndex]}
                  description={key}
                  prepend={key === 'In Prizes' ? "$" : "" }
                  extension={key === "Matches" || key === "Submissions" ? "+" : ""}
                  number={value}
                  />
                ))}
              </Row>

              <Row className="competitionButtons">
                <div className="homeButtons">
                  {competition.link && (
                    <Link to={competition.link}>
                        <Button 
                          size="large" type="primary" danger className="compButtonPrimary">
                            More Info &gt;
                        </Button>
                    </Link>
                  )}

                  {competition.leaderboard && (
                    <Link to={competition.leaderboard}>
                      <Button
                        size="large" type="primary" danger className="compButtonPrimary">
                        Leaderboard &gt;
                      </Button>
                    </Link>
                  )}
                    
                </div>

              </Row>
            </div>
            </div>
          ))}
        </Content>

        <MainFooter />
      </Content>
    </DefaultLayout>
  );
}

export default CompetitionsPage;
