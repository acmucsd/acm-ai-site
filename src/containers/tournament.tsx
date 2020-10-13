/**
 * Adds tournament and dimension to context
 */

import React, { useContext, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom";
import TournamentContext from '../contexts/tournament';
import { getTournamentFromDimension } from '../actions/dimensions';
import { message } from "antd";
import { DIMENSION_ID } from "../configs";


export type SetupTournamentProps = {
  dimensionID: string,
  tournamentID: string,
  component: JSX.Element,
}
/**
 * Auto stores tournament into context 
 */
function SetupTournament({dimensionID, tournamentID, component}: SetupTournamentProps) {
  const history = useHistory();
  const { tournament, setTournament } = useContext(TournamentContext);
  useEffect(() => {
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
  }, []);
  return (
    <div>
      { component }
    </div>
  )
}

export default SetupTournament 