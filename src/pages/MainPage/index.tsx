import React, { useEffect, useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Link } from 'react-router-dom';
import { ACMEvent, fetchFutureEvents } from '../../actions/events';
import { Layout, Button, Collapse, Card } from 'antd';
import { FaFireAlt, FaProjectDiagram } from 'react-icons/fa';
import EventTimeline from '../../components/EventTimeline/index';
import MainFooter from '../../components/MainFooter/index';
const { Content } = Layout;

function MainPage() {
  const [eventData, setEventData] = useState<Array<ACMEvent>>([]);
  useEffect(() => {
    fetchFutureEvents().then((data) => {
      console.log(data);
      setEventData(data);
    });
  }, []);

  return (
    <DefaultLayout>
      {/* Every page will have a .noContainer() class applied to remove default margins*/}

      <Content className="Main">
        {/* Main header section*/}

        {/* NOTE: If you want a constrained box centered on the page, you
         *       must apply .constrained-bounds and/or .generic class
         *       to a wrapper component. Then place your content inside
         *       Otherwise, the content will just fill the entire width :)
         */}

        <Content className="homeHeader">
          <div className="homeHeaderContent">
            <h1 className="homeTitle">ACM AI</h1>
            <h4>
              We aspire to inspire the next generation of AI advocates,
              engineers, and scientists.
            </h4>
          </div>
        </Content>

        {/* Content section for projects and competitions info*/}
        <Content className="homeBox">
          <div className="homeInfo">
            <div className="info">
              <h3>What is ACM AI at UC San Diego?</h3>
              <p>
                We are a tight-knit community of students that exists within the
                ACM family at UCSD. Our team consists of bright minds from every
                background and expertise.
              </p>
              <Link to={`/about`} rel="noopener noreferrer">
                <Button size="large" shape="round">
                  <p>meet the team</p>
                </Button>
              </Link>
            </div>

            <div className="info">
              <h3>Model Your AI/Ml Path</h3>
              <p>
                Our goals are to help build a community of AI enthusiasts at
                UCSD and connect that community to the broader AI network. We
                also strive to keep AI fun and accessible to all as you navigate
                your path around the complex world of AI through workshops,
                competitions, networking events and more!
              </p>
              <Button
                size="large"
                shape="round"
                onClick={() => {
                  window.open('https://wiki.ai.acmucsd.com/', '_blank');
                }}
              >
                <p>view our wiki</p>
              </Button>
            </div>

            <div className="info">
              <h3>Want more ACM at UCSD?</h3>
              <p>
                We are part of a larger group of bright innovators and thinkers
                here at UCSD. If you're feeling adventurous in exploring our
                various aspects of computing or just having fun, check out ACM
                at UC San Diego's main website for exciting events!
              </p>
              <Button
                size="large"
                shape="round"
                onClick={() => {
                  window.open('https://acmucsd.com/', '_blank');
                }}
              >
                <p>explore</p>
              </Button>
            </div>
          </div>

          <div className="projectCompsBox">
            <div className="descriptions">
              <h3>Apply Your Knowledge</h3>
              <h4>
                Neural Networks don’t always have to be taught in the classroom.
                Start a project or join a competition!
              </h4>
            </div>
          </div>

          <div className="projectCompsCardsBox">
            <Card className="previewCard">
              <div className="previewIcon" style={{ marginBottom: '1rem' }}>
                <FaProjectDiagram size={25} />
              </div>
              <h3>Projects</h3>
              <h4>
                Explore our club's cutting-edge AI projects, showcasing
                innovation and expertise in artificial intelligence.
              </h4>
              <Link to={`/projects`} rel="noopener noreferrer">
                <p>{`learn more >`}</p>
              </Link>
            </Card>

            <Card className="previewCard">
              <div className="previewIcon" style={{ marginBottom: '1rem' }}>
                <FaFireAlt size={25} />
              </div>
              <h3>Competitions</h3>
              <h4>
                Dive into the world of fierce competitions where members
                demonstrate their skills in various challenges.
              </h4>

              <Link to={`/competitions`} rel="noopener noreferrer">
                <p>{`learn more >`}</p>
              </Link>
            </Card>
          </div>
        </Content>

        {/* Content section for events*/}
        <Content className="eventsContainer">
          <h1 className="title2">Events</h1>
          <h4 className="homeSubTitle">
            To make things fun, our team strives to come up with new workshops
            and socials so that everyone has a chance to explore a different
            aspect of AI
          </h4>

          <EventTimeline eventData={eventData} />
        </Content>

        <Content className="sponsorshipBox">
          <h1 className="title2">Sponsor Us</h1>
          <h4 className="homeSubTitle">
            We're always seeking passionate sponsors who care about our mission
            to make AI fun and accessible. Here are some quick resources if
            you're a company interested in working with us!
          </h4>

          <div className="sponsorshipCollapse">
            <p>
              We will be launching our Sponsorship Packet with information on
              how to sponsor our competitions soon! In the meantime, if you
              would like to contact us about sponsorship, please email us at 
              <a href="mailto:ai@acmucsd.org"> ai@acmucsd.org</a>
            </p>
            {/*             <Collapse ghost bordered={false} >
              <Panel className="panel" header={<h4 style = {{color: "white", fontWeight: "600"}}>What do we offer?</h4>} key="1">
                <h4 style = {{color: "white"}}>hello</h4>
              </Panel>
              <Panel className="panel" header={<h4 style = {{color: "white", fontWeight: "600"}}>Who can I contact?</h4>} key="2">
                <h4 style = {{color: "white"}}>hello</h4>
              </Panel>
              <Panel className="panel" header={<h4 style = {{color: "white", fontWeight: "600"}}>Is there an official Sponsorship Packet?</h4>} key="3">
                <h4 style = {{color: "white"}}>hello</h4>
              </Panel>
            </Collapse> */}
          </div>
        </Content>

        <Content>
          <div className="homeBottomBar"></div>
        </Content>

        <MainFooter />
      </Content>
    </DefaultLayout>
  );
}

export default MainPage;
