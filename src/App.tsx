import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { UserProvider } from './UserContext'
import { TournamentProvider } from './contexts/tournament';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './styles/index.less';
import ReactGA from 'react-ga';
import MainPage from './pages/MainPage';

import TournamentRankingsPageHistorical from './pages/TournamentRankingsPageHistorical'
import RegisterPage from './pages/Auth/RegisterPage';
import LoginPage from './pages/Auth/LoginPage';

import { getCookie } from './utils/cookie';
import { verifyToken, getUserFromToken } from './actions/auth';
import { DIMENSION_ID, COOKIE_NAME, defaultUser, defaultTournament } from './configs';
import { message } from 'antd';
import HideAndSeek2020 from './components/HistoricalCompetitionDescriptions/HideAndSeek2020';
import CompetitionsPage from './pages/CompetitionsPage';
import HideAndSeek2020Page from './pages/Competitions/HideAndSeek2020Page';
import AboutPage from './pages/AboutPage';
import EventHasNotStartedPage from './pages/EventHasNotStarted';
import { EnergiumRoutes } from './components/CompetitionRoutes/Energium';
import ForgotPasswordPage from './pages/Auth/ForgotPassword'
import nnRanksPage from './pages/NNRankPage'
import nnScoreHistory from './components/ScoreHistoryChart'

// test
import nnsubmit from './pages/UploadNNPage'

let cookie = getCookie(COOKIE_NAME);
function App() {

  const [user, setUser] = useState(defaultUser);
  const [initializedGA, setGA] = useState(false);
  const [tournament, setTournament] = useState(defaultTournament);
  const [verifying, setVerifying] =  useState(true);
  const location = useLocation();
  const antIcon = <LoadingOutlined style={{ fontSize: '2rem' }} spin />;
  
  useEffect(() => {
    ReactGA.initialize('UA-167602471-1');
    setGA(true);
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
  useEffect(() => {
    if (initializedGA) {
      ReactGA.pageview(location.pathname);
    }
  }, [initializedGA, location]);
  
  return (
    <div>
      <Switch>
      {!verifying ?
        <UserProvider value={{user: user, setUser: setUser}}>

          {/* Test */}
          <Route path='/test' component={nnsubmit} />

          <Route path="/" exact component={MainPage} />
          <Route path="/about" exact component={AboutPage} />
          <Route path="/competitions" exact component={CompetitionsPage} />
          <Route path="/competitions/hide-and-seek2020" exact component={HideAndSeek2020Page} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/eventhasnotstarted" exact component={EventHasNotStartedPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/competitions/nn" exact component={nnRanksPage} />
          <Route path="/competitions/nn/scorehist" exact component={nnScoreHistory} />
          {/* <Route path="/dimensions/:id/matches/:matchID" exact component={MatchPage} / */}
          <Route exact path="/history/hide-and-seek2020" component={() => {
            return <TournamentRankingsPageHistorical dataDir="2020summer" description={HideAndSeek2020}/>
          }} />
          <TournamentProvider value={{tournament: tournament, setTournament: setTournament}}>
            <EnergiumRoutes />
          </TournamentProvider>
          <Route path="/resetpassword" component={ForgotPasswordPage}/>
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
