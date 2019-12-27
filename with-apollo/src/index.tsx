// import { BrowserRouter as Router } from 'react-router-dom'
// import { HelmetProvider, Helmet } from 'react-helmet-async'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
// import { AuthProvider } from './context/Auth/AuthContext'
// import { UserProvider } from './context/Auth/UserContext'
import { translationMessages } from './context/Language/i18n'
import { LanguageProvider } from './context/Language/LanguageContext'
import { ThemeProvider } from './context/Theme/ThemeContext'

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/',
  fetchOptions: {
    credentials: 'include',
  },
  request: operation => {
    const token = localStorage.getItem('authToken') || ''
    operation.setContext({
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
  },
  clientState: {
    defaults: {
      isLoggedIn: !!localStorage.getItem('authToken'),
    },
  },
})

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <LanguageProvider messages={translationMessages}>
        <ThemeProvider>
          {/* <AuthProvider>
            <UserProvider> */}
              <App />
            {/* </UserProvider>
          </AuthProvider> */}
        </ThemeProvider>
      </LanguageProvider>
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
)

/*
<HelmetProvider>
    <Helmet>
        <meta name="description" content="" />
    </Helmet>
    <App />
</HelmetProvider>
*/
