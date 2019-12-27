import { useQuery } from '@apollo/react-hooks'
import 'normalize.css'
import React from 'react'
import './bulma.min.css'
import AuthenticatedApp from './components/AuthenticatedApp'
import UnauthenticatedApp from './components/UnauthenticatedApp'
import { IS_LOGGED_IN_QUERY } from './gql/Queries'
import './index.scss'

// const AuthenticatedApp = React.lazy(() => import('./components/AuthenticatedApp'))
// const UnauthenticatedApp = React.lazy(() => import('./components/UnauthenticatedApp'))

const App: React.FC = () => {
  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN_QUERY)

  return isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default App
