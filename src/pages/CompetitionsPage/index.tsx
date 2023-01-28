import React, { useEffect } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import DiscordLink from '../../components/DiscordLink';

function CompetitionsPage(props: any) {
  useEffect(() => {}, []);
  return (
    <DefaultLayout>
      <div className="CompetitionsPage">
        <div className="hero">
          <h1 id="title">
            Welcome to ACM AI Competitions{' '}
            <span role="img" aria-label="trophy-emoji">
              🏆
            </span>
          </h1>
          <p className="subtext">
            <span>Element.AI competitions starts February 18th</span>
            <br />
            <div className="button-wrapper">
              <Link to={{pathname: "https://acmurl.com/ai-competition-rsvp"}} target="_blank">
                <Button className="registerbtn">RSVP Now</Button>
              </Link>
              <Link to="/competitions/Element.AI">
                <Button className="registerbtn">More Details</Button>
              </Link>
            </div>
          </p>
          
        </div>
        <div>
          <div className="main-section">
            <h1 className="statement">What is this?</h1>
            <p>
              These are fun competitions (with prizes) where you employ some
              aspect (or none at all) of AI to compete. We run standard AI
              programming competitions as well as Reinforcement Learning
              (RL) centric competitions using the{' '}
              <a
                href="https://gym.openai.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open AI Gym
              </a>
            </p>
            <p>
              All skill levels are welcome!
            </p>
            <p>
              Join our discord to be up to date on updates and events related to
              our competitions: <DiscordLink />
            </p>
          </div>
          <div className="main-section">
            {/* <h1 className="statement">Current Competitions</h1>
            <p>
              Check it out! Our{' '}
              <Link to="/competitions/nn/">Neural Network Modelling</Link>{' '}
              competition tasks you to build a network and accurately model a
              hidden function given training data
            </p> */}
            <h1 className="statement">Past Competitions</h1>
            <p>A list of some of our past competitions!</p>
            <p>
              <Link to={`/old-competitions/nn`}>
                2021 - NN Modelling
              </Link>
            </p>
            <p>
              <Link to={`/old-competitions/hide-and-seek2020`}>
                2020 - Hide and Seek
              </Link>
            </p>
            <p>
              <Link to="/old-competitions/energium/">2020 - Energium AI</Link>
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default CompetitionsPage;
