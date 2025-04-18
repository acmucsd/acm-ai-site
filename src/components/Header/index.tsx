import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, message, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import './index.less';

import UserContext from '../../UserContext';
import { logoutUser } from '../../actions/auth';
import { defaultUser } from '../../configs';
import { Size, useWindowSize } from './useWindowSize';
import { HiOutlineMenu } from 'react-icons/hi';

function Header() {
  const { user, setUser } = useContext(UserContext);
  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/about', text: 'About' },
    { to: '/events', text: 'Events' },
    { to: '/competitions', text: 'Competitions' },
    { to: '/projects', text: 'Projects' },
  ];
  let path = window.location.pathname;
  let initKeys: Array<string> = [];
  
  const handleMenuClick: MenuProps['onClick'] = (e) => {

    console.log('click', e);

    if(e.key === "3"){
      logoutUser();
      setUser(defaultUser);
      message.success('Logged out');
      history.push('/');
    }
  };
  
  const items: MenuProps['items'] = [
    {
      label: <Link to="/profile">Profile</Link>,
      key: '1',
    },
    {
      label: <Link to="/portal">Portal</Link>,
      key: '2',
    },
    {
      label: 'Logout',
      key: '3',
    }
  ];
  
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

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

  // const [key, setKey] = useState<Array<string>>(initKeys);
  // const handleClick = (e: any) => {
  //   setKey(e.key);
  // };

  const size: Size = useWindowSize();
  const [isMobile, setIsMobile] = useState<Boolean>(false);
  const [menuOpen, setMenuOpen] = useState<Boolean>(false);

  //const [loginItems, setLoginItems] = useState<any>();
  const history = useHistory();

  /*
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
  */

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setIsMobile(size.width!! <= 960);
  }, [size]);

  useEffect(() => {
    if (!isMobile) {
      setMenuOpen(false);
    }
  }, [isMobile]);

  return (
    <>
      <nav className="Header">
        <div className="navBarWrapper">
          <div className="logoContentWrapper">
            <Link to="/" className="AILogo">
              <img
                src="https://i.imgur.com/YqHEpJx.png"
                alt="ACM AI Logo"
                style={{ height: '60px', width: '60px' }}
              />
            </Link>
            <p>at UC San Diego</p>
          </div>

          {isMobile ? (
            // Mobile menu button
            <Button
              ghost
              className="menuButton"
              icon={<HiOutlineMenu size={35} style = {{color: "black"}} />}
              onClick={() => toggleMenu()}
            />
          ) : (
            // Desktop nav links
            <div className="navLinksWrapper">
              {navLinks.map((link, key) => (
                <Link className="navItem" key={key} to={link.to}>
                  <a href="#">{link.text}</a>
                </Link>
              ))}

              {user.loggedIn ? (
                <Dropdown
                  menu={menuProps}
                >
                  <Button>
                    <Space>
                      {user.username}
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              ) : (
                <Link to="/login">
                  <Button
                    size="large"
                    className="authButton"
                    onClick={() => {
                      logoutUser();
                      setUser(defaultUser);
                      history.push('/');
                    }}
                  >
                    <h4>Login</h4>
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* <div className="navBarGradientLine"></div> */}
      </nav>

      {/** Mobile dropdown nav links */}

      <div className={`mobileDropDown ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link, key) => (
          <Link className="mobileNavItem" key={key} to={link.to}>
            <a href="#">{link.text}</a>
          </Link>
        ))}
        

        {user.loggedIn ? (
          <>
          <Link className="mobileNavItem" to="/profile">
            <a href="#">Profile</a>
          </Link>
          <Link className="mobileNavItem" to="/portal">
            <a href="#">Portal</a>
          </Link>
          <div
            className="logOutOption"
            onClick={() => {
              logoutUser();
              setUser(defaultUser);
              message.success('Logged out');
              history.push('/');
            }}
          >
            <a href="#">Logout</a>
          </div>
          </>
        ) : (
          <Link className="mobileNavItem" to="/login">
            <a href="#">Login</a>
          </Link>
        )}
      </div>
    </>
  );
}
/* <Menu
onClick={handleClick}
selectedKeys={key}
mode="horizontal"
className="Header"
>
<Menu.Item className="logo">
  {/* <Link to="/"><img src={logo} /></Link> 
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
</Menu.Item>
{loginItems}
</Menu> */
export default Header;
