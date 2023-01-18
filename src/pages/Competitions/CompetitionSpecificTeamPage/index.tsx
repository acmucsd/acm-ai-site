import React, { useEffect, useRef, useState } from 'react';
import DefaultLayout from '../../../components/layouts/default';
import Card from '../../../components/Card';
import { Form, Input, message, Button } from 'antd';
import './index.less';
import { Table, Modal } from 'antd';

const CompetitionUserTeamPage = () => {
  const [isInTeam, setIsInTeam] = useState(true);

  const teamMemberCols = [
    {
      title: 'Team Members',
      // dataIndex: 'u',
    }
  ];

  return (
    <DefaultLayout>
      <div className="CompetitionTeamPage">
        {isInTeam ? (
          <div className="myTeam">
            <h3>My Team</h3>

            <div className="myTeamSection teamName">
              <p>Team Name</p>
              <Form className="teamNameForm">
                <Input type="text" placeholder="Name" name="teamNameInput" className="teamNameInput"/>
                <Button htmlType="submit" className="saveTeamNameButton">
                  Save
                </Button>
              </Form>
            </div>
          
            <div className="myTeamSection">
              {/* <p>Team Members</p> */}
              <Table columns={teamMemberCols}/>
            </div>

            <div className="myTeamSection">
              <p>Invite people to your team using this link!</p>
              <p>insert link</p>
            </div>
            
            <Button className="leaveTeamButton">
              Leave Team
            </Button>
            
          </div>
        ) : (
          <div>
            <h3>Teams</h3>
            <Button>
              Create Team
            </Button>
            <Button>
              Join Team
            </Button>
          </div>
        )}
      </div>
    </DefaultLayout>
  )
}
export default CompetitionUserTeamPage;
