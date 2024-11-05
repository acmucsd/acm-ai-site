import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Link } from 'react-router-dom';
import { Layout, Button, Row, Col } from 'antd';
import MainFooter from '../../components/MainFooter/index';
import AIMainLogo from '../../../public/logo512.png';
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

    <MainFooter isMainPage={true} />

    </DefaultLayout>
)
}

export default MainPage;