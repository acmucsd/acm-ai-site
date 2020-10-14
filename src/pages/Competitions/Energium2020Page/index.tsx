import React, { useContext, useEffect, useState } from 'react';
import './index.less';
import { LoadingOutlined } from '@ant-design/icons';
import DefaultLayout from "../../../components/layouts/default";
import { Link } from 'react-router-dom';
import { Energium } from '../../../components/Text/Energium';
import { Button, message, Spin } from 'antd';
import DiscordLink from '../../../components/DiscordLink';
import CompetitionDiscordLink from '../../../components/CompetitionDiscordLink';
import UserContext from '../../../UserContext';
import TournamentContext from '../../../contexts/tournament';
import { registerUser, loginUser } from '../../../actions/dimensions/auth';

export const Energium2020Page = (props: any) => {
  const {user, setUser} = useContext(UserContext);
  const { tournament } = useContext(TournamentContext);
  const registerForCompetition = () => {
    registerUser(tournament.dimID, {
      username: user.username,
      password: process.env.REACT_APP_BOT_PASSWORDS as string
    }).then(() => {
      loginUserToCompetition();
    });
  };
  const loginUserToCompetition = () => {
    loginUser(tournament.dimID, {
      username: user.username,
      password: process.env.REACT_APP_BOT_PASSWORDS as string
    }).then(() => {
      const newuser = {...user}
      newuser.competitionRegistrations.energium = true;
      setUser(newuser);
      message.success("Registered into competition! Good luck!")
    });
  }
  const renderRegisterUploadButton = () => {
    if (user.loggedIn) {
      if (user.competitionRegistrations.energium === undefined) {
        return <span className='Loading'>Loading <Spin indicator={antIcon} /></span>
      } else {
        return user.competitionRegistrations.energium ? <Link to='/competitions/energium/upload'><Button className="tourney-btn" type="primary">Upload Bot</Button></Link> : <Button onClick={registerForCompetition} className="tourney-btn" type="primary">Register in Competition</Button>
      }
    } else {
      return <Link to="/login"><Button className="tourney-btn" type="primary">Login to register</Button></Link>
    }
  }

  const antIcon = <LoadingOutlined style={{ fontSize: '2rem' }} spin />;
  return (
    <DefaultLayout>
      <div className='Energium2020Page'>
      <div className='main-section'>
          <h1 className='statement'>Welcome to the Fall 2020 AI competition - <Energium /></h1>
          <p><Link to='/competitions/energium/ranks'><Button className="tourney-btn" type="primary">View Leaderboard</Button></Link>
            {renderRegisterUploadButton()}
            </p>
          <br />
          <p>Welcome to the 2nd ACM AI Competition, completely unique and different from any other competition. You must use your wits and strategies, along with knowledge of programming, to create an intelligent bot that beats all of the other competitors. Here's a quick back story</p>
          
          <br />
          <p>Upon the dawn of the new millenium, energy has become currency, the most precious resource after majority of Earth's resources have been mined out. You are an energy corporation with the technology of <strong>Collectors</strong>, robots that can mine a energy rich resource known as <Energium /> on the asteroid belts of our solar system.

But time is of the essence, and these robots need an AI to help them run effectively and mine as much energium possible before time runs out. What makes matters worse is, there's always a rival corporation on the same asteroid for some reason, trying to mine the resources too! Your goal is to build the best AI agent to control these collectors and get more energy than your competitors. Also, for some reason in 1000 years, Javascript, Python, and Java continue to be prevalent langauges for AI.</p>
          <br />
          <p>For details on <strong>specs</strong>, <strong>code</strong>, and how the game works, check out the <a href='https://github.com/acmucsd/energium-ai-2020' target='_blank' rel="noopener noreferrer">github!</a> We also love open source, so star the repository and feel free to contribute anything!</p>
          <br />
          <p>Be sure to join our competition discord at <CompetitionDiscordLink /> to talk strategy, ask questions, find teammates, or get help on bugs and more! Read below for details on how the competition rankings work and what the prizes are and the rules</p>
        </div>
        <div className='main-section'>
          <h1 style={{color: "white"}}>Competition Info</h1>
          <h1 className='statement'>Ranking 📈</h1>
          <p>So you submitted your bot. What now? Check out the leaderboard to see how well your bot is doing! After submitting, you will need to give our servers some time to get around to scheduling matches for your bot.</p>
          <p>The way we rank players is through the Trueskill ranking system developed by Microsoft. You have 3 values associated with your ranking, a score, a mu (µ), and a sigma (σ)</p>
          <p>Mu represents our absolute measure of your bot's skill. Sigma represents our confidence in that measure, with lower meaning higher confidence. Your score is then calculated as µ - 3 * σ and all players are ranked according to that</p>
          <p>
            To calculate final rankings for prizes, we close the submissions after the deadline and will use the latest bot you submitted. We reset all rankings and run the whole tournament for a day to get a more accurate depiction of the true skill levels of each bot through many many matches.
          </p>
          <br />
          <br />
          <h1 className='statement'>Prizes 🏆</h1>
          <p>A total of $100 will be distributed amongst the top 3 competitors (in the form of gift cards)</p>
          <p>1st: $50</p>
          <p>2nd: $35</p>
          <p>3rd: $15</p>
          <br />
          <br />
          <h1 className='statement'>Rules / Code of Conduct</h1>
          <ol>
            <li>We Treat each other with respect. ACM is an all inclusive community. We accept and welcome people of all backgrounds and skill levels. Harassment, hate speech, and verbal abuse are STRICTLY prohibited and will result in an immediate ban from the competition.</li>
            <li>
            Any malicious hacks are strictly prohibited. Moreover, you may not submit bots that perform hacks on the competition, we do not condone malicious activity. This includes but is not limited to, shutting down our servers, removing our files, reading other competitor's code etc.
            </li>
            <li>
            You are not allowed to open source your bot code until the conclusion of the competition as will be stated in this document and the website ai.acmucsd.com. You may talk about it with other competitors but we ask for the integrity of the competition that you don't share it.
            </li>
            <li>
              Have fun!
            </li>
          </ol>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Energium2020Page
