/**
 * Adds tournament and dimension to context
 */

import React, { useContext, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom";
import TournamentContext from '../contexts/tournament';
import { getTournamentFromDimension, getUser } from '../actions/dimensions/dimensions';
import { message } from "antd";
import UserContext from "../UserContext";
import { loginUser, verifyToken } from "../actions/dimensions/auth";
import { getCookie } from "../utils/cookie";
import { COMPETITIONS_COOKIE_NAME } from "../configs";


export type SetupTournamentProps = {
  dimensionID: string,
  tournamentID: string,
  component: JSX.Element,
  type: 'general' | 'openai'
}
/**
 * Auto stores tournament into context 
 */
function SetupTournament({dimensionID, tournamentID, component, type}: SetupTournamentProps) {
  const history = useHistory();
  if (!type) {
    type = 'general';
  }
  const { tournament, setTournament } = useContext(TournamentContext);
  const { user, setUser } = useContext(UserContext);
  let cookie = getCookie(COMPETITIONS_COOKIE_NAME.energium);
  useEffect(() => {
    
    if (type === 'general') {
      if (!dimensionID) {
        message.error('dimension ID not given');
        history.push('/');
        return;
      }
      else if (!tournamentID) {
        message.error('tournament ID not given');
        history.push('/');
        return;
      }
      if (tournament.id === '') {
        getTournamentFromDimension(dimensionID, tournamentID).then((res) => {
          setTournament({...res, dimID: dimensionID });
        }).catch((err) => {
          console.log(err)
          message.error('No tournament found with id ' + tournamentID);
          history.push('../../');
        });
      }
    }
  }, [tournamentID]);
  useEffect(() => {
    if (user.loggedIn) {
        getUser(dimensionID, user.username).then((dim_user) => {
          if (dim_user) {
            user.competitionRegistrations.energium = true;
            const newuser = {...user}
            newuser.competitionRegistrations.energium = true;
            newuser.competitionData.energium = {
              username: dim_user.username,
              id: dim_user.playerID as string,
              statistics: dim_user.statistics,
              admin: false,
            };
            setUser(newuser);
            // verify and store cookie
            if (cookie) {
              verifyToken(dimensionID, cookie).then(() => {
              
              }).catch(() => {
                loginUser(dimensionID, {
                  username: user.username,
                  // TODO: use whichever password user used
                  password: process.env.REACT_APP_BOT_PASSWORDS as string
                }).then(() => {
                });
              });
            } else {
              loginUser(dimensionID, {
                username: user.username,
                // TODO: use whichever password user used
                password: process.env.REACT_APP_BOT_PASSWORDS as string
              }).then(() => {
              });
            }
          } else {
            const newuser = {...user}
            newuser.competitionRegistrations.energium = false;
            setUser(newuser)
          }
          
        });
    }
  }, [user.competitionRegistrations.energium]);
  return (
    <div>
      { component }
    </div>
  )
}

export default SetupTournament 