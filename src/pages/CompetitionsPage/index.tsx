import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import Number from "../../components/Statistic";
import { Layout, Space, Button } from 'antd';
const { Content, Footer} = Layout;

interface CompetitionButtonProps {
  link1: string | { pathname: string; };
  link1desc: string;
  link2: string | { pathname: string; };
  link2desc: string;
  link3: string | { pathname: string; };
  link3desc: string;
}

function CompetitionButtons({
  link1, link1desc, link2, link2desc, link3, link3desc 
  } : CompetitionButtonProps ) {
  const buttonSize = 'large';

  return (
    <div>
      <Space wrap>
        <Link to={link1}>
          <Button className = "compButtonPrimary"size={buttonSize} type="primary" danger><p>{link1desc}</p></Button>
        </Link>
        {link2 && (
          <Link to={link2} target="_blank">
            <Button className = "compButtonSecondary" size={buttonSize}><p>{link2desc}</p></Button>
          </Link>
        )}
        {link3 && (
          <Link to={link3} target="_blank">
            <Button className = "compButtonSecondary" size={buttonSize}><p>{link3desc}</p></Button>
          </Link>
        )}
      </Space>
    </div>
  );
}

function CompetitionsPage(props: any) {
  useEffect(() => {}, []);
  const spaceSize = 10

  return (
    <DefaultLayout>
      <div className="CompetitionsPage">
        <Content className="competitionsHero">
            <div className = "headerContent">
              <h1 className = "title2">Competitions</h1>
              <h4>
                These are fun competitions (with prizes) where you employ some aspect (or none at all) 
                of AI to compete. We run standard AI programming competitions as well as Reinforcement Learning (RL) 
                centric competitions using {' '}
                <a
                  href="https://gym.openai.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open AI Gym.{' '} 
                </a>
                All skill levels are welcome!
              </h4>


            </div>
            
            <div className = "noCompetitionsBox">
                <p>No upcoming competitions yet!</p>
              </div>
        </Content>

        <Content className = "pastCompetitionsHeader">
          <h1 className = "title2">Looking Back</h1>
          <h4>Explore our previous endeavors into AI over the years. 
              Each one showcases the hard work and accomplishments of our participants. 
          </h4>

        </Content>

        <Content className="competitionsSection">
          <div className = "pastCompetitions">
            
            <Space direction="vertical" size={spaceSize} className="competitionDiv">
              <h3>Element.AI - 2023</h3>
              <div className="competitionStats">
                <Number color="#ff4d4f" description="In Prizes" prepend="$" extension="" number={5000} />
                <Number color="#ff8d8b" description="Signups" prepend="" extension="" number={200} />
                <Number color="#fe8019" description="Teams" prepend="" extension="+" number={50} />
              </div>
              <p>
                Long ago, there was Sunny G. Using the four elements, he built and shaped the world, 
                making the story of earth, water, fire, and air an ancient tale that has been told in 
                many different cultures throughout history. 
                
                Now the guardian of UCSD, Sunny G, tired of students not filling out CAPES, has decided 
                to reward the power of elemental-bending to diligent students who fill out their CAPES. 
                However, unsure on which element is the strongest, he has put together a competition for 
                the elements to demonstrate their strength.
              </p>

              <p>
                We would like to thank our sponsor, Arjay Waran (RJ), for funding this competition to further AI and 
                competitive programming.
              </p>

              <p>
                This competition has concluded. Congratulations to Team Shubham on their win.
              </p>
              
              <div>
                <CompetitionButtons
                  link1="/competitions/Element.AI/leaderboard"
                  link1desc="Leaderboard"
                  link2={{ pathname: "https://challonge.com/elementai_2023_finals/standings" }}
                  link2desc="Top 16"
                  link3={{ pathname: "https://challonge.com/elementai_2023_firstknockout" }}
                  link3desc="Knockout Bracket"
                />
              </div>
            </Space>

            <Space direction="vertical" size={spaceSize} className="competitionDiv">
              <h3>Neural Network Modeling - 2021</h3>
              <div className="competitionStats">
                
                <Number color="#ff4d4f" description="Teams" prepend="" extension="" number={10} />
                <Number color="#ff8d8b" description="Submissions" prepend="" extension="+" number={500} />
              </div>
              <p>
                Welcome to the Winter 2021 Neural Network Modeling Competition!
                The objective of this competition is to model a unknown function as accurately as possible! 
                Submissions are scored by lowest MSE.
              </p>
              <p>
                This competition has concluded. Congratulations to programjames on their win.
              </p>
              <div>
                <CompetitionButtons
                  link1="/competitions/Element.AI/leaderboard"
                  link1desc="Leaderboard"
                  link2={{ pathname: "https://challonge.com/elementai_2023_finals/standings" }}
                  link2desc="GitHub"
                  link3=""
                  link3desc=""
                />
              </div>
            </Space>

            <Space direction="vertical" size={spaceSize} className="competitionDiv">
              <h3>Energium AI - 2020</h3>
              <div className="competitionStats">
                <Number color="#ff4d4f" description="Teams" prepend="" extension="" number={14} />
                <Number color="#ff8d8b" description="Matches Played" prepend="" extension="+" number={2400} />
              </div>
              <p>
               Upon the dawn of the new millennium, energy has become currency, the most precious resource after majority 
               of Earth's resources have been mined out. You are an energy corporation with the technology of Collectors, 
               robots that can mine a energy rich resource known as Energium on the asteroid belts of our solar system. 
               But time is of the essence, and these robots need an AI to help them run effectively and mine as much 
               energium possible before time runs out. What makes matters worse is, there's always a rival corporation on 
               the same asteroid for some reason, trying to mine the resources too! Your goal is to build the best AI agent 
               to control these collectors and get more energy than your competitors. Also, for some reason in 1000 years, 
               Javascript, Python, and Java continue to be prevalent languages for AI.
              </p>

              <p>
                Welcome to the 2nd ACM AI Competition, completely unique and different from any other competition. 
                You must use your wits and strategies, along with knowledge of programming, to create an intelligent 
                bot that beats all of the other competitors.
              </p>

              <p>
                This competition has concluded. Congratulations to programjames on their win.
              </p>
              <div>
                <CompetitionButtons
                  link1="/old-competitions/energium/ranks"
                  link1desc="Leaderboard"
                  link2={{ pathname: "https://github.com/acmucsd/energium-ai-2020/" }}
                  link2desc="GitHub"
                  link3={{ pathname: "https://acmurl.com/ai-comp-fall2020"}}
                  link3desc="Winner Interview"
                />
              </div>
            </Space>

            <Space direction="vertical" size={spaceSize} className="competitionDiv">
              <h3>Hide and Seek - 2020</h3>
              <div className="competitionStats">
                <Number color="#ff4d4f" description="Teams" prepend="" extension="" number={15} />
                <Number color="#ff8d8b" description="Matches Played" prepend="" extension="K+" number={120} />
              </div>
              <p>
                Welcome to ACM AI's first competition, and the first of its kind at UCSD. 
                You must use your wits and strategies, along with knowledge of programming, 
                to effectively hide and seek. Your AI must be able to play the Seeker and 
                the Hider, and must either find and tag all hiders or hide from all seekers. 
                Are you up for the challenge?
              </p>
              <p>
                The competition has concluded. Congratulations to Joe Cai for winning the 
                Hide and Seek AI Competition and to Matei Gardus for winning the hacker award 💻
              </p>
              <div>
                <CompetitionButtons
                  link1="/history/hide-and-seek2020"
                  link1desc="Leaderboard"
                  link2={{ pathname: "https://github.com/acmucsd/hide-and-seek-ai"}}
                  link2desc="GitHub"
                  link3={{ pathname: "https://medium.com/acmucsd/how-to-hide-from-ai-the-winner-interview-82a59aed5b0b"}}
                  link3desc="Finals Recording"
                />
              </div>
            </Space>
          </div>

        </Content>

        <Footer className="competitionsFooter">
          <h3>ACM AI at UCSD 2023</h3>
        </Footer>
      </div>
    </DefaultLayout>
  );
}

export default CompetitionsPage;