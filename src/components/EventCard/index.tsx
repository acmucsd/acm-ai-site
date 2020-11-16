import React from 'react';
import { Card } from '../Card';

import './index.less';
import { ACMEvent } from '../../actions/events';

const EventCard = ({ event }: { event: ACMEvent }) => {
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
};
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
export default EventCard;
