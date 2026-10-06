import React, { useState, useEffect } from 'react';
import {
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import { UserProvider } from './UserContext';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './styles/index.less';
import MainPage from './pages/MainPage';

import TournamentRankingsPageHistorical from './pages/TournamentRankingsPageHistorical';
import RegisterPage from './pages/Auth/RegisterPage';
import LoginPage from './pages/Auth/LoginPage';

import { getCookie } from './utils/cookie';
import { verifyToken, getUserFromToken } from './actions/auth';
import {
  COOKIE_NAME,
  defaultUser,
} from './configs';
import { message } from 'antd';
import CompetitionsPage from './pages/CompetitionsPage';
import AboutPage from './pages/AboutPage';
import AlumniPage from './pages/AlumniPage';
import EventsPage from './pages/EventsPage';
import ForgotPasswordPage from './pages/Auth/ForgotPassword';
import requestreset from './pages/Auth/RequestReset';

import HideAndSeek2020 from './components/HistoricalCompetitionDescriptions/HideAndSeek2020';
import HideAndSeek2020Page from './pages/Competitions/HideAndSeek2020Page';
import Energium2020Page from './pages/Competitions/Energium2020Page';
import NNRanksPage from './pages/Competitions/NNRankPage';

import CompetitionLandingPage from './pages/Competitions/CompetitionLandingPage';
import CompetitionUploadPage from './pages/Competitions/CompetitionUploadPage';
import CompetitionLeaderboardPage from './pages/Competitions/CompetitionLeaderboardPage';
import CompetitionPortalPage from './pages/Competitions/CompetitionPortalPage';
import NotFoundPage from './pages/404Page';

import ProjectPage from './pages/ProjectsPage/index';
import SubmissionLogPage from './pages/Competitions/CompetitionPortalPage/SubmissionLogPage';
import ProfilePage from './pages/ProfilePage';
import AdminPortalPage from './pages/AdminPortalPage';

let cookie = getCookie(COOKIE_NAME);

function ScrollToTop() {
  const history = useHistory();
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return null;
}

function App() {
  const [user, setUser] = useState(defaultUser);
  const [verifying, setVerifying] = useState(true);
  const antIcon = <LoadingOutlined style={{ fontSize: '2rem' }} spin />;

  useEffect(() => {
    if (cookie) {
      // verify cookie
      verifyToken(cookie)
        .then(() => {
          let u = getUserFromToken(cookie);
          setUser(u);
          message.success('Welcome back ' + u.username);
        })
        .catch(() => {})
        .finally(() => {
          setVerifying(false);
        });
    } else {
      setVerifying(false);
    }
  }, []);

  return (
      <div>
        <ScrollToTop />
          {!verifying ? (
            <UserProvider value={{ user: user, setUser: setUser }}>
              <Switch>
              <Route path="/" exact component={MainPage} />
              <Route path="/about" exact component={AboutPage} />
              <Route path="/competitions" exact component={CompetitionsPage} />
              <Route path="/alumni" exact component={AlumniPage} />
              <Route path="/projects" exact component={ProjectPage} />
              <Route
                path="/old-competitions/hide-and-seek2020"
                exact
                component={HideAndSeek2020Page}
              />
              <Route path="/events" exact component={EventsPage} />
              
              {/* new competition format */}
              <Route
                path="/portal"
                exact
                component={CompetitionPortalPage}
              />  

              <Route
                path="/:competitionName/submissionLog/:id"
                exact
                component={SubmissionLogPage}
              />  

              <Route
                path="/competitions/:id"
                exact
                component={CompetitionLandingPage}
              />
              <Route
                path="/competitions/:id/leaderboard"
                exact
                component={CompetitionLeaderboardPage}
              />
              <Route
                path="/competitions/:id/upload"
                exact
                component={CompetitionUploadPage}
              />

              {/* accounts */}
              <Route path="/login" exact component={LoginPage} />
              <Route path="/register" exact component={RegisterPage} />
              <Route path="/profile" exact component={ProfilePage} />
              <Route path="/requestreset" component={requestreset} /> 
              <Route path="/resetpassword" component={ForgotPasswordPage} />
              <Route path="/admin/portal" exact component={AdminPortalPage} />

              {/* old competitions */}
              <Route  path="/old-competitions/hideandseek" exact component={HideAndSeek2020Page} />
              <Route
                path="/old-competitions/hideandseek/ranks"
                exact component={() => {
                  return (
                    <TournamentRankingsPageHistorical
                      dataDir="2020summer"
                      description={HideAndSeek2020}
                    />
                  );
                }}
              />
              <Route path="/old-competitions/nn" exact component={NNRanksPage} />
              {/* <Route path="/competitions/nn/upload" exact component={nnUpload} /> */}
              
              <Route
                path="/old-competitions/energium"
                exact component={Energium2020Page}
              />
              <Route
                path="/old-competitions/energium/ranks"
                exact
                component={() => <TournamentRankingsPageHistorical dataDir="2020fall" />}
              />

              <Route path="*" component={NotFoundPage} />
              </Switch>
              
            </UserProvider>
          ) : (
            <div
              className="Loading"
              style={{
                textAlign: 'center',
                fontSize: '2rem',
                height: '100vh',
                lineHeight: '100vh',
              }}
            >
              Loading <Spin indicator={antIcon} />
            </div>
          )} 
      </div>
  );
}

export default App;
