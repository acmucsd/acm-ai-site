import React, { useEffect, useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { ACMEvent, fetchFutureEvents } from '../../actions/events';
import EventCard from '../../components/EventCard';

function EventsPage(props: any) {
  const [eventData, setEventData] = useState<Array<ACMEvent>>([]);

  useEffect(() => {
    fetchFutureEvents().then((data) => {
      setEventData(data);
    });
  }, []);
  const haveFutureEvents = eventData.length < 0;
  return (
    <DefaultLayout>
      <div className = "EventsPage">
        <div className = "hero">
          <h1 id = "title">Events</h1>
          <p className = "subtext">
            Welcome to our events! Learn about what events we run and how to find them.
            <div className="upcomingEvents">
                {haveFutureEvents && <>These are the upcoming events <br/></>}
                <div className="eventsBlock">
                {
                haveFutureEvents ? <EventCard event={eventData[0]} />  : "There are no upcoming events at this time."
              }
              </div>
          </div>
          </p>
        </div>
        
        <div>
        <div className = "main-section">
            <h1 className = "statement">What events do we run?</h1>
            <p className = "subtext">
              We run all kinds of events, from intro to deep learning to seminars from distinguished researchers and professors. Events are a great way to be engaged with the AI community at UCSD as well as a way to learn content you may not typically learn in class! 
              <br />
              We also have a running contest where we give out kahoot rankings on discord based on your ranking on our latest kahoot quizzes. We often host these quizzes at the start or end of a workshop.
            </p>
         </div>
          <div className = "main-section">
            <h1 className = "statement">Where to find our workshops?</h1>
            <p className = "subtext">
              We post all our workshop recordings on our youtube at <a href='https://acmurl.com/youtube' target='_blank'>https://acmurl.com/youtube</a>. Stay tuned in our Discord for when we upload them.
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default EventsPage;
