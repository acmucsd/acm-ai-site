import React, { useEffect, useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Link } from 'react-router-dom';
import DiscordLink from '../../components/DiscordLink';
import { ACMEvent, fetchFutureEvents } from '../../actions/events';
//import EventCard from '../../component/EventCard';
import { Col, Row, Layout, Carousel, Button, Empty, Collapse } from 'antd';
const { Header, Content, Footer } = Layout


function MainPage() {


  const [eventData, setEventData] = useState<Array<ACMEvent>>([]);
  useEffect(() => {
    fetchFutureEvents().then((data) => {
      setEventData(data);
    });
  }, []);


  // Array of items to populate the sponsorship info section
  const sponsorItems = [
    {
      key: '1',
      label: 'What do we offer?',
      children: <h2>Something here</h2>
    }, 
    {
      key: '2',
      label: 'Is there an official sponsorship packet?',
      children: <h2>Something here</h2>
    }, 
    {
      key: '3',
      label: 'Who can I contact?',
      children: <h2>Something here</h2>
    }
  ]


  return (
    <DefaultLayout>
    <div className="Main">

        {/* All Content with titles or text get the header-section class to center text. 
            Any other sections can optionally get the generic-section class unless you 
            want to make a custom section */}

        <Content className="header-section">
          <h1 className="title1">acm ai</h1>
          <h2 className="homeSubTitle">
            We aspire to inspire the next generation of AI advocates, engineers, and scientists.
          </h2>

          <div className = "authButtonWrapper" >
            <Button className="authButton"><p className="button-text-white">Login</p></Button>
            <Button className="authButton"><p className="button-text-white">Sign Up</p></Button>
          </div>
        </Content>


        {/* Carousel section that holds 3 cards with info about acm  */}
        <Content className="generic-section">
          <Carousel autoplay = {true} autoplaySpeed={10000} dotPosition="bottom" effect="fade" >

            <div className="carousel-card">
              <div className = "carouselContentWrapper">
                <div>
                  <h1 className="h1-white">What is ACM AI?</h1>
                  <h2 className="h2-white">
                    We are a tight-knit community of UCSD students that exists within the ACM family at UCSD.
                    Our team consists of bright minds from every background and expertise.
                  </h2>
                </div>
               
                <Button className="meetTeamButton">
                  <p className = "button-text-black">Meet the Team</p>
                </Button>
              </div>
              
            </div>

            <div className="carousel-card">
            <div className = "carouselContentWrapper">
              <h1 className="h1-white">Model Your AI/Ml Path</h1>
              <h2 className="h2-white">
                Our goals are to help build a community of AI enthusiasts at UCSD and connect that community
                to the broader AI network. We also strive to keep AI fun and accessible to all as you navigate your
                path around the complex world of AI through workshops, competitions, networking events and more!
              </h2>
            </div>
            </div>

            <div className="carousel-card">
            <div className = "carouselContentWrapper">
              <h1 className="h1-white">Want more ACM?</h1>
              <h2 className="h2-white">
                We are part of a larger group of bright innovators and thinkers here at UCSD. If you're feeling
                adventurous in exploring our various aspects of computing or just having fun, check out ACM's main website 
                for exciting events!
              </h2>
              <Button className="meetTeamButton">
                  <p className = "button-text-black">Explore</p>
                </Button>
            </div>
            </div>
          </Carousel>
        </Content>


        <Content className="header-section">
          <h1 className="title2">Events</h1>
          <h2 className="homeHeader2">
            To make things interesting, our team strives to come up with new workshops 
            and socials so that everyone has a chance to explore a different aspect of AI
          </h2>
            <Content className="generic-section">
              { eventData.length == 0 ? 


        
              <Empty 
              className = "homeEmptySection"
              imageStyle={{height:120}}
              
              description = {
                <h2 className = "emptyDescription">
                  There are no upcoming events at this time Check back later!
                </h2>
              }/>


              :
              
              <a className="nextEventBannerWrapper" href="#events">
                  {eventData.slice(0, 1).map((event) => {
                    return (
                      <img className="nextEventBanner" src={event.cover} alt="Event cover" />
                    );
                  })}
                </a> }
            </Content>
        </Content>


        <Content className = "projectsCompsContainer">
          container
        </Content>


        <Content className="header-section">
          <h1 className="title2">Sponsor Us</h1>
          <h2 className="homeHeader2">
            As a club, we are always seeking passionate sponsors who care about our mission to make 
            AI fun and accessible. Here are some quick resources if you are a company interested in working with us! 
          </h2>

              
          <Collapse accordion={true} defaultActiveKey={['1']}></Collapse>

        </Content>


        <Footer className="mainFooter">footer</Footer>


    </div>
    </DefaultLayout>
    /*
    <DefaultLayout>
      <div className="Main">
        <div className="hero">
          <div className="heading">
            <h1 className="homepageTitle">ACM AI at UCSD</h1>
            <p className="homepageSubtext">
              We aspire to inspire the next generation of AI advocates, engineers,
              and scientists.
            </p>
          </div>
          <a className="nextEventBannerWrapper" href="#events">
            {eventData.slice(0, 1).map((event) => {
              return (
                <img className="nextEventBanner" src={event.cover} alt="Event cover" />
              );
            })}
          </a>
        </div>
        <div>
          <div className="main-section">
            <h2 className="statement">Model Your AI/ML Path</h2>
            <p>
              Our goals are to help build a community of AI enthusiasts at UCSD
              and connect that community to the broader AI network. We also
              strive to keep AI fun and accessible to all. We want to help you
              navigate your path around the complex world of AI through
              workshops, competitions, networking events and more!
            </p>
            <p>
              Don't know where to start? Scroll down or go to our{' '}
              <a href="/#events">events</a>
            </p>
          </div>
          <div className="main-section">
            <h2 className="statement" id="learn-ai">
              Learn about AI and Get Involved!
            </h2>
            <h3>Workshops, Competitions, Events</h3>
            <p>
              We host many, many, *many* events throughout each quarter at UCSD.
              Best way to be in the loop of new events, competitions etc. is to
              join our Discord at <DiscordLink />. We run workshops on
              introductory to advanced neural network concepts and programming
              to workshops on the Kaggle platform
            </p>
            <h3>Networking, Research, Reading Groups</h3>
            <p>
              If you're looking for more networking opportunities or research,
              we also run seminars in collaboration with AI professors at UCSD
              as well as host an AI reading group on our discord. Trust us, it
              is very interesting.
            </p>
            <p>
              Make sure to also <Link to="/register">register</Link> an account
              with us! That way we can reach out to you about new opportunities
              and you can enter our exciting competitions
            </p>
            <h3>Joining Us</h3>
            <p>
              We are always looking for more people to join our mission and
              build the growing AI community at UCSD. The following roles are
              open to all undergraduate UCSD students:
            </p>
            <li>
              Developer - apply here{' '}
              <a href="https://acmurl.com/ai-dev">https://acmurl.com/ai-dev</a>
            </li>
            <li>
              Event Lead - apply here{' '}
              <a href="https://acmurl.com/ai-events">
                https://acmurl.com/ai-events
              </a>
            </li>
            <li>
              Marketing / Sponsorship - apply here{' '}
              <a href="https://acmurl.com/ai-marketing-sponsorship-app">
                https://acmurl.com/ai-marketing-sponsorship-app
              </a>
            </li>
            <p>
              More details, including application forms, can be found on our
              discord
            </p>
          </div>
          <div className="main-section" id="events">
            <h2 className="statement" id="learn-ai">
              Upcoming Events!
            </h2>
            <p>
              These are our upcoming events on workshops, competitions,
              networking and more!
            </p>
            <Row gutter={[24, 24]} justify="center">
              {eventData.map((event) => {
                return (
                  <Col>
                    <EventCard event={event} />
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      </div>
    </DefaultLayout>
    */
  );
}

export default MainPage;
