import { Row, Col, Layout, Avatar, Tooltip } from 'antd';
import React from 'react';
import './index.less';
import { AiOutlineLink } from 'react-icons/ai';
import { BiLogoInstagram, BiLogoDiscord } from 'react-icons/bi';
const { Footer } = Layout;

const MainFooter = () => {
  return (
    <Footer className="mainFooter">
      <Row className="splitRow">
        <Col className="infoText">
          <h2 className="title2">Join the board</h2>
          <p>
            We are always looking for more people to join our mission and build
            the growing AI community at UCSD. The following roles are open to
            all undergraduate UCSD students:
          </p>
        </Col>

        <Col className="boardPositions">
          <Row className="position">
            <h4>
              <a href="https://acmurl.com/ai-events">Marketing/Sponsorship</a>
            </h4>
            <Avatar
              size="default"
              shape="square"
              className="linkBox"
              icon={
                <a href="https://acmurl.com/ai-marketing-sponsorship-app">
                  <AiOutlineLink size={20} className="linkIcon" />
                </a>
              }
            />
          </Row>
          <Row className="position">
            <h4>
              <a href="https://acmurl.com/ai-events">Event Lead</a>
            </h4>
            <Avatar
              size="default"
              shape="square"
              className="linkBox"
              icon={
                <a href="https://acmurl.com/ai-events">
                  <AiOutlineLink size={20} className="linkIcon" />
                </a>
              }
            />
          </Row>
          <Row className="position">
            <h4>
              {' '}
              <a href="https://acmurl.com/ai-dev">Developer</a>
            </h4>
            <Avatar
              size="default"
              shape="square"
              className="linkBox"
              icon={
                <a href="https://acmurl.com/ai-dev">
                  <AiOutlineLink size={20} className="linkIcon" />
                </a>
              }
            />
          </Row>
        </Col>
      </Row>

      <Row className="splitRow">
        <Col className="infoText">
          <h2 className="title2">Stay up to date</h2>
          <p>
            We host many, many events through each quarter at UCSD. Best way to
            be in the loop of new events, competitions etc. is to check out our
            Discord and Instagram. We run workshops on introductory to advanced
            neural network concepts and programming to workshops on the Kaggle
            platform
          </p>
        </Col>

        <Row className="socialMedia">
          <Tooltip title="@acm_ai_ucsd">
            <a href="https://www.instagram.com/acm_ai_ucsd/">
              <BiLogoInstagram size={72} />
            </a>
          </Tooltip>
          <Tooltip title="https://discord.com/invite/4zKpm7U">
            <a href="https://discord.com/invite/4zKpm7U">
              <BiLogoDiscord size={72} />
            </a>
          </Tooltip>
        </Row>
      </Row>

      <Row className="splitRow">
        <Col className="infoText">
          <h2 className="title2">Networking</h2>
          <p>
            If you're looking for more networking opportunities or research, we
            also run seminars in collaboration with AI professors at UCSD as
            well as host an AI reading group on our discord. Trust us, it is
            very interesting. Make sure to also register an account with us!
            That way we can reach out to you about new opportunities and you can
            enter our exciting competitions.
          </p>
        </Col>
      </Row>

      <h3>ACM AI at UCSD 2023</h3>
    </Footer>
  );
};

export default MainFooter;
