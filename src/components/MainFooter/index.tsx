import { Row, Col, Layout, Avatar, Tooltip } from 'antd';
import React from 'react';
import './index.less';
import { AiOutlineLink } from 'react-icons/ai';
import { BiLogoInstagram, BiLogoDiscord, BiMailSend } from 'react-icons/bi';
import '../../newStyles/components.less'
const { Footer, Content } = Layout;

interface MainFooterProps {
  isMainPage?: boolean;
}

const MainFooter: React.FC<MainFooterProps> = ({ isMainPage = false }) => {
  return (
    <>
    <Content>
      <div className=" gradient-bar"></div>
    </Content>
    <Footer className="mainFooter">
    {/* <Footer className={`mainFooter ${isMainPage ? '' : 'gradient-bar'}`}> */}
      <Row className="splitRow">
        <Col className="infoText">
          <h2 className="title2">Join the board</h2>
          <p>
            Recruitment to join the ACM AI board opens in the Spring. We are
            always looking for more people to join our mission and build the
            growing AI community at UCSD. The following teams are open to all
            undergraduate UCSD students: Marketing/Sponsorship, Events, and
            Development.
          </p>
        </Col>

        <Col className="boardPositions">
          <Row className="position">
            <h4>
              <a href="https://acmurl.com/ai-elections" target="_blank" rel="noopener noreferrer">Role Descriptions</a>
            </h4>
            <Avatar
              size="default"
              shape="square"
              className="linkBox"
              icon={
                <a href="https://acmurl.com/ai-elections" target="_blank" rel="noopener noreferrer">
                  <AiOutlineLink size={20} className="linkIcon" />
                </a>
              }
            />
          </Row>
          <Row className="position">
            <h4>
              <a href="https://acmurl.com/apply-ai" target="_blank" rel="noopener noreferrer">Application</a>
            </h4>
            <Avatar
              size="default"
              shape="square"
              className="linkBox"
              icon={
                <a href="https://acmurl.com/apply-ai" target="_blank" rel="noopener noreferrer">
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
            We host many, many events through each quarter at UCSD. Stay
            in the loop of new events, socials, and competitions by checking out our
            Discord and Instagram as well as our newsletter! We run workshops on introductory to advanced
            neural network concepts and programming to workshops on the Kaggle platform.
          </p>
        </Col>

        <Row className="socialMedia">
          <Tooltip title="@acm_ai_ucsd">
            <a href="https://www.instagram.com/acm_ai_ucsd/" target="_blank" rel="noopener noreferrer">
              <BiLogoInstagram size={72} />
            </a>
          </Tooltip>
          <Tooltip title="Discord">
            <a href="https://discord.com/invite/4zKpm7U" target="_blank" rel="noopener noreferrer">
              <BiLogoDiscord size={72} />
            </a>
          </Tooltip>
          <Tooltip title="Newsletter">
            <a href="https://acmurl.com/ai-newsletter" target="_blank" rel="noopener noreferrer">
              <BiMailSend size={72} />
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

      <h3>ACM AI at UC San Diego</h3>
    </Footer>
    </>
  );
};

export default MainFooter;
