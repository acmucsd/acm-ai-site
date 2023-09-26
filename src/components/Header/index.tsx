import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, message } from 'antd';
import './index.less';

import UserContext from '../../UserContext';
import { logoutUser } from '../../actions/auth';
import { defaultUser } from '../../configs';
import { Size, useWindowSize } from './useWindowSize';
import { HiOutlineMenu } from 'react-icons/hi';

function Header() {


  const { user, setUser } = useContext(UserContext);
  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/about", text: "About" },
    { to: "/events", text: "Events" },
    { to: "/competitions", text: "Competitions" },
    { to: "/projects", text: "Projects" },
  ]
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

  // const [key, setKey] = useState<Array<string>>(initKeys);
  // const handleClick = (e: any) => {
  //   setKey(e.key);
  // };

  const size: Size = useWindowSize();
  const [isMobile, setIsMobile] = useState<Boolean>(false);
  const [menuOpen, setMenuOpen] = useState<Boolean>(false);

  const [loginItems, setLoginItems] = useState<any>();
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
  }

  useEffect(() => {
    setIsMobile(size.width!! <= 960);
  }, [size])

  useEffect(() => {
    if (!isMobile){
      setMenuOpen(false);
    } 
  }, [isMobile]);


  return (
    <>
    <div className = "Header">

      <div className = "navBarWrapper">
        
      <div className = "logoWrapper">
        <Link to="/">
          <img src= "https://i.imgur.com/YqHEpJx.png" alt = "ACM AI Logo" style = {{height: "50px", width: "50px"}}/>
        </Link> 
      </div>


  
      {isMobile ? (
        // Mobile menu button
        <Button className = "menuButton" icon = {<HiOutlineMenu size = {35}/>} onClick = {() => toggleMenu()}/>
      ):
        // Desktop nav links 
        <div className = "navLinksWrapper">
          {navLinks.map((link, key) => (
            <Link className = "navItem" key = {key} to = {link.to}>
              <a >{link.text}</a>
            </Link>
          ))}

            {user.loggedIn ?
              (
                <Button 
                  size = "large"   
                  className = "authButton"
                  onClick={() => {
                  logoutUser();
                  setUser(defaultUser);
                  message.success('Logged out');
                  history.push('/')}}
                >Logout </Button>
              
              )
              :

              
              (<Link to="/login">
                <Button    
                  size = "large"
                  className = "authButton"
                  onClick={() => {
                  logoutUser();
                  setUser(defaultUser);
                  message.success('Logged out');
                  history.push('/')}}
                >Login </Button>
              </Link>
              )
            }


        </div>
      }
      </div>

      <div className = "navBarGradientLine"></div>

    </div>


    {/** Mobile dropdown nav links */}

      <div className = {`mobileDropDown ${menuOpen ? 'open': ''}`}>
        {navLinks.map((link, key) => (
          <Link  className = "mobileNavItem" key = {key} to = {link.to}>
            <a>{link.text}</a>
          </Link>
        ))}

        {user.loggedIn ? 
          (
            <div    
              className = "logOutOption"
              onClick={() => {
              logoutUser();
              setUser(defaultUser);
              message.success('Logged out');
              history.push('/')}}
              >
                <a>Logout</a>
              </div>
           ) 
           : 
          (<Link className="mobileNavItem" to="/login">
            <a>Login</a>
           </Link>)
        }

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
