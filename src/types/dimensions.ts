export type Tournament = {
  status: string;
  name: string;
};
export type Match = {
  matchStatus: string;
  creationDate: string;
  results: any;
  id: string;
  name: string;
  agents: Array<Agent>;
  timeStep: number;
};
export type Player = {
  id: string;
};
export type Agent = {
  src: string;
  creationDate: string;
  id: number;
  status: string;
  logkey: string | null;
  name: string;
  tournamentID: {
    id: string;
  };
};
export type AgentStatus = string;
export type DUser = {
  playerID: string;
  statistics: any;
  username: string;
};
