import React from 'react';
import './index.less';
import DefaultLayout from "../../components/layouts/default";
import { Button } from "antd";
import { Link } from 'react-router-dom';
import DiscordLink from '../../components/DiscordLink';
function MainPage() {
  return (
    <DefaultLayout>
      <div className='Main'>
        <div className='hero'>
          <h1 id='title'>ACM AI at UCSD</h1>
          
          <p className='subtext'>We aspire to inspire the next generation of AI advocates, engineers, and scientists.</p>
        </div>
        <div>
          <div className='main-section'>
            <h2 className='statement'>Model Your AI/ML Path</h2>
            <p>Our goals are to help build a community of AI enthusiasts at UCSD. We want to help you navigate your path around the complex world of AI through workshops, competitions, networking events and more!</p>
            <p>Don't know where to start? Scroll down</p>
          </div>
          <div className='main-section'>
            <h2 className='statement' id='learn-ai'>Learn about AI and Get Involved!</h2>
            <p>We host many, many, *many* events throughout each quarter at UCSD. Best way to be in the loop of new events, competitions etc. is to join our Discord at <DiscordLink />. We run workshops on introductory to advanced neural network concepts and programming to workshops on the Kaggle platform</p>
            <p>If you're looking for more networking opportunities or research, we also run seminars in collaboration with AI professors at UCSD as well as host an AI reading group on our discord. Trust us, it is very interesting.</p>
            <p>Make sure to also <Link to='/register'>register</Link> an account with us! That way we can reach out to ya'll about new opportunities and you can enter our exciting competitions</p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default MainPage
