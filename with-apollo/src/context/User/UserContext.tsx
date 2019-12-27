import { useQuery } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-boost'
import React, { createContext, ReactNode, useContext } from 'react'
import { ME_QUERY } from '../../gql/Queries'

interface IContext {
  currentUser: any
  logout: () => void
}

const UserContext = createContext({} as IContext)

interface Props {
  children: ReactNode
}

const UserProvider: React.FC<Props> = ({ children }) => {
  const { data, loading, error, client } = useQuery(ME_QUERY, {
    fetchPolicy: 'cache-and-network',
  })

  const logout = () => {
    localStorage.removeItem('authToken')
    client.writeData({
      data: { isLoggedIn: false },
    })
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>
  const currentUser = data.me

  return (
    <UserContext.Provider
      value={{
        currentUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

const useUser = () => useContext(UserContext)

export { UserProvider, useUser }
