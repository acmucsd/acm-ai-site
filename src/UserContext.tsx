import React from 'react'
import { nanoid } from 'dimensions-ai';

export interface User {
  loggedIn: boolean,
  username: string,
  id: nanoid,
  admin: boolean
}

// set UserContext and add type
const UserContext = React.createContext({} as {user: User, setUser: (user: User) => any});

export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer
export default UserContext
