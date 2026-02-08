import React, { useEffect, useState, useContext } from 'react';
import { Remark } from 'react-remark';
import './index.less';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../../../components/layouts/default';
import { Link } from 'react-router-dom';
import { Button, Layout, Modal, message } from 'antd';
import { getMetaData } from '../../../actions/competition';
import { getCompetitionUser } from '../../../actions/teams/utils';
import { registerCompetitionUser } from '../../../actions/competition';
import UserContext from '../../../UserContext';
import competitionsData from '../../CompetitionsPage/competitionsData.json';
import { Competition } from '../../CompetitionsPage/competition';

const { Content } = Layout;

// import BackLink from '../../../components/BackLink';
// import path from 'path';
const CompetitionLandingPage = () => {
  /*
    Lines currently commented out will be added back in once backend is up again
    as deemed necessary
  */
  const competitions: Competition[] = competitionsData;
  const [meta, setMeta] = useState<{
    competitionName: string;
    description: string;
    startDate: string;
    endDate: string;
    submissionsEnabled: boolean;
    leaderboardEnabled: boolean;
    signup?: string | null;
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
        const apiMeta = res.data;
        const competition = competitions.find(
          (comp) => comp.competitionName === apiMeta.competitionName  
        );
        setMeta({
          competitionName: apiMeta.competitionName,
          description: apiMeta.description,
          startDate: apiMeta.startDate,
          endDate: apiMeta.endDate,
          submissionsEnabled: apiMeta.submissionsEnabled,
          leaderboardEnabled: Boolean(apiMeta.leaderboardEnabled),
          signup: competition?.signup || null,
        });
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
      <Content className="CompetitionLandingPage">
        {/* Some banner here with title and button */}
        <Content className="competitionHeader">
          <h1 className="title">
            {meta.competitionName.includes('.AI') ? (
              meta.competitionName.split('.AI').map((part, index, arr) => (
                <React.Fragment key={index}>
                  {part}
                  {index < arr.length - 1 && (
                    <>
                      <span>.</span>
                      <span className="text-colorful">AI</span>
                    </>)}
                </React.Fragment>
              ))
            ) : (
              meta.competitionName
            )}
          </h1>

          <p className="subtext">
            Start: {new Date(meta.startDate!).toLocaleString()}
          </p>
          <p className="subtext">
            End: {new Date(meta.endDate!).toLocaleString()}
          </p>

          <Content className="competitionButtons">
              {meta.signup && (
                  <a
                      href={meta.signup}
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                      <Button className="headerbtn">Sign Up</Button>
                  </a>
              )}
              
              {meta.leaderboardEnabled && (
                <Link to={`/competitions/${competitionID}/leaderboard`}>
                  <Button className="headerbtn">Leaderboard</Button>
                </Link>
              )}
              
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
          </Content>
        </Content>

        {/* Markdown renderer */}
        <Content className="competitionMarkdown">
          <Remark>{meta.description}</Remark>
        </Content>

      </Content>

    </DefaultLayout>
  );
};

export default CompetitionLandingPage;
