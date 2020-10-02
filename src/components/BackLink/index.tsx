import React from 'react';
import { Button } from 'antd';
import './index.less';
import { Link } from 'react-router-dom';
import path from 'path';
const BackLink = (props: { to?: string }) => {
  const link = path.join(window.location.pathname, props.to ? props.to : '../');
  return (
    <div className="BackLink">
      <Link to={link}>
        <Button>Back</Button>
      </Link>
    </div>
  )
}

export default BackLink
