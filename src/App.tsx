import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { UserProvider } from './UserContext'
import { TournamentProvider } from './contexts/tournament';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import SetupTournament from './containers/tournament';

import './styles/index.less';
import ReactGA from 'react-ga';
import MainPage from './pages/MainPage';

import MatchPage from './pages/MatchPage';
import TournamentRankingsPage from './pages/TournamentRankingsPage';
import TournamentPage from './pages/TournamentPage';
import TournamentRankingsPageHistorical from './pages/TournamentRankingsPageHistorical';
import TournamentMatchPage from './pages/TournamentMatchPage';
import RegisterPage from './pages/Auth/RegisterPage';
import LoginPage from './pages/Auth/LoginPage';
import UploadBotPage from './pages/UploadBotPage';
import ProfilePage from './pages/ProfilePage';

import { getCookie } from './utils/cookie';
import { verifyToken, getUserFromToken } from './actions/auth';
import { DIMENSION_ID, COOKIE_NAME, defaultUser, defaultTournament } from './configs';
import { message } from 'antd';
import HideAndSeek2020 from './components/HistoricalCompetitionDescriptions/HideAndSeek2020';


let cookie = getCookie(COOKIE_NAME);
function App() {

  const [user, setUser] = useState(defaultUser);
  const [tournament, setTournament] = useState(defaultTournament);
  const [verifying, setVerifying] =  useState(true);
  function usePageViews() {
    let location = useLocation()
    ReactGA.initialize('UA-167602471-1');
    useEffect(() => {
      console.log(location.pathname);
      ReactGA.pageview(location.pathname);
    }, [location]);
  }
  const antIcon = <LoadingOutlined style={{ fontSize: '2rem' }} spin />;
  
  useEffect(() => {
    if (cookie) {
      // verify cookie
      verifyToken(DIMENSION_ID, cookie).then(() => {
        let u = getUserFromToken(cookie);
        setUser(u);
        message.success("Welcome back " + u.username);
      }).catch(() => {
        
      }).finally(() => {
        setVerifying(false);
      })
    }
    else {
      setVerifying(false);
    }
  }, []);
  usePageViews();
  return (
    <div>
      <Switch>
      {!verifying ?
        <UserProvider value={{user: user, setUser: setUser}}>
          
          <Route path="/" exact component={MainPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/login" exact component={LoginPage} />
          {/* <Route path="/dimensions/:id/matches/:matchID" exact component={MatchPage} / */}
          <Route exact path="/history/hide-and-seek2020" component={() => {
            return <TournamentRankingsPageHistorical dataDir="2020summer" description={HideAndSeek2020}/>
          }} />
          <TournamentProvider value={{tournament: tournament, setTournament: setTournament}}>
            {/* <Route 
              path="/tournaments/:tournamentID" 
              exact 
              render={() => <SetupTournament component={<TournamentPage />} />}
            /> */}
            <Route 
              path="/tournaments/:tournamentID/ranks" 
              exact 
              render={() => <SetupTournament component={<TournamentRankingsPage />} />}
            />
            <Route 
              path="/tournaments/:tournamentID/user/:userID" 
              exact 
              render={() => <SetupTournament component={<ProfilePage />} />}
            />
            <Route 
              path="/tournaments/:tournamentID/match/:matchID" 
              exact 
              render={() => <SetupTournament component={<TournamentMatchPage />} />}
            />
            <Route path="/tournaments/:tournamentID/upload" exact 
              render={() => <SetupTournament component={<UploadBotPage />} />}
            />
          </TournamentProvider>
        </UserProvider> :
        <div className='Loading' style={{
          textAlign: 'center',
          fontSize: '2rem',
          height: '100vh',
          lineHeight: '100vh'
        }}>Loading <Spin indicator={antIcon} /></div>
      }
      </Switch>
    </div>
  );
}

export default App;
