import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { AuthProvider } from '../../context/Auth/AuthContext'
import Home from '../Shared/Home'
import Layout from '../Shared/Layout'
import Login from './Login'
import Register from './Register'

const UnauthenticatedApp: React.FC = () => (
  <AuthProvider>
    <Layout>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
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
  </AuthProvider>
)

export default UnauthenticatedApp
