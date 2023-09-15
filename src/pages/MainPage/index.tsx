import React, { useEffect, useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Link } from 'react-router-dom';
import { ACMEvent, fetchFutureEvents, fetchPastEvents } from '../../actions/events';
import EventCard from '../../components/EventCard';
import { Row, Col, Layout, Carousel, Button, Empty, Collapse, Card, Avatar, Tooltip } from 'antd';
import { AiOutlineLink } from 'react-icons/ai';
import { FaFireAlt, FaProjectDiagram } from 'react-icons/fa';
import { BiLogoDiscord, BiLogoInstagram } from 'react-icons/bi';
import EventTimeline from '../../components/EventTimeline/index';
import { HiOutlineFire } from 'react-icons/hi';
const { Content, Footer } = Layout;
const { Panel } = Collapse;

function MainPage() {
  const [eventData, setEventData] = useState<Array<ACMEvent>>([]);
  useEffect(() => {
    fetchPastEvents().then((data) => {
      console.log(data)
      setEventData(data);
    });
  }, []);

  // Array of items to populate the sponsorship info section
  const sponsorItems = [
    {
      key: '1',
      label: <h3>What do we offer?</h3>,
      children: <h4>Something here</h4>
    },
    {
      key: '2',
      label: <h3>Is there an official sponsorship packet?</h3>,
      children: <h4>Something here</h4>
    },
    {
      key: '3',
      label: <h3>Who can I contact?</h3>,
      children: <h4>Something here</h4>
    }
  ]

  return (
    <DefaultLayout>
      <div className="Main">

        <Content >
          <div className="homeTopBar">
            <h4>Welcome, Tritons to the new ACM AI site! Stay tuned for exciting content this year!</h4>
          </div>
        </Content>


        {/* Main header section*/}

        {/* NOTE: If you want a constrained box centered on the page, you
          *       must apply .constrained-bounds and/or .generic class
          *       to a wrapper component. Then place your content inside
          *       Otherwise, the content will just fill the entire width :)
          */}

        <Content className="homeHeader">
          <div className="headerContent">
            <h1 className="homeTitle">acm ai</h1>
            <h4 className="homeSubTitle">
              We aspire to inspire the next generation of
              AI advocates, engineers, and scientists.
            </h4>
          </div>
        </Content>


        {/* Carousel section that holds 3 cards with info about acm ai */}
        <Content className="homeCarousel" >
          <Carousel autoplay={true} autoplaySpeed={10000} dotPosition="bottom" effect="fade" >

            <div className="homeCarouselCard">
              <div className="carouselContentWrapper">
                <h3>What is ACM AI?</h3>
                <h4>
                  We are a tight-knit community of UCSD students that exists within the ACM family at UCSD.
                  Our team consists of bright minds from every background and expertise.
                </h4>

                <Link to={`/about`} rel="noopener noreferrer">
                  <Button size="large" shape="round" className="navButton">
                    <p>meet the team</p>
                  </Button>
                </Link>
           

              </div>
            </div>

            <div className="homeCarouselCard">
              <div className="carouselContentWrapper">
                <h3>Model Your AI/Ml Path</h3>
                <h4>
                  Our goals are to help build a community of AI enthusiasts at UCSD and connect that community
                  to the broader AI network. We also strive to keep AI fun and accessible to all as you navigate your
                  path around the complex world of AI through workshops, competitions, networking events and more!
                </h4>
              </div>
            </div>

            <div className="homeCarouselCard">
              <div className="carouselContentWrapper">
                <h3>Want more ACM?</h3>
                <h4>
                  We are part of a larger group of bright innovators and thinkers here at UCSD. If you're feeling
                  adventurous in exploring our various aspects of computing or just having fun, check out ACM's main website
                  for exciting events!
                </h4>
                <Button className="navButton" size="large" shape="round" href ="https://acmucsd.com/">
                 <p>explore</p>
                </Button>

              </div>
            </div>
          </Carousel>
        </Content>


        {/* Content section for projects and competitions info*/}
        <Content className="projectsCompsBox">
          <div className="descriptionsBox">
            <div className="descriptions">
              <h4 style = {{fontWeight:"700"}}>Apply Your Knowledge</h4>
              <h4>Neural Networks don’t always have to be taught in the classroom. Start a project or join a competition!</h4>
          
            </div>
          </div>
          

          <div className="cardsBox">

            <Card className="projectPreviewCard">
              <div className = "previewIcon" style = {{marginBottom: "1rem"}}>
                <FaProjectDiagram size = {25} />
              </div>
              <h3>Projects</h3>
              <h4>Explore our club's cutting-edge AI projects, showcasing innovation and expertise in artificial intelligence.</h4>
              <Link to={`/projects`} rel="noopener noreferrer">
                <p style = {{marginTop:"1rem", marginBottom: "1rem"}}>{`learn more >`}</p>
              </Link>
            </Card>

            <Card className="projectPreviewCard">
              <div className = "previewIcon" style = {{marginBottom: "1rem"}}>
                <FaFireAlt size = {25}/>
              </div>
              <h3>Competitions</h3>              
              <h4>Dive into the world of fierce competitions where members demonstrate their skills in various challenges.</h4>

              <Link to={`/competitions`} rel="noopener noreferrer">
                <p style = {{marginTop:"1rem", marginBottom: "1rem"}}>{`learn more >`}</p>
              </Link>

            </Card>
          </div>
         
        </Content>




        {/* Content section for events*/}
        <Content className="eventsContainer">
          <h1 className="title2">Events</h1>
          <h4 className="homeSubTitle2">
            To make things interesting, our team strives to come up with new workshops
            and socials so that everyone has a chance to explore a different aspect of AI
          </h4>


          <EventTimeline eventData={eventData}/>
          
        

        </Content>



        <Content className="sponsorBox">
          <h1 className="title2">Sponsor Us</h1>
          <h4 className="homeSubTitle2">
            As a club, we are always seeking passionate sponsors who care about our mission to make
            AI fun and accessible. Here are some quick resources if you are a company interested in working with us!
          </h4>

          <div className="sponsorCollapse">
            <Collapse ghost bordered={false} >
              <Panel className="panel" header={<h4 style = {{color: "white", fontWeight: "600"}}>What do we offer?</h4>} key="1">
                <h4 style = {{color: "white"}}>hello</h4>
              </Panel>
              <Panel className="panel" header={<h4 style = {{color: "white", fontWeight: "600"}}>Who can I contact?</h4>} key="2">
                <h4 style = {{color: "white"}}>hello</h4>
              </Panel>
              <Panel className="panel" header={<h4 style = {{color: "white", fontWeight: "600"}}>Is there an official Sponsorship Packet?</h4>} key="3">
                <h4 style = {{color: "white"}}>hello</h4>
              </Panel>
            </Collapse>
          </div>

        </Content>


        <Content >
          <div className="homeBottomBar">
          </div>
        </Content>
        <Footer className="mainFooter">
          <Row className="splitRow">
            <Col className="infoText">
              <h2 className = "title2">Join the board</h2>
              <p>We are always looking for more people to join our mission and build the growing AI community at UCSD.
                The following roles are open to all undergraduate UCSD students:</p>
            </Col>

            <Col className="boardPositions">
              <Row className="position">
                <h4><a href="https://acmurl.com/ai-events">Marketing/Sponsorship</a></h4>
                <Avatar size="default" shape="square" className="link" icon={<a href="https://acmurl.com/ai-marketing-sponsorship-app"><AiOutlineLink /></a>}></Avatar>
              </Row>
              <Row className="position">
                <h4><a href="https://acmurl.com/ai-events">Event Lead</a></h4>
                <Avatar size="default" shape="square" className="link" icon={<a href="https://acmurl.com/ai-events"><AiOutlineLink /></a>} />
              </Row>
              <Row className="position">
                <h4> <a href="https://acmurl.com/ai-dev">Developer</a></h4>
                <Avatar size="default" shape="square" className="link" icon={<a href="https://acmurl.com/ai-dev"><AiOutlineLink /></a>} /></Row>

            </Col>
          </Row>

          <Row className="splitRow">
            <Col className="infoText">
              <h2 className = "title2">Stay up to date</h2>
              <p>We host many, many events through each quarter at UCSD. Best way to be in the loop of new events,
                competitions etc. is to check out our Discord and Instagram. We run workshops on introductory to
                advanced neural network concepts and programming to workshops on the Kaggle platform
              </p>
            </Col>


            <Row className="socialMedia">
              <Tooltip title="@acm_ai_ucsd"><a href="https://www.instagram.com/acm_ai_ucsd/"><BiLogoInstagram size={72} /></a></Tooltip>
              <Tooltip title="https://discord.com/invite/4zKpm7U"><a href="https://discord.com/invite/4zKpm7U"><BiLogoDiscord size={72} /></a></Tooltip>
            </Row>


          </Row>

          <Row className="splitRow">
            <Col className="infoText">
              <h2 className = "title2">Networking</h2>
              <p>If you're looking for more networking opportunities or research, we also run seminars in
                collaboration with AI professors at UCSD as well as host an AI reading group on our discord.
                Trust us, it is very interesting. Make sure to also register an account with us! That way we
                can reach out to you about new opportunities and you can enter our exciting competitions.
              </p>
            </Col>
          </Row>

          <h3>ACM AI at UCSD 2023</h3>
        </Footer>


      </div>
    </DefaultLayout>

  );
}

export default MainPage;
