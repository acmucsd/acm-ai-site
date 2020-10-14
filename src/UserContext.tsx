import React from 'react'
import { nanoid } from 'dimensions-ai';

export type COMPETITION_NAMES = 'energium' | 'openai'
export interface User {
  loggedIn: boolean,
  username: string,
  id: nanoid,
  admin: boolean,
  competitionRegistrations: {
    [x in COMPETITION_NAMES]: boolean | undefined
  }
  competitionData: {
    [x in COMPETITION_NAMES]: {
      id: nanoid,
      admin: boolean
      username: string,
      statistics: any,
    } | undefined
  }
}

// set UserContext and add type
const UserContext = React.createContext({} as {user: User, setUser: (user: User) => any});

export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer
export default UserContext
