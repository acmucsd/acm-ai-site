import React from 'react';
import { Button } from 'antd';
import { stopTournament, runTournament } from '../../actions/dimensions/tournament';
import './index.less';
import { TournamentMeta } from '../../contexts/tournament';
const TournamentActionButton = (props: {tournament: TournamentMeta, dimensionID: string, update?: Function}) => {

  let btns;
  let update = props.update ? props.update : () => {};
  switch (props.tournament.status) {
    case 'initialized': // Uninitialized
      btns = <Button onClick={() => {runTournament(props.dimensionID, props.tournament.id).then(() => {update()});}}>Run</Button>
      break;
    case 'running': // Ready
      btns = <Button onClick={() => {stopTournament(props.dimensionID, props.tournament.id).then(() => {update()});}}>Stop</Button>
      break;
    case 'stopped': // Running
      btns = <Button onClick={() => {runTournament(props.dimensionID, props.tournament.id).then(() => {update()});}}>Run</Button>
      break;
    case 'crashed': // Error
      btns = 'Error';
      break;
    default:
      btns = 'Error';
  }
  return (
    <div className='TournamentActionButton'>
      {btns}
    </div>
  )
}

export default TournamentActionButton
