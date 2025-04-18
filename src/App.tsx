import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { UserProvider } from './UserContext';
import { TournamentProvider } from './contexts/tournament';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './styles/index.less';
import ReactGA from 'react-ga';
import MainPage from './pages/MainPage';

import TournamentRankingsPageHistorical from './pages/TournamentRankingsPageHistorical';
import RegisterPage from './pages/Auth/RegisterPage';
import LoginPage from './pages/Auth/LoginPage';

import { getCookie } from './utils/cookie';
import { verifyToken, getUserFromToken } from './actions/auth';
import {
  DIMENSION_ID,
  COOKIE_NAME,
  defaultUser,
  defaultTournament,
} from './configs';
import { message } from 'antd';
import CompetitionsPage from './pages/CompetitionsPage';
import AboutPage from './pages/AboutPage';
import AlumniPage from './pages/AlumniPage';
import EventsPage from './pages/EventsPage';
import EventHasNotStartedPage from './pages/EventHasNotStarted';
import ForgotPasswordPage from './pages/Auth/ForgotPassword';
import requestreset from './pages/Auth/RequestReset';

import HideAndSeek2020 from './components/HistoricalCompetitionDescriptions/HideAndSeek2020';
import HideAndSeek2020Page from './pages/Competitions/HideAndSeek2020Page';
import Energium2020Page from './pages/Competitions/Energium2020Page';
import NNRanksPage from './pages/Competitions/NNRankPage';

import CompetitionLandingPage from './pages/Competitions/CompetitionLandingPage';
import CompetitionUploadPage from './pages/Competitions/CompetitionUploadPage';
import CompetitionSpecificTeamPage from './pages/Competitions/CompetitionTeamPages/SpecificTeamPage';
import CompetitionAllTeamsPage from './pages/Competitions/CompetitionTeamPages/AllTeamsPage';
import CompetitionLeaderboardPage from './pages/Competitions/CompetitionLeaderboardPage';
import CompetitionSubmissionDetailsPage from './pages/Competitions/CompetitionTeamPages/SubmissionDetailsPage';
import CompetitionPortalPage from './pages/Competitions/CompetitionPortalPage';
import NotFoundPage from './pages/404Page';

import ProjectPage from './pages/ProjectsPage/index';
import JoinTeamsPage from './pages/Competitions/CompetitionTeamPages/JoinTeamsPage';
import SubmissionLogPage from './pages/Competitions/CompetitionPortalPage/SubmissionLogPage';
import MatchesPage from './pages/Competitions/CompetitionPortalPage/MatchesPage';
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
  const [initializedGA, setGA] = useState(false);
  const [tournament, setTournament] = useState(defaultTournament);
  const [verifying, setVerifying] = useState(true);
  const location = useLocation();
  const antIcon = <LoadingOutlined style={{ fontSize: '2rem' }} spin />;

  useEffect(() => {
    ReactGA.initialize('UA-167602471-1');
    setGA(true);
    if (cookie) {
      // verify cookie
      verifyToken(DIMENSION_ID, cookie)
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
  useEffect(() => {
    if (initializedGA) {
      ReactGA.pageview(location.pathname);
    }
  }, [initializedGA, location]);

  return (
    <Router>
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
              <Route path="/eventhasnotstarted" exact component={EventHasNotStartedPage}/>
              
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
                path="/matches/:id"
                exact
                component={MatchesPage}
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
              <Route
                path="/competitions/:competitionName/teams"
                exact
                component={CompetitionAllTeamsPage}
              />
              <Route
                path="/competitions/:competitionName/teams/:teamName"
                exact
                component={CompetitionSpecificTeamPage}
              />
              <Route
                path="/competitions/:competitionName/teams/:teamName/submissions/:submissionId"
                exact
                component={CompetitionSubmissionDetailsPage}
              />
              <Route
                path="/competitions/:competitionName/add-to-team"
                exact
                component={JoinTeamsPage}
              />

              {/* accounts */}
              <Route path="/login" exact component={LoginPage} />
              <Route path="/register" exact component={RegisterPage} />
              <Route path="/profile" exact component={ProfilePage} />
              <Route path="/requestreset" component={requestreset} /> 
              <Route path="/resetpassword" component={ForgotPasswordPage} />
              <Route path="/admin/register" exact component={RegisterPage} />
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
    </Router>
  );
}

export default App;
