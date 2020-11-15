import React from 'react';

export interface TournamentMeta {
  configs: any;
  id: string;
  competitors: Map<string, any>;
  log: any;
  name: string;
  status: string | null;
  dimID: string;
}
//return pick(t, 'competitors', 'configs', 'id', 'log', 'name', 'status');

// set UserContext and add type
const TournamentContext = React.createContext(
  {} as {
    tournament: TournamentMeta;
    setTournament: (t: TournamentMeta) => any;
  }
);

export const TournamentProvider = TournamentContext.Provider;
export const TournamentConsumer = TournamentContext.Consumer;
export default TournamentContext;
