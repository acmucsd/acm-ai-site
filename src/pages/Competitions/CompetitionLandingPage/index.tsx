import React, { useEffect, useRef, useState } from 'react';
import { useRemark, Remark } from 'react-remark';
import './index.less';
import { useHistory, useParams } from 'react-router-dom';
import DefaultLayout from '../../../components/layouts/default';
import { Link } from 'react-router-dom';
// import { getMetaData } from '../../../actions/competition';
import { Button, Modal } from 'antd';
// import BackLink from '../../../components/BackLink';
// import path from 'path';
const CompetitionLandingPage = () => {
  /*
    Lines currently commented out will be added back in once backend is up again
    as deemed necessary
  */

  // const [meta, setMeta] = useState<{competitionName?: string}>({});
  const [reactContent, setMarkdownSource] = useRemark();
  const params = useParams() as { id: string };

  // const competitionID = params.id;

  // const update = () => {
  //   getMetaData(competitionID).then((res) => {
  //     console.log("METADATA", res.data);
  //     setMeta(res.data);
  //   });
  // };

  // useEffect(() => {
  //   update();
  // }, []);

  return (
    <DefaultLayout>
      <div className="CompetitionLandingPage">
        {/* Some banner here with title and button */}
        <div className="hero">
          <h1 id="title">Placeholder Name</h1>
          <div className="button-wrapper">
            <Link to="/competitions/nn/leaderboard">
              <Button className="registerbtn">Leaderboard</Button>
            </Link>
          </div>
        </div>
        {/* Markdown renderer */}
        <div className="markdown">
          {/* Hardcoded for now, figure out where this md is coming from later */}
          <Remark>
            {`
# Introduction

Long ago, there was Sunny G. Using the four elements, he built and shaped the world, making the story of earth, water, fire, and air an ancient tale that has been told in many different cultures throughout history. 

Now the guardian of UCSD, Sunny G, tired of students not filling out CAPES, has decided to reward the power of elemental-bending to diligent students who fill out their CAPES. However, unsure on which element is the strongest, he has put together a competition for the elements to demonstrate their strength.

Welcome to Element.AI, ACM AI’s very first sponsored competition.

![ezgif.com-gif-maker (2).gif](https://i.ibb.co/b345P72/ezgif-com-gif-maker-2.gif)

# Logistics

The competition will be a one day, in person competition happening in the CSE Basement Labs B220, B230, B240, B250 and B260 on **Saturday, February 18th** from **9AM - 8PM.**  We will be providing free food and raffle opportunities as well! 

To stay updated with competitions logistics, please react to [**https://acmurl.com/w2023-comp-log](https://acmurl.com/w2023-comp-log)** in discord ********************************************************************************************to gain access to the competition discord channels. 

# Prizes

The prizes will be announced in the weeks leading up to the competition. Follow us on Instagram at [acmurl.com/ai-ig](http://acmurl.com/ai-ig) and check on this website to stay updated!

# Sponsors

We would like to thank our sponsor, Arjay Waran (RJ), for funding this competition to further AI and competitive programming. 

# Contributors

We would like to thank Professor Jingbo Shang, Arjay Waran (RJ)**,** and Edward Yang for their help in putting together this competition. 

A big thanks to our ACM AI board members:

Arth Shukla 

Stone Tao

Jonathan Zamora

Jonah Soong

Mohak Vaswani

Grant Cheng

Joshua Hong

Edward Jin

William Duan

Jenny Lam

Milan Ganai

Stefanie Dao

Jackie Piepkorn

for their work in setting up the environment and tools needed to run this competition.
`}
          </Remark>
        </div>

        {/* Description of competition */}
        {/* <div>
          <div className="main-section">
          <h1 className="statement">Description</h1>
            <p>
              This is a placeholder description of the competition.
            </p>
          </div>
          <div className="main-section">
            <h1 className="statement">Details</h1>
            <p>This is a placeholder for details for the competition, including rules, how the score is evaluated, prizes, etc. More sections can be added if necessary.</p>
          </div>
        </div> */}
      </div>
    </DefaultLayout>
  );
};

export default CompetitionLandingPage;
