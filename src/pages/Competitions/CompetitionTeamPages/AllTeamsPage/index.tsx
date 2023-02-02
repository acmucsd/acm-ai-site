import React, { useEffect, useState, useContext } from 'react';
import DefaultLayout from '../../../../components/layouts/default';
import './index.less';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form' 
import { Form, Input, Button, message } from 'antd'
import { getRegisteredState, getTeams, createTeam } from '../../../../actions/teams/utils';
import UserContext from '../../../../UserContext';

// Block for each team
const Team = (team: any) => {
  return (
    <div className='teamBlock'>
      {/* Note: change to Link to={team.teamName} if the routing doesn't work; idk why this happens*/}
      <Link to={'teams/' + team.teamName}>
        <h3><span className='subheader'>{team.teamName}</span></h3>
        <p className="teamBlockSection"><span className="teamBlockHeader">Best Score</span> <span>{team.bestScore}</span></p>
        <p className="teamBlockSection"><span className="teamBlockHeader">Members</span> <span className="teamMembers">{team.teamMembers.join(", ")}</span></p>
        <p className="teamBlockSection"><span className="teamBlockHeader">About</span><span>{team.teamDescription}</span></p>
      </Link>
    </div>
  )
}

const CompetitionAllTeamsPage = () => {

  const { user } = useContext(UserContext);
  const [isRegistered, setIsRegistered] = useState<any>(false);
  const [teams, setTeams] = useState<any>([]);
  let { competitionName } = useParams<{ competitionName: string }>();
  const { handleSubmit } = useForm();
  const [teamName, setTeamName] = useState<string>('')
  
  const onSubmit = () => {
    createTeam(competitionName, user.username as string, teamName)
      .then((res) => message.success(`Created team ${teamName}`))
  }
  
  useEffect(() => {
    if (user.loggedIn) {
      getRegisteredState(competitionName, user.username).then((res) => {
        setIsRegistered(res.data.registered);
      })
    }
    
    getTeams(competitionName).then((res) => {
      setTeams(res.data);
    });
  }, []);

  return (
    <DefaultLayout>
      <div className='AllTeamsPage'>
        <div className="hero">
          <h1 id="title">{competitionName}</h1>
        </div>
        {isRegistered ? (
          <div>
            <div className='main-section'>
              <h2 className='statement'>Teams</h2>
              {teams.map((team: any) => {
                return (Team(team));
              })}
              <br></br>
              <h2 className='statement'>Create a team</h2>
              <div className='teamBlock teamCreateForm'>
              <Form>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    size='large'
                    value={teamName}
                    onChange={e => setTeamName(e.target.value)}
                    style={{margin: '2rem 0'}} placeholder="Team Name"
                  />
                  <Button htmlType="submit" className="submit-btn">
                    Submit
                  </Button>
                </form>
              </Form>
              </div>
            </div>
          </div>
        ):(
          <p className='errorMessage'>You must be logged in and registered in this competition to view this page.</p>
        )}
      </div>
    </DefaultLayout>
  )
}
export default CompetitionAllTeamsPage;
