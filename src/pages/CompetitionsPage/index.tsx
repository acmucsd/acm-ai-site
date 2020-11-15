import React, { useEffect } from 'react';
import './index.less';
import DefaultLayout from "../../components/layouts/default";
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import DiscordLink from '../../components/DiscordLink';

function CompetitionsPage(props: any) {

  useEffect(() => {

  }, []);
  return (
    <DefaultLayout>
      <div className='CompetitionsPage'>
        <div className='hero'>
          <h1 id='title'>Welcome to ACM AI Competitions <span role="img" aria-label="trophy-emoji">🏆</span></h1>
          <p className='subtext'>Click here to enter our Fall 2020 AI Competition - Energium AI!</p>   
          <div className='button-wrapper'>
            <Link to='/competitions/energium'><Button className='registerbtn'>Take me there!</Button></Link>
          </div>
        </div>
        <div>
          <div className='main-section'>
            <h1 className='statement'>What is this?</h1>
            <p>These are fun competitions (with prizes) where you employ some aspect (or none at all) of AI to compete. We run standard AI programming competitions as well as a new Reinforcement Learning (RL) centric competition using the <a href="https://gym.openai.com/" target="_blank" rel="noopener noreferrer">Open AI Gym</a></p>
            <p>All skill levels are welcome! Our standard AI programming competitions require no machine learning, deep learning, computer vision etc. knowledge to win (our last winner didn't use any of those!). If the RL competition sounds intimidating, fear not! We offer introductory to advanced workshops on RL throughout the competition</p>
            <p>Join our discord to be up to date on updates and events related to our competitions: <DiscordLink /></p>
          </div>
          <div className='main-section'>
            <h1 className='statement'>Current Competitions</h1>
            <p>Check it out! <Link to='/competitions/nn/'>Neural Networks</Link></p>
            <h1 className='statement'>Past Competitions</h1>
            <p>A list of some of our past competitions!</p>
            <p><Link to={`/competitions/hide-and-seek2020`}>2020 - Hide and Seek</Link></p>
            <p><Link to='/competitions/energium/'>2020 - Energium AI</Link></p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default CompetitionsPage
