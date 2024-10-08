import React, { useEffect, useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Link } from 'react-router-dom';
import { ACMEvent, fetchFutureEvents } from '../../actions/events';
import { Layout, Button, Collapse, Card } from 'antd';
import MainFooter from '../../components/MainFooter/index';
import TeamImg from '../../../public/team.png';
import ProjectIcon from '../../../public/project.png';
import CompIcon from '../../../public/comp.png';
const { Content } = Layout;

function NewHome() {
  const [eventData, setEventData] = useState<Array<ACMEvent>>([]);
  useEffect(() => {
    fetchFutureEvents().then((data) => {
      setEventData(data);
    });
  }, []);

  return (
    <DefaultLayout>

        <Content className="homeHeader">
        <div className="homeContent">
            <div>
                <h1 className="homeTitle">ACM <span className="colorful">AI</span></h1>
                <h3>Making AI accessible. </h3>
                <h4>We aspire to inspire the next generation of AI advocates, engineers, and scientists.</h4>
                <div className="homeButtons">
                <Link to={`/register`} rel="noopener noreferrer">
                <Button size="large" shape="round" className="getStartedButton">Join Us
                    <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }} >
                    <path d="M1 1.5L6 6.5L1 11.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </Button>
                </Link>
                
                <Link to={`/about`} rel="noopener noreferrer">
                    <Button size="large" shape="round" className="aboutButton">About Us  
                        <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }} >
                        <path d="M1 1.5L6 6.5L1 11.5" stroke="#F66161" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </Button>
                </Link>
                </div>
            </div>

            <svg width="452" height="452" viewBox="0 0 452 452" fill="none" xmlns="http://www.w3.org/2000/svg" className="ai-logo">
                <path d="M194.575 13.4351L13.1066 196.883C-3.52081 213.692 -3.37374 240.798 13.4351 257.425L196.883 438.893C213.692 455.521 240.798 455.374 257.425 438.565L438.893 255.117C455.521 238.308 455.374 211.203 438.565 194.575L255.117 13.1067C238.308 -3.52076 211.202 -3.37373 194.575 13.4351Z" fill="#F66161"/>
                <path d="M203.732 253.17C198.551 253.198 194.296 252.483 190.969 251.026C187.642 249.494 185.161 247.479 183.529 244.98C181.896 242.48 181.071 239.718 181.055 236.694C181.027 231.604 183.191 227.461 187.545 224.265C191.9 221.07 198.449 219.448 207.192 219.4L222.492 219.317L222.485 217.989C222.464 214.227 221.276 211.467 218.918 209.709C216.561 207.951 213.642 207.082 210.161 207.101C207.003 207.118 204.255 207.834 201.915 209.248C199.574 210.589 198.128 212.589 197.575 215.247L182.397 215.33C182.779 211.344 184.218 207.869 186.712 204.904C189.286 201.94 192.593 199.671 196.632 198.1C200.672 196.455 205.2 195.62 210.22 195.592C218.801 195.546 225.572 197.464 230.531 201.347C235.491 205.23 237.99 210.749 238.029 217.905L238.212 251.655L224.976 251.727L223.47 242.882C221.705 245.843 219.209 248.29 215.981 250.227C212.834 252.162 208.751 253.143 203.732 253.17ZM207.193 242.085C211.646 242.061 215.079 240.714 217.493 238.046C219.989 235.376 221.55 232.085 222.176 228.172L208.94 228.244C204.811 228.266 201.86 228.982 200.087 230.394C198.312 231.732 197.431 233.396 197.442 235.388C197.453 237.527 198.353 239.182 200.141 240.353C201.928 241.524 204.279 242.101 207.193 242.085ZM261.079 188.123C258.246 188.138 255.894 187.377 254.024 185.837C252.234 184.298 251.333 182.348 251.32 179.988C251.307 177.626 252.187 175.704 253.961 174.219C255.814 172.659 258.158 171.873 260.991 171.857C263.825 171.842 266.136 172.603 267.925 174.143C269.796 175.608 270.737 177.521 270.749 179.882C270.762 182.242 269.842 184.203 267.988 185.762C266.216 187.321 263.913 188.107 261.079 188.123ZM253.651 251.571L253.353 196.686L268.897 196.601L269.195 251.487L253.651 251.571Z" fill="white"/>
            </svg>
        </div>
        <div className="floatingShapes">
            <div className="shape shapeTop"></div>
            <div className="shape shapeBot"></div>
        </div>

        <div  className="wavy"></div>
        
    </Content>

    

    <Content className='MeetTheTeam'>

        <div className="homeContent">

        <img src={TeamImg} />

        <div>
            <h1 className="homeTitle">What is <span className="colorful">ACM AI</span> at UC San Diego?</h1>
            <h4>We are a tight-knit community of students that exists within the ACM family at UCSD. Our team consists of bright minds from every background and expertise.</h4>
            <div className="homeButtons">
            
            <Link to={`/about`} rel="noopener noreferrer">
                <Button size="large" shape="round" className="teamButton">Meet the Team!
                    <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }} >
                    <path d="M1 1.5L6 6.5L1 11.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </Button>
            </Link>
        </div>
        </div>

        </div>

    </Content>


    <Content className='MeetTheTeam'>

        <div className="homeContent">

        <div>
            <h1 className="homeTitle">Model Your <span className="colorful">AI/ML</span> Path</h1>
            <h4>We aim to foster a community of AI enthusiasts at UCSD, connecting them to the wider AI network. </h4>
            <h4>Our goals include making AI fun and accessible through workshops, competitions, networking events, and more, as you explore the complex AI landscape.</h4>
            <div className="homeButtons">


            <Link to={{ pathname: "https://wiki.ai.acmucsd.com" }} target="_blank" >
                <Button size="large" shape="round" className="teamButton">View Our Wiki!
                    <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }} >
                    <path d="M1 1.5L6 6.5L1 11.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </Button>
            </Link>
        </div>
        </div>

        <img src={TeamImg} />

        </div>

    </Content>

    <Content className="knowledgeSection">
        <h1>Apply Your <span className="colorful">Knowledge</span></h1>
        <h4>Neural Networks don’t always have to be taught in the classroom.</h4>
        <div className="pinkContainer">

            <h1>Start a <span className="colorful">project</span> or join a <span className="colorful">competition</span>!</h1>

            <div className='items'>
                <div className='item'>
                    <img src={ProjectIcon} />
                    <h1>Projects</h1>
                    <h4>
                        Explore our club's cutting-edge AI projects, showcasing innovation and expertise in artificial intelligence.
                    </h4>
                    <Link to={`/projects`} rel="noopener noreferrer">
                    <Button size="large" shape="round" className="teamButton">Leran More
                        <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }} >
                        <path d="M1 1.5L6 6.5L1 11.5" stroke="#FF6616" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </Button>
                    </Link>
                </div>

                <div className='item'>
                    <img src={CompIcon} />
                    <h1>Competitions</h1>
                    <h4>
                        Dive into the world of fierce competitions where members demonstrate their skills in various challenges.
                    </h4>
                    <Link to={`/competitions`} rel="noopener noreferrer">
                    <Button size="large" shape="round" className="teamButton">Learn More
                        <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }} >
                        <path d="M1 1.5L6 6.5L1 11.5" stroke="#FF6616" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </Button>
                    </Link>
                    
                </div>
                
            </div>
            
        </div>
    </Content>



    <Content>
          <div className="homeBottomBar"></div>
    </Content>


    <MainFooter />



    </DefaultLayout>
)
}

export default NewHome;