import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Menu, message } from 'antd';
import './index.less';
import UserContext from '../../UserContext';
import { logoutUser } from '../../actions/auth';
import { defaultUser } from '../../configs';

function Header() {
  const { user, setUser } = useContext(UserContext);
  let path = window.location.pathname;
  let initKeys: Array<string> = [];
  if (path.match(`/home`)) {
    initKeys = ['home'];
  }
  if (path.match(`user`)) {
    initKeys = ['profile'];
  }
  if (path.match(`login`)) {
    initKeys = ['login'];
  }
  if (path.match(`register`)) {
    initKeys = ['register'];
  }
  if (path.match(`/competitions`)) {
    initKeys = ['competitions'];
  }
  if (path.match(`/about`)) {
    initKeys = ['about'];
  }
  if (path.match(`/alumni`)) {
    initKeys = ['alumni'];
  }
  if (path.match(`/events`)) {
    initKeys = ['events'];
  }

  const [key, setKey] = useState<Array<string>>(initKeys);
  const handleClick = (e: any) => {
    setKey(e.key);
  };

  const [loginItems, setLoginItems] = useState<any>();
  const history = useHistory();
  useEffect(() => {
    if (user.loggedIn) {
      setLoginItems([
        <Menu.Item
          key="logout"
          onClick={() => {
            logoutUser();
            setUser(defaultUser);
            message.success('Logged out');
            history.push('/');
          }}
        >
          Logout
        </Menu.Item>,
      ]);
    } else {
      setLoginItems([
        <Menu.Item key="register">
          <Link to={`/register`} rel="noopener noreferrer">
            Register
          </Link>
        </Menu.Item>,
        <Menu.Item key="login">
          <Link to={`/login`} rel="noopener noreferrer">
            Login
          </Link>
        </Menu.Item>,
      ]);
    }
  }, [history, setUser, user]);

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={key}
      mode="horizontal"
      className="Header"
    >
      <Menu.Item className="logo">
        {/* <Link to="/"><img src={logo} /></Link> */}
      </Menu.Item>
      <Menu.Item key="home">
        <Link to="/" rel="noopener noreferrer">
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key="about">
        <Link to="/about" rel="noopener noreferrer">
          About
        </Link>
      </Menu.Item>
      <Menu.Item key="events">
        <Link to="/events" rel="noopener noreferrer">
          Events
        </Link>
      </Menu.Item>
      <Menu.Item key="competitions">
        <Link to="/competitions" rel="noopener noreferrer">
          Competitions
        </Link>
      </Menu.Item>
      <Menu.Item key="projects">
        <Link to="/projects" rel="noopener noreferrer">
          Projects
        </Link>
      </Menu.Item>
      {/* <Menu.Item key="alumni">
        <Link to="/alumni" rel="noopener noreferrer">
          Alumni
        </Link>
      </Menu.Item> */}
      {loginItems}
      <Menu.Item className="empty"></Menu.Item>
    </Menu>
  );
}

export default Header;
