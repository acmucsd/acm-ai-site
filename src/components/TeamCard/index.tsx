import { Modal, Col, Button, Form, Input, message } from "antd";
import { useState } from "react";
import { User } from "../../UserContext";
import { addToTeam, leaveTeam } from '../../actions/teams/utils';
import './index.less';
import React from "react";
import { useForm } from "react-hook-form";
import { error } from "console";


const TeamCard = ({ team, user, compUser, fetchTeamCallback }: { team: any, user:User, compUser: any, fetchTeamCallback: () => void })    => {
    // Modal state to trigger a team's details
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [code, setCode] = useState<string>("");
    const [confirmLoading, setConfirmLoading] = useState(false);

 
    const onSubmit = () => {
        setConfirmLoading(true);

        console.log("Comp user", compUser)
        if(compUser.competitionTeam !== null) {
            if(compUser.competitionTeam.teamName !== team.teamName) {
                message.info("Cannot join another team if you're already in one")
                setConfirmLoading(false);
                return;
            }
        }

        addToTeam(team.competitionName, user.username, team.teamName, code).then(
          () => {
            message.success('Joined team!');
            setConfirmLoading(false);
            setIsModalOpen(false);

            // trigger a refresh to refetch all the team data
            fetchTeamCallback();
          }
        )
        .catch((error) => {
            console.log(error);
        });
        setConfirmLoading(false);

    };

    const onLeaveTeam = () => {
        leaveTeam(team.competitionName, user.username, team.teamName).then( (res) => {
            message.success(res.data.msg);
            setIsModalOpen(false);

            fetchTeamCallback();
        })
        .catch((error) => (
            message.error(error)
        ));
    }



    // Modal props
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
 
 
     return (
         <>
             <Modal
                 className="teamDetailsModal"
                 width={800}
                 centered
                 open={isModalOpen}
                 onCancel={handleCancel}
                 title={<h3 style={{ fontWeight: '700' }}>{team.teamName}</h3>}
                 footer = {

                    <>
                        {team.teamMembers.includes(user.username) && (
                            <Button  loading = {confirmLoading} size="large" shape="round" type="primary" onClick = {onLeaveTeam}>
                                <p>leave</p>
                            </Button>
                        )}

                        {!team.teamMembers.includes(user.username) && (
                            <>

                                <Input
                                    id = "joinCodeInput"
                                    size = "large"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="Code"
                                />
                             
                            
                                <Button id = "teamJoinButton" size= "large" type = "primary" loading = {confirmLoading} onClick = {onSubmit} >
                                    Join
                                </Button>
                            </>
                        )}

                    </>    
                }
             >
                 <Col id = "teamModalContent">
 
                     <section id = "teamMembersContainer">
                         {team.teamMembers.map((member: string, index: number) => (
                             <p key={index}>{member}</p>
                         ))} 
                     </section>

        
                     
                 </Col>
             </Modal>
 
             {/* If user is in not in team, show option to join team */}
             <div id = {team.teamID} className = "teamPreviewCard">
                 <h3><b>{team.teamName}</b></h3>
                 <span>
                     <p>{team.teamMembers.length} members</p>
                     {team.teamMembers.includes(user.username) && (<p>your team</p>)}
                 </span>
         
                 {/** Clicking the button should open a modal to display team details and the option to join if user isn't part of team yet */}
                 <Button id = "teamViewButton" size="large" shape="round" onClick={() => showModal()}>
                     <p>View</p>
                 </Button>
             </div>
         </>
 
     );
 };
 
 export default TeamCard;
