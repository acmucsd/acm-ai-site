import { Modal, Col, Button, Form, Input, message, Badge, Avatar } from "antd";
import { useState } from "react";
import { User } from "../../UserContext";
import { addToTeam, leaveTeam } from '../../actions/teams/utils';
import { BsPeopleFill } from "react-icons/bs";
import { IoMdPerson } from "react-icons/io";

import './index.less';
import React from "react";

import { useForm } from "react-hook-form";
import { error } from "console";
import { genColor } from "../../utils/colors";
import { FaEllipsisV } from "react-icons/fa";


const TeamCard = (
    { team, user, compUser, fetchTeamCallback, updateRankings }: 
    { team: any, user:User, compUser: any, fetchTeamCallback: () => void, updateRankings: () => void }
)    => {
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

            // update the leaderboard with the new team
            // updateRankings();
          }
        )
        .catch((error) => {
            console.log(error);
        });
        setConfirmLoading(false);

    };

    const onLeaveTeam = () => {
        leaveTeam(team.competitionName, user.username, team.teamName).then( (res) => {
            message.success('Successfully left team.');
            setIsModalOpen(false);

            fetchTeamCallback();
            // updateRankings();
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

    const color1 = genColor(team.teamName);
    const color2 = genColor(`${team.teamName}_additional_seed`);

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
                        
                        {team.teamMembers.length !== 0 ? 
                            team.teamMembers.map((member: string, index: number) => (
                                <p key={index}>{member}</p>
                            ))
                        
                        : <p>no members</p>}          
                     </section>
                 </Col>
             </Modal>
 
             {/* If user is in not in team, show option to join team */}
             <div id = {team.teamID} className = "teamPreviewCard" style = {{ background: team.teamMembers.includes(user.username) ? '#f0f0f0': 'white'}}  onClick={() => showModal()}>
                 <span>
                    <div 
                        style={{
                            display: 'inline-flex',
                            verticalAlign: 'middle',
                            borderRadius: '100px',
                            width: '40px',
                            height:'40px',
                            background: `linear-gradient(30deg, ${color1}, ${color2})`,
                            marginRight: '1rem',
                        }}>
                    </div>

                    <div>
                        <h4>{team.teamName}</h4>
                        <p style = {{color: "grey", fontSize: "14px"}}>{team.teamMembers.length} members</p>
                    </div>
                    
                 </span>

                 {/** Clicking the button should open a modal to display team details and the option to join if user isn't part of team yet */}
                 <span id = "teamViewButtonSpan" >
                    <Button type = "text" ghost id = "teamViewButton" onClick={() => showModal()}><p>view</p></Button>
                 </span>
             </div>
         </>
 
     );
 };
 
 export default TeamCard;
