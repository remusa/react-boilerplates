import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { UserProvider } from '../../context/User/UserContext'
import Home from '../Shared/Home'
import Layout from '../Shared/Layout'

const AuthenticatedApp: React.FC = () => (
  <UserProvider>
    <Layout>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route
          path='/'
          render={() => (
            <div>
              <h1 data-testid='not-found'>404 Not Found</h1>
            </div>
          )}
        />
      </Switch>
    </Layout>
  </UserProvider>
)

export default AuthenticatedApp
