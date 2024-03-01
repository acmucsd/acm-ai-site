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

/**
 * Modular component that displays a team's data. This is used in the 
 * competitions portal page in the 'Find Teams' tab and provides 
 * functionality to view the team members, join the team via a modal, 
 * and the ability to leave the team. 
 * 
 * @param {object} team     the current team the user is viewing
 * @param {object} user     schema that holds the user's data 
 * @param {object} compUser schema that holds user's competition profile data
 * @param {object} compUser schema that holds user's competition profile data
 * @param fetchTeamCallback callback function to update the team data and the competition user 
 * 
 * @ignore updateRankings REMOVE this function as it is no longer called
 */
const TeamCard = (
    { team, user, compUser, fetchTeamCallback, updateRankings }: 
    { team: any, user:User, compUser: any, fetchTeamCallback: () => void, updateRankings: () => void }
)    => {

    // Modal state to trigger a team's details
    const [isModalOpen, setIsModalOpen] = useState(false);

    // User input when prompted for a join code
    const [code, setCode] = useState<string>("");

    // Loading status for join and leave buttons
    const [confirmLoading, setConfirmLoading] = useState(false);

    /*
     * Handler that checks if the user join code is valid 
     * to join a team. If so, the function invokes a callback
     * to update the team data for the portal dashboard and 
     * the competition user data with a success message. Otherwise, 
     * it throws an error message.
     * 
     */
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

            // Trigger a refresh to refetch all the team data and update the compUser
            fetchTeamCallback();
          }
        )
        .catch((error) => {
            console.log(error);
            message.error("An error occurred: ", error);
        });
        setConfirmLoading(false);
    };

    /*
     * Handler that removes the user from a specific team.
     * Invokes the callback to update the the team data and 
     * competition user data
     * 
     */
    const onLeaveTeam = () => {
        leaveTeam(team.competitionName, user.username, team.teamName).then( (res) => {
            message.success('Successfully left team.');
            setIsModalOpen(false);
            fetchTeamCallback();
        })
        .catch((error) => (
            message.error(error)
        ));
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Generate colors for team avatar
    const color1 = genColor(team.teamName);
    const color2 = genColor(`${team.teamName}_additional_seed`);

     return (
         <>
             {/* Modal to view the team members and UI to join or leave team */}
             <Modal
                 className="teamDetailsModal"
                 width={800}
                 centered
                 open={isModalOpen}
                 onCancel={handleCancel}
                 title={<h3 style={{ fontWeight: '700' }}>{team.teamName}</h3>}

                 // Dynamically display join leave/join buttons based on user team membership status
                 footer = {
                    <>
                        {team.teamMembers.includes(user.username) && (
                            <Button  
                                loading = {confirmLoading} 
                                size="large" 
                                shape="round" 
                                type="primary" 
                                onClick = {onLeaveTeam}
                            >
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
                                <Button 
                                    id = "teamJoinButton" 
                                    size= "large" 
                                    type = "primary" 
                                    loading = {confirmLoading} 
                                    onClick = {onSubmit}
                                >
                                    Join
                                </Button>
                            </>
                        )}
                    </>    
                }
             >
                 <Col id = "teamModalContent">
                     <section id = "teamMembersContainer">

                        {/* Display team member names */}
                        {team.teamMembers.length !== 0 ? 
                            team.teamMembers.map((member: string, index: number) => (
                                <p key={index}>{member}</p>
                            ))
                        : <p>no members</p>}          
                     </section>
                 </Col>
             </Modal>
 


             {/* If user is in not in team, make card white otherwise make it grey*/}
             <div 
                id = {team.teamID} 
                className = "teamPreviewCard" 
                style = {{ background: team.teamMembers.includes(user.username) ? '#f0f0f0': 'white'}}  
                onClick={() => showModal()}
            >
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

                 {/* Clicking the button should open a modal to display team details 
                   * and the option to join if user isn't part of team yet */}
                 <span id = "teamViewButtonSpan" >
                    <Button 
                        type = "text" 
                        ghost 
                        id = "teamViewButton" 
                        onClick={() => showModal()}
                    >
                        <p>view</p>
                    </Button>
                 </span>
             </div>
         </>
     );
 };
 
 export default TeamCard;
