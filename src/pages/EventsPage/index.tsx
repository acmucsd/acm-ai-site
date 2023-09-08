import React, { useEffect, useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { ACMEvent, fetchFutureEvents } from '../../actions/events';
import EventTimeline from '../../components/EventTimeline';
import { Row, Col, Layout} from 'antd';
const { Content, Footer } = Layout;

function EventsPage(props: any) {
  const [eventData, setEventData] = useState<Array<ACMEvent>>([]);

  useEffect(() => {
    fetchFutureEvents().then((data) => {
      setEventData(data);
      console.log(data);
    });
  }, []);

  return (
    <DefaultLayout>
      <div className="Events">
        <Content className="eventsHeader">
            <h1 className="title2">Upcoming Events</h1>
            <p className="eventsSubTitle">make friends • have fun • learn something new</p>

          <div className="upcomingEvents">
            <EventTimeline eventData={eventData}/>
          </div>
        </Content>

        <Content>
          <div className="gradient-bar">
          </div>
        </Content>


        <Footer className="eventsFooter">
          <Row className="row">
            <Col>
              <h2 className = "title2">What events do we run?</h2>
              <p>We run all kinds of events, from intro to deep learning workshops to seminars from distinguished researchers and professors. 
                Events are a great way to engage with the AI community at UCSD and learn content you may not 
                typically learn in class! We also have a running contest ranking on Discord based on your performance on 
                our latest Kahoot quizzes. We often host these quizzes at the start or end of a workshop.
              </p>
            </Col>
          </Row>

          <Row className="row">
            <Col>
              <h2 className = "title2">Where can I find past workshops?</h2>
              <p>We post all of our workshop recordings on our YouTube at <a href='https://acmurl.com/youtube' target='_blank' rel="noopener noreferrer">https://acmurl.com/youtube</a>. 
              Stay tuned in our Discord for uploads!
              </p>
            </Col>
          </Row>

          <h3>ACM AI at UCSD 2023</h3>
        </Footer>
      </div>

    </DefaultLayout>
  );
}

export default EventsPage;
