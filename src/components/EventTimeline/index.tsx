import React from 'react';
import { Empty, Timeline, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { CalendarOutlined } from '@ant-design/icons';
import './index.less';
import { ACMEvent } from '../../actions/events';
import EventCard from '../EventCard/index';

const EventTimeline = ({ eventData }: { eventData: ACMEvent[] }) => {
  return (
    <div className="EventTimeline">
      {eventData.length > 0 ?
        <Timeline >

          {/* Show at most 2 events as a preview */}
          {eventData.slice(0, 2).map(event => (
            <Timeline.Item key={event.uuid} color="black">
              <EventCard event={event} />
            </Timeline.Item>


          ))}

          <Timeline.Item style = {{marginTop: "24px"}}color="black">
            <Link to={`/events`} rel="noopener noreferrer">
             <Button size="large" style={{ background: "black", color: "white", border:"none"}}>
                <p>Browse Events</p>
              </Button>
            </Link>
         
          </Timeline.Item>
        </Timeline>
        :
        <Empty className="emptySection"
          imageStyle={{ height: 50 }}
          description={
            <p className="emptyDescription">
              There are no upcoming events at this time. Check back later!
            </p>
          }
        />
      }
    </div>
  );
};

/**
 * Formats a date to be readable.
 * @param {string} time The time in unformatted form.
 * @return {string, numeric} The formatted time in short month and day
 */
export const formatMonthDate = (time: string): { month: string, day: number } => {
  const parsedTime = new Date(time);
  const month = parsedTime.toLocaleString('en-US', { month: 'short' });
  const day = parsedTime.getDate();
  return { month, day };
};

export const formatTime = (time: string | number | Date): string => {
  const parsedTime = new Date(time);
  return parsedTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export default EventTimeline;


{/* <div className="timeline-item">
                <Badge className="timeline-badge" size="default" count={<CalendarOutlined className="timeline-icon" style={{ color: '#2e3036', backgroundColor: '#ececec'}}/>}>
                  <div className="timeline-date">
                    <h2>{formatMonthDate(event.start).month}</h2>
                    <h3>{formatMonthDate(event.start).day}</h3>
                  </div>
                </Badge>

                <div className="timeline-content">
                  <h2>{event.title}</h2>
                  <h3>{event.location}</h3>
                  <h3>{formatTime(event.start)} - {formatTime(event.end)}</h3>
                </div>
              </div> */}