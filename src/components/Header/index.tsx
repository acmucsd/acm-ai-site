import React, {useState, useContext, useEffect} from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Menu, message } from 'antd';
import './index.less';
import UserContext from '../../UserContext';
import { logoutUser } from '../../actions/auth';
import { defaultUser, DIMENSION_ID, TOURNAMENT_ID } from '../../configs';

function Header() {
  const { user, setUser } = useContext(UserContext);
  let path = window.location.pathname;
  let initKeys: Array<string> = [];
  if (path.match(`/tournaments/${TOURNAMENT_ID}/ranks`)) {
    initKeys=['leaderboard'];
  }
  else if (path.match(`/tournaments`)) {
    initKeys=['tournament'];
  }
  else if (path.match(`/home`)) {
    initKeys=['home'];
  }
  if (path.match(`user`)) {
    initKeys=['profile'];
  }
  if (path.match(`login`)) {
    initKeys=['login'];
  }
  if (path.match(`register`)) {
    initKeys=['register'];
  }
  const [key, setKey] = useState<Array<string>>(initKeys);
  const params: any = useParams();
  const handleClick = (e: any) => {
    setKey(e.key);
  };

  const [loginItems, setLoginItems] = useState<any>();
  const history = useHistory();
  const renderLoginItems = () => {
    if (user.loggedIn) {
      setLoginItems(
        [<Menu.Item key="logout" onClick={() => {
          logoutUser();
          setUser(defaultUser);
          message.success("Logged out");
          history.push("/");
        }}>
          Logout
        </Menu.Item>,
        <Menu.Item key='profile'>
          <Link to={`/tournaments/${TOURNAMENT_ID}/user/${user.id}`} rel="noopener noreferrer">
            Profile
          </Link>
        </Menu.Item>
        ]
      )
    }
    else {
      setLoginItems(
        [<Menu.Item key="login">
          <Link to={`/login`} rel="noopener noreferrer">
            Login
          </Link>
        </Menu.Item>,
        <Menu.Item key="register">
          <Link to={`/register`} rel="noopener noreferrer">
            Register
          </Link>
        </Menu.Item>]
      );
    }
  }
  useEffect(() => {
    renderLoginItems();
  }, [user]);

  return (
    <Menu onClick={handleClick} selectedKeys={key} mode="horizontal" className="Header">
      <Menu.Item className="logo">
        {/* <Link to="/"><img src={logo} /></Link> */}
      </Menu.Item>
      <Menu.Item key="home">
        <Link to="/" rel="noopener noreferrer">
          Home
        </Link>
      </Menu.Item>
      {/* <Menu.Item key="tournament">
        <Link to={`/tournaments/${TOURNAMENT_ID}`} rel="noopener noreferrer">
          Tournament
        </Link>
      </Menu.Item> */}
      {/* <Menu.Item key="leaderboard">
        <Link to={`/tournaments/${TOURNAMENT_ID}/ranks`} rel="noopener noreferrer">
          Leaderboard
        </Link>
      </Menu.Item> */}
      <Menu.Item key="leaderboard">
        <Link to={`/history/hide-and-seek2020`} rel="noopener noreferrer">
          Hide and Seek 2020 Results
        </Link>
      </Menu.Item> 
      { 
        loginItems
      }
      <Menu.Item className="empty">
      </Menu.Item>
    </Menu>
  );
}

export default Header;
