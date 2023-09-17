import React, { useState } from 'react';
import { Row, Col, Button,Modal} from 'antd';
import { AiFillCalendar, AiOutlineLink } from 'react-icons/ai';
import './index.less';
import { ACMEvent } from '../../actions/events';
import { HiLocationMarker } from 'react-icons/hi';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Modal props
  const showModal = () => {
    setIsModalOpen(true);
    console.log(isModalOpen)
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const formatCalendarTime = (dateTime: string) => {
    return new Date(dateTime).toISOString().replace(/-|:|\.\d+/g, '');
  };

  const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.title
  )}&details=${encodeURIComponent(
    event.description
  )}&dates=${encodeURIComponent(
    formatCalendarTime(event.start)
  )}/${encodeURIComponent(
    formatCalendarTime(event.end)
  )}&location=${encodeURIComponent(event.location)}`;

  const currentDate = new Date();


  return (
    <>
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
            <div className = "eventIconWrapper" id = "calendar">
              <AiFillCalendar size = {20} color = {"#FA5E5E"}/> 
            </div>

          <Col style = {{marginLeft: "1rem"}}>
            <h4 className = "eventDate" >{formatMonthDate(event.start).month} {formatMonthDate(event.start).day}</h4>
            <p className = "eventTimeRange">{formatTime(event.start)} - {formatTime(event.end)}</p>
          </Col>
     
        </Row>

        <Button size="large" className = "eventCardButton" onClick = {() => showModal()}><p>details</p></Button>
      </Row>
    </div>

        
    <Modal
      className = "eventModal"
      width = {800}
      style={{borderRadius: "20px"}}
      open={isModalOpen}
      onCancel={handleCancel}
      title = {<h3 style = {{fontWeight: "700"}}>{event.title}</h3>}
      
      footer={
        
        // If this is an old event, do not give user ability to schedule the event 
        new Date() > new Date(event.end) ? null : (

          /* Antd Button has a bug where using href directly will mess up the 
           * alignment of the button text so we use onClick instead 
           */
          <Button
            size="large"
            className="eventScheduleButton"
            onClick = {() => {window.location.href = googleCalendarLink}}
          >
            <p>schedule</p>
          </Button>
        )
      }      
    >

      <Col className = "eventModalContent">
        
        <Row>
          <img src = {event.cover} style ={{ boxShadow:"0px 3px 5px 1px rgba(189, 189, 189, 0.5)",width: "40%", maxWidth: "300px", minWidth: "200px", borderRadius: "15px", marginRight: "1.5rem", marginBottom: "2rem"}} />

          {/** Column to hold event details for date, time, location, and event link */}
          <Col >

            <section className = "eventDetailSection">
              <div className = "eventIconWrapper" id = "calendar">
                <AiFillCalendar size = {20} color = {"#FA5E5E"}/> 
              </div>
                <Col style = {{marginLeft: "1rem"}}>
                  <h4 className = "eventDate" >{formatMonthDate(event.start).month} {formatMonthDate(event.start).day}</h4>
                  <p className = "eventTimeRange">{formatTime(event.start)} - {formatTime(event.end)}</p>
                </Col>
            </section>

            <section className = "eventDetailSection">
              <div className = "eventIconWrapper" id = "location">
                <HiLocationMarker size = {20} color = {"#F87A51"}/> 
              </div>
              <h4 style = {{marginLeft: "1rem", color: "#F87A51"}}>{event.location}</h4>
            </section>

            <section className = "eventDetailSection">
              <div className = "eventIconWrapper"  id = "link">
                <AiOutlineLink size = {20} color = {"gray"}/> 
              </div>
              <p style = {{marginLeft: "1rem"}}>{event.eventLink}</p>
            </section>
          </Col>
        </Row>

        <Row className = "eventDescriptionBox">
          <p>{event.description}</p>
        </Row>
      </Col>
     
    </Modal>

    </>
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
    hour: 'numeric',
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
