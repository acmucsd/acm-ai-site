import React, { useContext } from 'react';
import MatchActionButton from '../MatchActionButton';
import './index.less';
import { Table } from 'antd';
import { Agent, Match as DMatch, nanoid } from 'dimensions-ai';
import { Link } from 'react-router-dom';
import UserContext from '../../UserContext';

const Match = (props: {match: DMatch, dimensionID: nanoid}) => {
  const { user } = useContext(UserContext);
  const columns = [
    {
      title: 'Agent Name',
      dataIndex: 'agentname',
      render: (agent: Agent) => <Link to={`${window.location.pathname}/agents/${agent.id}`}>{agent.name}</Link>,
    },
    {
      title: 'Creation Date',
      dataIndex: 'creationdate',
    },
    {
      title: 'Source',
      dataIndex:'src'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: Agent.Status) => <span>{status}</span>
    },
  ];
  const match = props.match;
  const id = props.dimensionID;
  return (
    <div className='Match'>
      <h2>{match.name}</h2>
      <h4 className='meta-data-title'>Metadata</h4>
      <p className='meta-data'>
        id: {match.id} <br />
        Creation Date: {match.creationDate} <br />
        Match Status: {match.matchStatus} <br />
        Time Step: {match.timeStep}
      </p>
      {user.admin && 
        <h4>Match Actions</h4>
      &&
        <MatchActionButton match={match} dimensionID={id}/>
      }
      <h4>Match Results:</h4>
      {match.results ? <a target='_blank' rel="noopener noreferrer" href={process.env.REACT_APP_API + `/api/dimensions/${id}/match/${match.id}/results`}>Results</a> : 'No results yet'}
      <h4>Agents / Players</h4>
      <Table className='agentTable'
        columns={columns}
        dataSource={match.agents.map((agent) => {
          return {
            src: agent.src,
            agentname: agent,
            creationdate: agent.creationDate,
            status: agent.status
          }
        })}
      />
    </div> 
  )
}

export default Match
