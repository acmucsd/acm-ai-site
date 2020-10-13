import React from 'react';
import { Route} from 'react-router-dom';
import TournamentRankingsPage from '../../pages/TournamentRankingsPage';
import TournamentPage from '../../pages/TournamentPage';
import UploadBotPage from '../../pages/UploadBotPage';
import ProfilePage from '../../pages/ProfilePage';
import SetupTournament from '../../containers/tournament';
import TournamentMatchPage from '../../pages/TournamentMatchPage';
import Energium2020Page from '../../pages/Competitions/Energium2020Page';
export const EnergiumRoutes = () => {
  const Setupfall2020Tourney = (component: JSX.Element) => {
    return <SetupTournament component={component} dimensionID='acmdim' tournamentID='tourney' />
  }
  return <>
  <Route 
              path="/competitions/energium" 
              exact 
              render={() => Setupfall2020Tourney(<Energium2020Page />)}
            />
            <Route 
              path="/competitions/energium/ranks" 
              exact 
              render={() => Setupfall2020Tourney(<TournamentRankingsPage />)}
            />
            <Route 
              path="/competitions/energium/user/:userID" 
              exact 
              render={() => Setupfall2020Tourney(<ProfilePage />)}
            />
            <Route 
              path="/competitions/energium/match/:matchID" 
              exact 
              render={() => Setupfall2020Tourney(<TournamentMatchPage />)}
            />
            <Route path="/competitions/energium/upload" exact 
              render={() => Setupfall2020Tourney(<UploadBotPage />)}
            /></>
}