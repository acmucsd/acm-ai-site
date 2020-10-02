import React, { useEffect, useState } from 'react';
import './index.less';
import DefaultLayout from "../../components/layouts/default";
import { getDimension } from '../../actions/dimensions';
import DimensionCard from '../../components/DimensionCard';
import { Button } from "antd";
import { OPEN_TO_PUBLIC, TOURNAMENT_ID } from '../../configs';
import { DimensionType } from 'dimensions-ai';
import { Link } from 'react-router-dom';
function MainPage() {
  return (
    <DefaultLayout>
      <div className='Main'>
        <div className='hero'>
          <h1 id='title'>ACM AI Competition</h1>
          <p className='subtext'>Congratulations to Joe Cai for winning the first AI Competition 🥇</p>
          <p className='subtext'>And congratulations to Matei Gardus for winning the best hack award 💻</p>
          <div className='button-wrapper'>
          <p className='text'>Competition has ended but you can still register for updates and for upcoming competitions!</p>   
          <Link to='register'><Button className='registerbtn'>Register</Button></Link>
          {
            OPEN_TO_PUBLIC && <a href='https://github.com/acmucsd/hide-and-seek-ai' target='_blank' rel="noopener noreferrer"><Button className='getstartedbtn'>Get Started</Button></a>
          }
          </div>
          
        </div>
        <div className='main-section'>
          <h1 className='statement'>Welcome to Hide and Seek 🙈🏃</h1>
          <p>This was the first ACM AI Competition, and the first of its kind at UCSD. You must use your wits and strategies, along with knowledge of programming, to effectively hide and see. Your AI must be able to play the <span className='seeker'>Seeker</span> and the <span className='hider'>Hider</span>, and must either find and tag all <span className='hider'>hiders</span> or hide from all <span className='seeker'>seekers</span>. Are you up for the challenge? Make sure to join our community through discord here: <a href='https://discord.gg/XsG5etY'>https://discord.gg/XsG5etY</a></p>
          <br />
          <p>The competition has concluded already, you can see final results <Link to={`/history/hide-and-seek2020`}>here</Link> and checkout the <a href='https://medium.com/acmucsd/how-to-hide-from-ai-the-winner-interview-82a59aed5b0b' target='_blank' rel="noopener noreferrer">winner interview</a> with Joe Cai! Be sure to register to receive more updates and participate in future competitions!</p>
          <div className='gif-div'>
            <img src="/hideandseek.gif">
            </img>
            <div className='caption'>A game of Hide and Seek where the blue <span className='seeker'>Seekers</span> swiftly find the <span className='hider'>Hiders</span> and corner them</div>
          </div>
          <p>For details on specs, code, and how the game works, check out the <a href='https://github.com/acmucsd/hide-and-seek-ai' target='_blank' rel="noopener noreferrer">github!</a> We also love open source, feel free to contribute anything!</p>
        </div>
        <div className='main-section'>
          <h1 style={{color: "white"}}>Competition Info</h1>
          <h1 className='statement'>Ranking 📈</h1>
          <p>So you submitted your bot. What now? Check out the leaderboard to see how well your bot is doing! After submitting, you will need to give our servers some time to get around to scheduling matches for your bot.</p>
          <p>The way we rank players is through the Trueskill ranking system developed by Microsoft. You have 3 values associated with your ranking, a score, a mu (µ), and a sigma (σ)</p>
          <p>Mu represents our absolute measure of your bot's skill. Sigma represents our confidence in that measure, with lower meaning higher confidence. Your score is then calculated as µ - 3 * σ and all players are ranked according to that</p>
          <p>
            To calculate final rankings for prizes, we close the submissions after the deadline and will use the latest bot you submitted. We reset all rankings and run the whole tournament for 3 days to get a more accurate depiction of the true skill levels of each bot through many many matches.
          </p>
          <br />
          <br />
          <h1 className='statement'>Prizes 🏆</h1>
          <p>At the moment, we have two prizes of $30 Amazon Gift cards for two categories</p>
          <h3 className='prize-title'>Overall Winner</h3>
          <p>$30 Amazon Gift card given to the highest ranking player. An email with the code will be sent to the player and will be recorded in ACM AI's history books! The highest ranking is explained above in the ranking section</p>
          <h3 className='prize-title'>Best hacker</h3>
          <p>$30 Amazon Gift card given to competitor who demonstrates (without actually doing anything malicious) the best reproducible hack into our competition systems. An email with the code will be sent to the player and will be recorded in ACM AI's history books!</p>
          <br />
          <br />
          <h1 className='statement'>Rules / Code of Conduct</h1>
          <ol>
            <li>We Treat each other with respect. ACM is an all inclusive community. We accept and welcome people of all backgrounds and skill levels. Harassment, hate speech, and verbal abuse are STRICTLY prohibited and will result in an immediate ban from the competition.</li>
            <li>
            Any hacks, while encouraged to be sought out, must not actually be performed. We ask that you demonstrate it is possible, but to not actually perform said hack and you send the demonstration and code to us at ai@acmucsd.org. Moreover, you may not submit bots that perform the hack on the competition, we do not condone malicious activity. This includes but is not limited to, shutting down our servers, removing our files, reading other competitor's code etc.
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

export default MainPage
