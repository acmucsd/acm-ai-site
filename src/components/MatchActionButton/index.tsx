import React from 'react';
import { runMatch, stopMatch, removeMatch, resumeMatch } from '../../actions/match';
import { Button } from 'antd';
import { Match, nanoid } from 'dimensions-ai';
import './index.less';
const MatchActionButton = (props:{match: Match, dimensionID: nanoid, update?: Function}) => {

  let btns;
  let update = props.update ? props.update : () => {};
  const removeAction = () => {
    removeMatch(props.dimensionID, props.match.id).then(() => {update()});
  };
  switch (props.match.matchStatus) {
    case 'uninitialized': // Uninitialized
      btns = <Button loading={true}>Run</Button>
      break;
    case 'ready': // Ready
      btns = <Button onClick={() => {runMatch(props.dimensionID, props.match.id).then(() => {update()});}}>Run</Button>
      break;
    case 'running': // Running
      btns = <Button onClick={() => {stopMatch(props.dimensionID, props.match.id).then(() => {update()});}}>Stop</Button>
      break;
    case 'stopped': // Stopped
      btns = <Button onClick={() => {resumeMatch(props.dimensionID, props.match.id).then(() => {update()});}}>Resume</Button>
      break;
    case 'finished': // Finished
      btns = [
        <Button key='f-1' onClick={() => {removeAction()}}>Remove</Button>
      ]
      break;
    case 'error': // Error
      btns = [
        <Button key='err-1' 
          onClick={() => {removeAction()}}
        >
          Remove
        </Button>
      ]
      break;
    default:
      btns = 'Error';
  }
  return (
    <div className='MatchActionButtons'>
      {btns}
    </div>
  )
}

export default MatchActionButton
