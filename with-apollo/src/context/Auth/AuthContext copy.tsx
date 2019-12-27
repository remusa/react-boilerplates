import { useMutation, useQuery } from '@apollo/react-hooks'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { LOGIN_MUTATION, REGISTER_MUTATION } from '../../gql/Mutations'
import { IS_LOGGED_IN_QUERY, ME_QUERY } from '../../gql/Queries'

interface IContext {
  isLoggedIn: boolean
  user: any
  login: (email: string, password: string) => any
  register: (email: string, username: string, password: string) => void
  logout: () => void
  setLoggedIn: () => React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext({} as IContext)

interface Props {
  children: ReactNode
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const {
    data: { isLoggedIn },
    client,
  } = useQuery(IS_LOGGED_IN_QUERY)
  const { data, refetch } = useQuery(ME_QUERY, { fetchPolicy: 'cache-and-network' })
  // const { data, refetch } = useQuery(ME_QUERY, { fetchPolicy: 'cache-first' })
  const [tokenAuth, { error: loadingError }] = useMutation(LOGIN_MUTATION)
  const [createUser] = useMutation(REGISTER_MUTATION)

  const [user, setUser] = useState(data ? data.me : null)
  const [loggedIn, setLoggedIn] = useState<boolean>(!!isLoggedIn)

  console.log('data', data)
  console.log('isLoggedIn', isLoggedIn)
  console.log('user 1', user)

  useEffect(() => {
    if (data) {
      console.log('data 2', data)
      setUser(data.me)
    }
  }, [isLoggedIn, loggedIn, data])

  // useEffect(() => {
  //   if (data === null || data === undefined) {
  //     refetch()
  //     console.log('refetching', data)
  //   }

  //   if (data) {
  //     setUser(data.me)
  //     console.log('user 2', user)
  //   }
  // }, [isLoggedIn, loggedIn])

  const login = async (username: string, password: string) => {
    const res = await tokenAuth({ variables: { username, password } })
    if (res) {
      localStorage.setItem('authToken', res.data.tokenAuth.token)
      client.writeData({ data: { isLoggedIn: true } })
      setLoggedIn(true)
    }
  }

  const register = async (email: string, username: string, password: string) => {
    const res = await createUser({ variables: { email, username, password } })
    if (res) {
      setLoggedIn(true)
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    client.writeData({ data: { isLoggedIn: false, me: null } })
    // client.resetStore()
  }

  // if (weAreStillWaitingToGetTheUserData) {
  //   return <FullPageSpinner />
  // }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }

