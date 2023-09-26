import React, { useEffect, useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Link } from 'react-router-dom';
import { ACMEvent, fetchFutureEvents } from '../../actions/events';
import { Layout, Carousel, Button, Collapse, Card } from 'antd';
import { FaFireAlt, FaProjectDiagram } from 'react-icons/fa';
import EventTimeline from '../../components/EventTimeline/index';
import MainFooter from '../../components/MainFooter/index';
const { Content } = Layout;
const { Panel } = Collapse;

function MainPage() {
  const [eventData, setEventData] = useState<Array<ACMEvent>>([]);
  useEffect(() => {
    fetchFutureEvents().then((data) => {
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
      {/* Every page will have a .noContainer() class applied to remove default margins*/}

      <div className="Main">


        {/* Main header section*/}

        {/* NOTE: If you want a constrained box centered on the page, you
          *       must apply .constrained-bounds and/or .generic class
          *       to a wrapper component. Then place your content inside
          *       Otherwise, the content will just fill the entire width :)
          */}

        <Content className="homeHeader">
          <div className="homeHeaderContent">
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

                {/** Antd Button has a bug where using href directly will mess up the alignment of the button text so we use onClick instead */}
                <Button className="navButton" size="large" shape="round" onClick = {() => {window.location.href = "https://acmucsd.com/"}}>
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

        <MainFooter />
  
      </div>
    </DefaultLayout>

  );
}

export default MainPage;
