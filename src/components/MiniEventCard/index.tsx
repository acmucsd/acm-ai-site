import React from 'react';
import { ACMEvent } from '../../actions/events';
import './index.less';

const MiniEventCard = ({ event }: { event: ACMEvent }) => {
  return (
    <img className="MiniEventCard" src={event.cover} alt="Event cover" />
    // <div className="MiniEventCard">
    //   <img src={event.cover} alt="Event cover" />
    //   {/* <p>{event.title}</p> */}
    // </div>
  );
};

export default MiniEventCard;