import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import Number from '../../components/Statistic';
import { Layout, Button, Row, Col } from 'antd';
import MainFooter from '../../components/MainFooter';
import competitionsData from './competitionsData.json';
const { Content } = Layout;

// interface CompetitionButtonProps {
//   link1: string | { pathname: string; };
//   link1desc: string;
//   link2: string | { pathname: string; };
//   link2desc: string;
//   link3: string | { pathname: string; };
//   link3desc: string;
// }

// function CompetitionButtons({
//   link1, link1desc, link2, link2desc, link3, link3desc
//   } : CompetitionButtonProps ) {
//   const buttonSize = 'large';

//   return (
//     <div>
//       <Space wrap>
//         <Link to={link1}>
//           <Button className = "compButtonPrimary"size={buttonSize} type="primary" danger><p>{link1desc}</p></Button>
//         </Link>
//         {link2 && (
//           <Link to={link2} target="_blank">
//             <Button className = "compButtonSecondary" size={buttonSize}><p>{link2desc}</p></Button>
//           </Link>
//         )}
//         {link3 && (
//           <Link to={link3} target="_blank">
//             <Button className = "compButtonSecondary" size={buttonSize}><p>{link3desc}</p></Button>
//           </Link>
//         )}
//       </Space>
//     </div>
//   );
// }

function CompetitionsPage(props: any) {
  useEffect(() => {}, []);
  const spaceSize = 10;
  const color = ['#ff4d4f','#ff8d8b','#fe8019']

  return (
    <DefaultLayout>
      <Content className="CompetitionsPage">
        <Content>
          <div className="competitionHeader">
            <h1 className="title2">Competitions</h1>
            <h4>
              These are fun competitions (with prizes) where you employ some
              aspect (or none at all) of AI to compete. We run standard AI
              programming competitions as well as Reinforcement Learning (RL)
              centric competitions using{' '}
              <a
                href="https://gymnasium.farama.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gymnasium.{' '}
              </a>
              All skill levels are welcome!
            </h4>

            <div className="noCompetitionsBox">
              <p>No upcoming competitions yet!</p>
            </div>
          </div>
        </Content>

        <Content className="pastCompetitionsHeader">
          <h1 className="title2">Looking Back</h1>
          <h4>
            Explore our previous endeavors into AI over the years. Each one
            showcases the hard work and accomplishments of our participants.
          </h4>
        </Content>

        <Content className="competitionsSection">
          
          {competitionsData.map((competition, index) => (
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
                <Col className="competitionStats" span={18}>
                {Object.entries(competition.stats).map(([key, value], statIndex) => (
                  <Number
                  color={color[statIndex]}
                  description={key}
                  prepend={key === 'In Prizes' ? "$" : "" }
                  extension={key === "Matches Played" || key === "Submissions" ? "+" : ""}
                  number={value}
                  />
                ))}
                  
                </Col>

                <Col span={6}>
                  <Link to={competition.link}>
                    <Button
                      className="compButtonPrimary"
                      size="large"
                      type="primary"
                      danger
                    >
                      <p>Leaderboard &gt;</p>
                    </Button>
                  </Link>
                  
                </Col>

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
