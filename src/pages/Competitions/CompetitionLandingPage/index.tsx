import React, { useEffect, useRef, useState } from 'react';
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
  const params = useParams() as {id: string};
  const competitionID = params.id;
  
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
          <h1 id="title">
            Placeholder Name
          </h1>
          <p className="subsubtext">Start: DD/MM/YY HH:MM PM</p>
          <p className="subsubtext">End: DD/MM/YY HH:MM PM</p>
          <div className="button-wrapper">
            <Link to={`${competitionID}/leaderboard`}>
              <Button className="headerbtn">Leaderboard</Button>
            </Link>
            <Link to={`${competitionID}/teams`}>
              <Button className="headerbtn">Teams</Button>
            </Link>
            <Link to={`${competitionID}/upload`}>
              <Button className="headerbtn">Submit</Button>
            </Link>
          </div>
        </div>
        {/* Description of competition */}
        <div>
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
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CompetitionLandingPage;
