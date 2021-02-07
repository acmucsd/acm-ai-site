import React, { useEffect, useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Link } from 'react-router-dom';
import DiscordLink from '../../components/DiscordLink';
import { ACMEvent, fetchFutureEvents } from '../../actions/events';
import EventCard from '../../components/EventCard';
import { Col, Row } from 'antd';

function WorkshopsPage(props: any) {
  const [eventData, setEventData] = useState<Array<ACMEvent>>([]);
  useEffect(() => {
    fetchFutureEvents().then((data) => {
      setEventData(data);
    });
  }, []);
  return (
    <DefaultLayout>
      <div className="WorkshopsPage">
        <div className="hero">
          <h1 id="title">
            Welcome to ACM AI Workshops{' '}
            <span role="img" aria-label="teacher-emoji">
              👩‍🏫
            </span>
          </h1>
        </div>
        <div>
          <div className="main-section">
            <h2 className="statement">ACM AI Workshops</h2>
            <p>
              From our neural network workshop series to our reinforcement
              learning workshop series, ACM AI has hosted a variety of workshops
              that ... (insert more text)
            </p>
            <p>
              Feel free to join our discord to stay up to date with our
              workshops!
            </p>
            <p>
              <DiscordLink />
            </p>
            <img
              src={'https://i.imgur.com/h7AUHEx.png'}
              alt="Workshop Pic"
              width="100%"
              height="100%"
            ></img>
          </div>
        </div>
        <div className="main-section">
          <h2 className="statement">High School Outreach</h2>
          <p>High school outreach description</p>
        </div>

        <div className="main-section" id="events">
          <h2 className="statement" id="learn-ai">
            Past Workshops
          </h2>
          <p>These are some of the past workshops we have hosted!</p>
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
    </DefaultLayout>
  );
}

export default WorkshopsPage;
