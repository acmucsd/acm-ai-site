import React, { useEffect, useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import {
  ACMEvent,
  fetchPastEvents,
  fetchFutureEvents,
} from '../../actions/events';
import { Row, Col, Layout, Tabs } from 'antd';
import EventCard from '../../components/EventCard/index';
import MainFooter from '../../components/MainFooter';
const { Content, Footer } = Layout;

const newEvents = (eventData: ACMEvent[]): React.ReactNode => {
  return (
    <Content className="eventsList">
      {eventData.length === 0 && (
        <div>
          <h3>There are no upcoming events at this time. Check back later!</h3>
        </div>
      )}

      <div>
        {eventData.map((event) => (
          <EventCard event={event} key={event.uuid} />
        ))}
      </div>
    </Content>
  );
};

const pastEvents = (eventData: ACMEvent[]): React.ReactNode => {
  return (
    <Content className="eventsList">
      <div>
        {eventData.map((event) => (
          <EventCard event={event} key={event.uuid} />
        ))}
      </div>
    </Content>
  );
};

function EventsPage(props: any) {
  const [futureEventData, setFutureEventData] = useState<Array<ACMEvent>>([]);
  const [pastEventData, setPastEventData] = useState<Array<ACMEvent>>([]);

  useEffect(() => {
    fetchFutureEvents().then((data) => {
      setFutureEventData(data);
    });
    fetchPastEvents().then((data) => {
      setPastEventData(data);
    });
  }, []);

  return (
    <DefaultLayout>
      <Content className="EventsPage">
        <Content className="eventsHeader">
          <h1 className="title2">ACM AI Events</h1>
          <h4>
            ACM AI offers a breadth of socials and workshops to help keep our
            members engaged. We try our best to make them as fun and exciting
            for everyone!
          </h4>
        </Content>

        <Content className="eventsContent">
          <Tabs
            size="small"
            animated={true}
            tabPosition="top"
            items={[
              {
                label: <p>Upcoming Events</p>,
                key: '1',
                children: newEvents(futureEventData),
              },
              {
                label: <p>Past Events</p>,
                key: '2',
                children: pastEvents(pastEventData),
              },
            ]}
          ></Tabs>
        </Content>

<<<<<<< HEAD
        <Content>
          <div className=" gradient-bar"></div>
        </Content>

        <Footer className="eventsFooter">
=======
        <Content className="eventsFAQ">

>>>>>>> 602d5d4 (Events footer adjusted)
          <Row className="row">
            <h2 className="title2"><span className="colorful">Events FAQ</span></h2>
          </Row>

          <Row className="row">
            
          
            <Col>
              <h2 className="title4">What events do we run?</h2>
              <p>
                We run all kinds of events, from intro to deep learning
                workshops to seminars from distinguished researchers and
                professors. Events are a great way to engage with the AI
                community at UCSD and learn content you may not typically learn
                in class! We also have a running contest ranking on Discord
                based on your performance on our latest Kahoot quizzes. We often
                host these quizzes at the start or end of a workshop.
              </p>
            </Col>
          </Row>

          <Row className="row">
            <Col>
              <h2 className="title4">Where can I find past workshops?</h2>
              <p>
                We post all of our workshop recordings on our YouTube at{' '}
                <a
                  href="https://acmurl.com/youtube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://acmurl.com/youtube
                </a>
                . Stay tuned in our Discord for uploads!
              </p>
            </Col>
          </Row>

        </Content>

      </Content>

      <MainFooter />
    </DefaultLayout>
  );
}

export default EventsPage;
