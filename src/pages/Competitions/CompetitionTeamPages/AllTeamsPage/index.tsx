import React, { useEffect, useState, useContext } from 'react';
import DefaultLayout from '../../../../components/layouts/default';
import './index.less';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, Input, Button, message } from 'antd';
import {
  getTeamInfo,
  createTeam,
  getCompetitionUser,
} from '../../../../actions/teams/utils';
import UserContext from '../../../../UserContext';
import BackLink from '../../../../components/BackLink';
import * as path from 'path';
// Block for each team
const Team = (team: any) => {
  return (
    <div className="teamBlock">
      {/* Note: change to Link to={team.teamName} if the routing doesn't work; idk why this happens*/}
      <Link to={path.join('teams/', team.teamName)}>
        <h3>
          <span className="subheader">{team.teamName}</span>
        </h3>
        <p className="teamBlockSection">
          <span className="teamBlockHeader">Best Score</span>{' '}
          <span>{team.bestScore}</span>
        </p>
        <p className="teamBlockSection">
          <span className="teamBlockHeader">Members</span>{' '}
          <span className="teamMembers">{team.teamMembers.join(', ')}</span>
        </p>
        <p className="teamBlockSection">
          <span className="teamBlockHeader">About</span>
          <span>{team.teamDescription}</span>
        </p>
      </Link>
    </div>
  );
};

const CompetitionAllTeamsPage = () => {
  const { user } = useContext(UserContext);
  const [isRegistered, setIsRegistered] = useState<any>(false);
  const [team, setTeam] = useState<any>(null);
  let { competitionName } = useParams<{ competitionName: string }>();

  const { handleSubmit } = useForm();
  const [teamName, setTeamName] = useState<string>('');

  const onSubmit = () => {
    createTeam(competitionName, user.username as string, teamName).then(
      (res) => {
        message.success(`Created team ${teamName}`);
        getTeamInfo(competitionName, teamName).then((res) => {
          setTeam(res.data);
        });
      }
    );
  };

  useEffect(() => {
    if (user.loggedIn) {
      getCompetitionUser(competitionName, user.username).then((res) => {
        setIsRegistered(res.data.registered);
        if (res.data.competitionTeam) {
          getTeamInfo(competitionName, res.data.competitionTeam.teamName).then(
            (res) => {
              setTeam(res.data);
            }
          );
        }
      });
    }
  }, [user, competitionName]);

  return (
    <DefaultLayout>
      <div className="AllTeamsPage">
        <br />
        <BackLink to="../" />
        {isRegistered ? (
          <div>
            {!team && (
              <div className="main-section">
                <h2 className="statement">Create a team</h2>
                <h4>
                  <strong>
                    You can only do this once! Choose a wise name.
                  </strong>
                </h4>
                <div className="teamBlock teamCreateForm">
                  <Form>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Input
                        size="large"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        style={{ margin: '2rem 0' }}
                        placeholder="Team Name"
                      />
                      <Button htmlType="submit" className="submit-btn">
                        Submit
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            )}
            {team && (
              <>
                <h2>Your Team</h2>
                {Team(team)}
              </>
            )}
          </div>
        ) : (
          <p className="errorMessage">
            You must be registered in this competition AND logged in to this
            site to view this page.
          </p>
        )}
      </div>
    </DefaultLayout>
  );
};
export default CompetitionAllTeamsPage;
