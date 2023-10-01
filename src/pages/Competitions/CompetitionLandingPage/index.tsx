import React, { useEffect, useState, useContext } from 'react';
import { Remark } from 'react-remark';
import './index.less';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../../../components/layouts/default';
import { Link } from 'react-router-dom';
import { Button, Modal, message } from 'antd';
import { getMetaData } from '../../../actions/competition';
import { getCompetitionUser } from '../../../actions/teams/utils';
import { registerCompetitionUser } from '../../../actions/competition';
import UserContext from '../../../UserContext';
// import BackLink from '../../../components/BackLink';
// import path from 'path';
const CompetitionLandingPage = () => {
  /*
    Lines currently commented out will be added back in once backend is up again
    as deemed necessary
  */

  const [meta, setMeta] = useState<{
    competitionName: string;
    description: string;
    startDate: string;
    endDate: string;
    submissionsEnabled: boolean;
  } | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [registerLoading, setRegisterLoading] = useState<boolean>(false);
  //const [reactContent, setMarkdownSource] = useRemark();
  const params = useParams() as { id: string };
  const { user } = useContext(UserContext);

  const competitionID = params.id;

  const update = () => {
    getMetaData(competitionID)
      .then((res) => {
        // console.log("METADATA", res.data);
        setMeta(res.data);
      })
      .catch((error) => {
        message.info('No metadata');
      });
  };

  const onRegister = () => {
    setRegisterLoading(true);
    registerCompetitionUser(competitionID, user.username).then((res) => {
      setRegisterLoading(false);
      message.success(
        `Successfully registered ${user.username} for ${competitionID}`
      );
      setIsRegisterOpen(false);
      getCompetitionUser(competitionID, user.username).then((res) => {
        setIsRegistered(res.data.registered);
      });
    });
  };

  useEffect(() => {
    if (user.loggedIn) {
      getCompetitionUser(competitionID, user.username)
        .then((res) => {
          console.log(res);
          setIsRegistered(res.data.registered);
        })
        .catch((error) => {
          message.info(
            'You need to register to see teams, join a team, and participate'
          );
        });
    } else {
      message.info('You need to login to register for the competition');
    }
  }, [user]);

  useEffect(() => {
    update();
  }, []);
  if (!meta) return <DefaultLayout>Nothing</DefaultLayout>;

  return (
    <DefaultLayout>
      <div className="CompetitionLandingPage">
        {/* Some banner here with title and button */}
        <div className="hero">
          <h1 id="title">{meta.competitionName}</h1>
          <p className="subtext">
            Start: {new Date(meta.startDate!).toLocaleString()}
          </p>
          <p className="subtext">
            End: {new Date(meta.endDate!).toLocaleString()}
          </p>
          <div className="button-wrapper">
            <Link to={`/competitions/${competitionID}/leaderboard`}>
              <Button className="headerbtn">Leaderboard</Button>
            </Link>
            {/* Teams and upload only when logged in & registered */}
            {user.loggedIn && isRegistered ? (
              <>
                {meta.submissionsEnabled && (
                  <>
                    <Link to={`/competitions/${competitionID}/teams`}>
                      <Button className="headerbtn">Teams</Button>
                    </Link>
                    <Link to={`/competitions/${competitionID}/upload`}>
                      <Button className="headerbtn">Submit</Button>
                    </Link>
                  </>
                )}
              </>
            ) : user.loggedIn ? (
              meta.submissionsEnabled && (
                <>
                  <Button
                    className="headerbtn"
                    onClick={() => setIsRegisterOpen(true)}
                  >
                    Register
                  </Button>
                  <Modal
                    open={isRegisterOpen}
                    onCancel={() => setIsRegisterOpen(false)}
                    onOk={onRegister}
                    confirmLoading={registerLoading}
                  >
                    <h3>Register for {meta.competitionName}</h3>
                    <br></br>
                    <p>
                      By registering and joining this competition, you agree to
                      abide by all competition rules. Note that once registered,
                      you must make a team first (even if it's just you) on the
                      teams page for this competition in order to make
                      submissions
                    </p>
                  </Modal>
                </>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* Markdown renderer */}
        <div className="markdown">
          {/* Hardcoded for now, figure out where this md is coming from later */}
          <Remark>{meta.description}</Remark>
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
