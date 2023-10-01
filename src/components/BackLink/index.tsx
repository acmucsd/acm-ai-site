import React from 'react';
import { Button } from 'antd';
import './index.less';
import { Link } from 'react-router-dom';
import path from 'path';
const BackLink = (props: { to?: string }) => {
  let link = path.join(window.location.pathname, props.to ? props.to : '../');
  if (link[link.length - 1] === '/') {
    link = link.slice(0, link.length - 1);
  }
  return (
    <div className="BackLink">
      <Link to={link}>
        <Button>Back</Button>
      </Link>
    </div>
  );
};

export default BackLink;
