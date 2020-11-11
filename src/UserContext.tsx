import React from 'react'

export type COMPETITION_NAMES = 'energium' | 'openai'
export interface User {
  loggedIn: boolean,
  username: string,
  id: string,
  admin: boolean,
  competitionRegistrations: {
    [x in COMPETITION_NAMES]: boolean | undefined
  }
  competitionData: {
    [x in COMPETITION_NAMES]: {
      id: string,
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
