import React from 'react';
import { Row, Col, Button} from 'antd';
import { AiFillCalendar } from 'react-icons/ai';
import './index.less';
import { ACMEvent } from '../../actions/events';

/* const EventCard = ({ event }: { event: ACMEvent }) => {
  return (
    <div className="EventCard">
      <Card>
        <img src={event.cover} alt="Event cover" />
        <h3 className="title">{event.title}</h3>
        <time>{`${formatDate(event.start)} ${formatTime(
          event.start
        )} - ${formatTime(event.end)}`}</time>
        {isURL(event.location) ? (
          <a className="location" href={event.location}>
            {event.location}
          </a>
        ) : (
          <p className="location">{event.location}</p>
        )}
        <p className="description">{event.description}</p>
      </Card>
    </div>
  );
}; */


const EventCard = ({ event }: { event: ACMEvent }) => {
  return (
    <div className="EventCard">

      <Row>
        <img
          src={event.cover}
          style={{ marginBottom: "1.5rem", marginRight: "1rem", boxShadow:"0px 3px 5px 1px rgba(189, 189, 189, 0.5)", borderRadius: "16px", height: "80px", width: "80px" }}
        />
        <Col className = "eventHeaderTexts">
          <h3>{event.title}</h3>
          <p>{event.location}</p>
        </Col>
      </Row>

      <Row className = "eventInfoRow">
        <Row className = "eventDateContainer">
            <div className = "calendarIconWrapper">
              <AiFillCalendar size = {20} color = {"#FA5E5E"}/> 
            </div>

          <Col style = {{marginLeft: "1rem"}}>
            <h4 className = "eventDate" >{formatMonthDate(event.start).month} {formatMonthDate(event.start).day}</h4>
            <p className = "eventTimeRange">{formatTime(event.start)} - {formatTime(event.end)}</p>
          </Col>
     
        </Row>

        <Button size="large" className = "eventCardButton"><p>details</p></Button>
      </Row>
    </div>
  )
}
/**
 * Formats a date to be readable.
 * @param {string} time The time in unformatted form.
 * @return {string} The formatted time in a readable format
 */
export const formatDate = (time: string): string => {
  const parsedTime = Date.parse(time);
  const parsedDate = new Date(parsedTime);
  return parsedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });
};
export const formatTime = (time: string | number | Date): string => {
  const parsedTime = new Date(time);
  return parsedTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
export const isURL = (str: string): boolean => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );

  return !!pattern.test(str);
};


/**
 * Formats a date to be readable.
 * @param {string} time The time in unformatted form.
 * @return {string, numeric} The formatted time in short month and day
 */
export const formatMonthDate = (time: string) : {month: string, day: number}=> {
  const parsedTime = new Date(time);
  const month = parsedTime.toLocaleString('en-US', { month: 'short' });
  const day = parsedTime.getDate();
  return {month, day};
};


export default EventCard;
