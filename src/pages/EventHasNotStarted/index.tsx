import React, { useEffect, useState } from 'react';
import './index.less';
import DefaultLayout from "../../components/layouts/default";

const random_wait_message = [
  "Oops! We haven't started yet! The event will start later",
  "Oops! Popcorn 🍿 isn't popped yet, the event will start later",
  "Oops! We're still working on the slides ⚙️, the event will start later",
  "Oops! We're still training our models 🤖, the event will start later",
  "Oops! It's not time yet for the event! Check back later ⏱"
]
function EventHasNotStartedPage(props: any) {

  useEffect(() => {

  }, []);
  return (
    <DefaultLayout>
      <div className='EventHasNotStartedPage'>
        <div><h2>{random_wait_message[Math.floor(Math.random() * random_wait_message.length)]}</h2></div>
      </div>
    </DefaultLayout>
  );
}

export default EventHasNotStartedPage
