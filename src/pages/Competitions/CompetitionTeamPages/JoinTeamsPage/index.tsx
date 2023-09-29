import React, { useEffect, useState, useContext } from 'react';
import './index.less';
import DefaultLayout from '../../../../components/layouts/default';
import { Form, Button, message, Input } from 'antd';
import { useForm } from 'react-hook-form';
// import Card from '../../../components/Card';
import { useHistory, useParams } from 'react-router-dom';
import { addToTeam } from '../../../../actions/teams/utils';
import UserContext from '../../../../UserContext';
import path from 'path';
import BackLink from '../../../../components/BackLink';
// import CheckableTagList from '../../../components/CheckableTagList

const JoinTeamsPage = () => {
  // const tags = ['feather weight', 'middle weight', 'heavy weight']
  // const [tagsChecked, setTagsChecked] = useState<boolean[]>(Array(tags.length).fill(false))

  const [code, setCode] = useState<string>('');
  const [teamName, setTeamName] = useState<string>('');

  const { handleSubmit } = useForm();
  const { user } = useContext(UserContext);
  const history = useHistory();
  let { competitionName } = useParams<{
    competitionName: string;
  }>();

  useEffect(() => {
    if (!user.loggedIn) {
      message.info('You need to login to join a team');
      history.replace(path.join(window.location.pathname, '../../../login'));
    }
  }, []);

  const onSubmit = () => {
    addToTeam(competitionName, user.username as string, teamName, code).then(
      (res) => {
        console.log('Joined team!');
        message.success('Joined team!');
      }
    );
  };

  return (
    <DefaultLayout>
      <div className="CompetitionUploadPage">
        <br />
        <BackLink to="../" />
        {/* <Card className="upload-form-card"> */}
        <h2>Join a Team</h2>
        <p>Enter a team's name and join code</p>
        <br />
        <Form>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-wrapper">
              <Input
                value={teamName}
                onChange={(evt) => setTeamName(evt.target.value)}
                placeholder="Team Name"
              />
              <br />
              <br />
              <Input
                value={code}
                onChange={(evt) => setCode(evt.target.value)}
                placeholder="Code"
              />
            </div>
            <Button htmlType="submit" className="submit-button">
              Join
            </Button>
          </form>
        </Form>
        {/* </Card> */}
      </div>
    </DefaultLayout>
  );
};

export default JoinTeamsPage;
