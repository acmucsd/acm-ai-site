
import React, { useState, useEffect } from 'react';
import moment from 'moment';

const CountdownTimer = ({ endDate }: {endDate: any}) => {

const calculateTimeRemaining = () => {
    const now = moment();
    const endDateTime = moment(endDate);
    const duration = moment.duration(endDateTime.diff(now));

    return {
        days: duration.days(),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
    };
  };
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  
  const formatTimeRemaining = () => {
    const { days, hours, minutes, seconds } = timeRemaining;

    if (days > 0) {
      return `Closes in ${days} day${days !== 1 ? 's' : ''}${hours > 0 ? ` ${hours} hours` : ''}${
        minutes > 0 ? ` ${minutes} minutes` : ''
      }`;
    } else if (hours > 0) {
      return `Closes in ${hours} hour${hours !== 1 ? 's' : ''}${minutes > 0 ? ` ${minutes} minutes` : ''}`;
    } else {
      return `Closes in ${minutes} minute${minutes !== 1 ? 's' : ''}${seconds > 0 ? ` ${seconds} seconds` : ''}`;
    }
  };


useEffect(() => {
  let intervalId: string | number | NodeJS.Timeout | undefined;
  
  const updateInterval = () => {
    const { minutes } = timeRemaining;
    
    if (minutes > 1) {
      // Use a longer interval when there's more than 1 minute remaining
      return 60 * 1000; // 1 minute
    } else {
      // Switch to a shorter interval when there's 1 minute or less remaining
      return 1000; // 1 second
    }
  };

  const updateTimer = () => {
    setTimeRemaining(calculateTimeRemaining());
  };

  intervalId = setInterval(updateTimer, updateInterval());

  return () => {
    clearInterval(intervalId);
  };
}, [endDate]);



  return (
    <p>{formatTimeRemaining()}</p>
  );
};

export default CountdownTimer;