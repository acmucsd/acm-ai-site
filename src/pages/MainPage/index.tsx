import React, { useEffect, useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Link } from 'react-router-dom';
import DiscordLink from '../../components/DiscordLink';
import { ACMEvent, fetchFutureEvents } from '../../actions/events';
import EventCard from '../../components/EventCard';
import { Col, Row } from 'antd';
function MainPage() {
  const [eventData, setEventData] = useState<Array<ACMEvent>>([]);
  useEffect(() => {
    fetchFutureEvents().then((data) => {
      setEventData(data);
    });
  }, []);

  return (
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
  );
}

export default MainPage;
