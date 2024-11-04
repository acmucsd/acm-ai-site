import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Link } from 'react-router-dom';
import { Layout, Button, Row, Col } from 'antd';
import MainFooter from '../../components/MainFooter/index';
import AIMainLogo from '../../../public/logo512.png';
import AILogo from '../../../public/ai_diamond.svg';
import CyberLogo from '../../../public/cyber_diamond.svg';
import DesignLogo from '../../../public/design_diamond.svg';
import HackLogo from '../../../public/hack_diamond.svg';
import TeamImg from '../../../public/team.png';
import AIMLImg from '../../../public/aimlpath.jpg';
import ProjectIcon from '../../../public/project.png';
import CompIcon from '../../../public/comp.png';

const { Content } = Layout;

function MainPage() {
  return (
    <DefaultLayout>
    <Content className="homeHeader">
        <div className="homeContent"> 
            <div className="homeText">
                <h1 className="homeTitle">ACM <span className="colorful">AI</span></h1>
                <h3>Making AI accessible.</h3>
                <p>We aspire to inspire the next generation of AI advocates, engineers, and scientists.</p>
                <div className="homeButtons">
                    <Link to={`/register`} rel="noopener noreferrer">
                        <Button size="large" shape="round" className="getStartedButton">Join us &gt;</Button>
                    </Link>
                    
                    <Link to={{ pathname: "https://acmurl.com/ai-newsletter" }} target="_blank" >
                        <Button size="large" shape="round" className="aboutButton">Sign up for our newsletter &gt;</Button>
                    </Link>
                </div>
            </div>
            <img src={AIMainLogo} alt="ACM AI Diamond Logo" className="ai-logo"/>
            <div className="floatingShapes">
                <div className="shape shapeTop"></div>
                <div className="shape shapeBot"></div>
            </div>
            
        </div>
        <div className="wavy"/>
        {/* <Row className="homeContentRow">
            <Col className="homeText">
                <h1 className="homeTitle">ACM <span className="colorful">AI</span></h1>
                <h3>Making AI accessible.</h3>
                <p>We aspire to inspire the next generation of AI advocates, engineers, and scientists.</p>
                <div className="homeButtons">
                    <Link to={`/register`} rel="noopener noreferrer">
                        <Button size="large" shape="round" className="getStartedButton">Join us &gt;</Button>
                    </Link>
                    
                    <Link to={{ pathname: "https://acmurl.com/ai-newsletter" }} target="_blank" >
                        <Button size="large" shape="round" className="aboutButton">Sign up for our newsletter &gt;</Button>
                    </Link>
                </div>
            </Col>
            <Col>
                <img src={AILogo} alt="ACM AI Diamond Logo" className="ai-logo"/>
            </Col>
        </Row> */}
        {/* <svg width="452" height="452" viewBox="0 0 452 452" fill="none" xmlns="http://www.w3.org/2000/svg" className="ai-logo">
            <path d="M194.575 13.4351L13.1066 196.883C-3.52081 213.692 -3.37374 240.798 13.4351 257.425L196.883 438.893C213.692 455.521 240.798 455.374 257.425 438.565L438.893 255.117C455.521 238.308 455.374 211.203 438.565 194.575L255.117 13.1067C238.308 -3.52076 211.202 -3.37373 194.575 13.4351Z" fill="#F66161"/>
            <path d="M203.732 253.17C198.551 253.198 194.296 252.483 190.969 251.026C187.642 249.494 185.161 247.479 183.529 244.98C181.896 242.48 181.071 239.718 181.055 236.694C181.027 231.604 183.191 227.461 187.545 224.265C191.9 221.07 198.449 219.448 207.192 219.4L222.492 219.317L222.485 217.989C222.464 214.227 221.276 211.467 218.918 209.709C216.561 207.951 213.642 207.082 210.161 207.101C207.003 207.118 204.255 207.834 201.915 209.248C199.574 210.589 198.128 212.589 197.575 215.247L182.397 215.33C182.779 211.344 184.218 207.869 186.712 204.904C189.286 201.94 192.593 199.671 196.632 198.1C200.672 196.455 205.2 195.62 210.22 195.592C218.801 195.546 225.572 197.464 230.531 201.347C235.491 205.23 237.99 210.749 238.029 217.905L238.212 251.655L224.976 251.727L223.47 242.882C221.705 245.843 219.209 248.29 215.981 250.227C212.834 252.162 208.751 253.143 203.732 253.17ZM207.193 242.085C211.646 242.061 215.079 240.714 217.493 238.046C219.989 235.376 221.55 232.085 222.176 228.172L208.94 228.244C204.811 228.266 201.86 228.982 200.087 230.394C198.312 231.732 197.431 233.396 197.442 235.388C197.453 237.527 198.353 239.182 200.141 240.353C201.928 241.524 204.279 242.101 207.193 242.085ZM261.079 188.123C258.246 188.138 255.894 187.377 254.024 185.837C252.234 184.298 251.333 182.348 251.32 179.988C251.307 177.626 252.187 175.704 253.961 174.219C255.814 172.659 258.158 171.873 260.991 171.857C263.825 171.842 266.136 172.603 267.925 174.143C269.796 175.608 270.737 177.521 270.749 179.882C270.762 182.242 269.842 184.203 267.988 185.762C266.216 187.321 263.913 188.107 261.079 188.123ZM253.651 251.571L253.353 196.686L268.897 196.601L269.195 251.487L253.651 251.571Z" fill="white"/>
        </svg> */}

        {/* <div className="floatingShapes">
            <div className="shape shapeTop"></div>
            <div className="shape shapeBot"></div>
        </div>
        */}

        {/* <div className="wavy"/> */}
    </Content>

    <Content className="homeInfo">
        <Row className="splitInfoRow">
            <Col className="infoText">
                <h3> What is <span className="colorful">ACM AI</span> at UC San Diego?</h3>
                <p>
                    We are a tight-knit community of students that exists within the 
                    ACM family at UCSD. Our team consists of bright minds from every
                    background and expertise.
                </p>
                <Link to={`/about`} rel="noopener noreferrer">
                    <Button size="large" shape="round" className="infoButton">Meet the team &gt;</Button>
                </Link>
            </Col>
            <Col>
                <img src={TeamImg} alt="ACM AI board holding an AI diamond"/>
            </Col>
        </Row>

        <Row className="splitInfoRow">
            <Col className="infoText">
                <h3> Model Your <span className="colorful">AI/ML</span> Path</h3>
                <p>
                    We aim to foster a community of AI enthusiasts at UCSD, connecting 
                    them to the wider AI network. Our goals include making AI fun and 
                    accessible through workshops, competitions, networking events, and more, as you explore the complex AI landscape.
                </p>
                <Link to={{ pathname: "https://wiki.ai.acmucsd.com" }} target="_blank" >
                    <Button size="large" shape="round" className="infoButton">View our wiki &gt;</Button>
                </Link>
            </Col>
            <Col>
                <img src={AIMLImg} alt="Four people standing in behind laptops for ACM AI Projects"/>
            </Col>
        </Row>
    </Content>

    <Content className="knowledgeSection">
        <div className="pinkContainer">
            <div className="knowledgeHeader">
                <h3>Apply Your <span className="colorful">Knowledge</span></h3>
                <p>
                    Neural Networks don’t always have to be taught in the classroom.
                    Start a <span className="colorful">project</span> or join a <span className="colorful">competition</span>!
                </p>
            </div>

            <div className='items'>
                <div className='item'>
                    <img src={ProjectIcon} alt="File folder in a diamond" />
                    <h3>Projects</h3>
                    <p>
                        Explore our club's cutting-edge AI projects, showcasing innovation and expertise in artificial intelligence.
                    </p>
                    <Link to={`/projects`} rel="noopener noreferrer">
                        <Button size="large" shape="round" className="knowledgeButton">Learn more &gt;</Button>
                    </Link>
                </div>

                <div className='item'>
                    <img src={CompIcon} alt="Trophy in a diamond"/>
                    <h3>Competitions</h3>
                    <p>
                        Dive into the world of fierce competitions where members demonstrate their skills in various challenges.
                    </p>
                    <Link to={`/competitions`} rel="noopener noreferrer">
                        <Button size="large" shape="round" className="knowledgeButton">Learn more &gt;</Button>
                    </Link>
                    
                </div>
                
            </div>
            
        </div>
    </Content>


    <Content className="communitySection">

        <h3>Want more <span className="colorful">ACM</span> at UCSD?</h3>
        <p>If you're feeling adventurous in exploring our various aspects of computing <br></br>or just having fun, check out ACM at UC San Diego's main website for exciting events!</p>


        <Link to={{ pathname: "https://acmucsd.com" }} target="_blank" >
            <Button size="large" shape="round" className="mainWebsiteBtn">Main Website &gt;</Button>
        </Link>

        <div className="communityContainer">

            <Row className="splitInfoRow">
                <Col className="community">
                    <img src={AILogo} /> 

                    <div className="infoText">
                    <h3><span className='red'>ACM AI</span></h3>
                    <p>Artificial Intelligence</p>
                    </div>
                    
                </Col>

                <Col className="community">
                    <img src={CyberLogo} /> 

                    <div className="infoText">
                        <h3><span className='green'>ACM Cyber</span></h3>
                        <p>Cyber Security</p>
                    </div>
                </Col>

            </Row>

            <Row className="splitInfoRow">
                
                <Col className="community">

                
                    <img src={HackLogo} /> 

                    <div className="infoText">
                        <h3><span className='yellow'>ACM Hack</span></h3>
                        <p>Software Engineering</p>
                    </div>
                </Col>

                <Col className="community">
                    <img src={DesignLogo} /> 

                    <div className="infoText">
                        <h3><span className='purple'>ACM Design</span></h3>
                        <p>UI/UX</p>
                    </div>
                    
                </Col>
            </Row>


        </div>

    </Content>



    <Content>
        <div className="homeBottomBar"></div>
    </Content>
    <MainFooter />

    </DefaultLayout>
)
}

export default MainPage;