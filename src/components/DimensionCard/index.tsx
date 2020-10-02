import React from 'react';

import './index.less';
import { DimensionType } from 'dimensions-ai';
import { Link } from 'react-router-dom';

const DimensionCard = (props: {dimension: DimensionType}) => {
  return (
    <div className="DimensionCard">
      <Link to={'/dimensions/' + props.dimension.id}><h2 className='title'>{props.dimension.name}</h2></Link>
      <p className='meta'>Design: {props.dimension.design.name}</p>
      <p className='meta'>Tournaments: {Object.entries(props.dimension.tournaments).length}</p>
      {/* <p className='matches'>Matches: {props.dimension.matches.size}</p> */}
    </div>
  )
}

export default DimensionCard;
