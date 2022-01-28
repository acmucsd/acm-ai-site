import React from 'react';
import { Route } from 'react-router-dom';
import Energium2020Page from '../../pages/Competitions/Energium2020Page';
import TournamentRankingsPageHistorical from '../../pages/TournamentRankingsPageHistorical';
export const EnergiumRoutes = () => {
  // const Setupfall2020Tourney = (component: JSX.Element) => {
  //   return <SetupTournament type="general" component={component} dimensionID='acmdim' tournamentID='tourney' tryAndLogin={false}/>
  // }
  return (
    <>
      <Route
        path="/old-competitions/energium"
        exact
        render={() => <Energium2020Page />}
      />
      <Route
        path="/old-competitions/energium/ranks"
        exact
        render={() => <TournamentRankingsPageHistorical dataDir="2020fall" />}
      />
      {/* 
  no longer running competition so we turn this off
  <Route 
    path="/competitions/energium/user/:userID" 
    exact 
    render={() => Setupfall2020Tourney(<ProfilePage competitionKey='energium' />)}
  />
  <Route 
    path="/competitions/energium/match/:matchID" 
    exact 
    render={() => Setupfall2020Tourney(<TournamentMatchPage />)}
  />
  <Route path="/competitions/energium/upload" exact 
    render={() => Setupfall2020Tourney(<UploadBotPage competitionKey='energium' />)}
  /> */}
    </>
  );
};
