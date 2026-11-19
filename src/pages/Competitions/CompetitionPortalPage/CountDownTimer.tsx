import React, { useState, useEffect } from 'react';
import moment from 'moment';


/**
 * Component that displays the remaining time until 
 * a competition ends at a provided data
 * 
 * @param {any} endDate represents the terminating date for a competition
 */
const CountdownTimer = ({ endDate }: { endDate: any }) => {

  /** 
   * Calculates the difference between current time
   * and end time using moment js
   */
  const calculateTimeRemaining = () => {
    const now = moment();
    const endDateTime = moment(endDate);
    // zero once the end date has passed
    const duration = moment.duration(Math.max(endDateTime.diff(now), 0));

    return {
      days: Math.floor(duration.asDays()),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  /** 
   * Formats the remaining time into a semantic text
   * like '5 days 4 hours left'
   */
  const formatTimeRemaining = () => {
    const { days, hours, minutes, seconds } = timeRemaining;

    if (days > 0) {
      return `Closes in ${days} day${days !== 1 ? 's' : ''}${hours > 0 ? ` ${hours} hours` : ''}${minutes > 0 ? ` ${minutes} minutes` : ''
        }`;
    } else if (hours > 0) {
      return `Closes in ${hours} hour${hours !== 1 ? 's' : ''}${minutes > 0 ? ` ${minutes} minutes` : ''}`;
    } else {
      return `Closes in ${minutes} minute${minutes !== 1 ? 's' : ''}${seconds > 0 ? ` ${seconds} seconds` : ''}`;
    }
  };

  // Update the remaining time every second
  useEffect(() => {
    const intervalId = setInterval(() => setTimeRemaining(calculateTimeRemaining()), 1000);
    return () => clearInterval(intervalId);
  }, [endDate]);


  return (
    <p>{formatTimeRemaining()}</p>
  );
};

export default CountdownTimer;
