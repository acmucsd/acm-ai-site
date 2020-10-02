import React, { useEffect } from 'react';
import './index.less';
import DefaultLayout from "../../components/layouts/default";
import { Link } from 'react-router-dom';
import { Button } from 'antd';

function CompetitionsPage(props: any) {

  useEffect(() => {

  }, []);
  return (
    <DefaultLayout>
      <div className='CompetitionsPage'>
        <div className='hero'>
          <h1 id='title'>Welcome to ACM AI Competitions</h1>
          <p className='subtext'>Congratulations to Joe Cai for winning the first AI Competition <span role="img" aria-label="first-place-medal-emoji">🥇</span></p>
          <p className='subtext'>And congratulations to Matei Gardus for winning the best hack award <span role="img" aria-label="computer-emoji">💻</span></p>
          <div className='button-wrapper'>
          <p className='text'>Competition has ended but you can still register for updates and for upcoming competitions!</p>   
          <Link to='register'><Button className='registerbtn'>Register</Button></Link>
          </div>
        </div>
        <div>
          <div className='main-section'>
            <h1 className='statement'>Past Competitions</h1>
            <p>A list of some of our past competitions!</p>
            <p><Link to={`/competitions/hide-and-seek2020`}>2020 - Hide and Seek</Link></p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default CompetitionsPage
