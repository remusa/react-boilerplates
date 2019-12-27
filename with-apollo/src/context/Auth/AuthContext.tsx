import React, { createContext, ReactNode, useContext } from 'react'

interface IContext {
  isLoggedIn?: any
  // user?: any
  login?: (email: string, password: string) => any
  register?: (email: string, username: string, password: string) => void
  logout?: () => void
}

const AuthContext = createContext({} as IContext)

interface Props {
  children: ReactNode
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  // const {
  //   data: { isLoggedIn },
  //   client,
  // } = useQuery(IS_LOGGED_IN_QUERY)
  // const { data, client } = useQuery(ME_QUERY, {
  //   fetchPolicy: 'cache-and-network',
  // })
  // const [tokenAuth, { error: loadingError }] = useMutation(LOGIN_MUTATION)
  // const [createUser] = useMutation(REGISTER_MUTATION)

  // const [user, setUser] = useState(data ? data.me : null)

  // console.log('data', data)
  // console.log('user 1', user)

  // useEffect(() => {
  //   if (data) {
  //     console.log('data 2', data)
  //     setUser(data.me)
  //   }
  // }, [ data])

  // const login = async (username: string, password: string) => {
  //   const res = await tokenAuth({
  //     variables: { username, password },
  //   })
  //   if (res) {
  //     localStorage.setItem('authToken', res.data.tokenAuth.token)
  //     client.writeData({
  //       data: { isLoggedIn: true },
  //     })
  //   }
  // }

  // const register = async (email: string, username: string, password: string) => {
  //   const res = await createUser({
  //     variables: {
  //       email,
  //       username,
  //       password,
  //     },
  //   })
  // }

  // const logout = () => {
  //   localStorage.removeItem('authToken')
  //   client.writeData({
  //     data: { isLoggedIn: false },
  //   })
  // }

  // if (weAreStillWaitingToGetTheUserData) {
  //   return <FullPageSpinner />
  // }

  return (
    <AuthContext.Provider
      value={{
        // isLoggedIn,
        // login,
        // register,
        // logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }

