import React from 'react'
import { Tournament, nanoid } from 'dimensions-ai';

export interface TournamentMeta {
  configs: Partial<Tournament.TournamentConfigsBase>,
  id: nanoid,
  competitors: Map<string, any>
  log: any,
  name: string,
  status: Tournament.Status | null
}
//return pick(t, 'competitors', 'configs', 'id', 'log', 'name', 'status');

// set UserContext and add type
const TournamentContext = React.createContext({} as {tournament: TournamentMeta, setTournament: (t: TournamentMeta) => any});

export const TournamentProvider = TournamentContext.Provider
export const TournamentConsumer = TournamentContext.Consumer
export default TournamentContext
