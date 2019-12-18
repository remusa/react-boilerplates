import { ApolloClient, NormalizedCacheObject } from 'apollo-boost'
import App from 'next/app'
import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import AppProviders from '../context/AppProviders'
import withApolloClient from '../utils/with-apollo-client'

interface AppProps {
  apolloClient: ApolloClient<NormalizedCacheObject>
}

class MyApp extends App<AppProps> {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const { Component, pageProps, apolloClient } = this.props

    return (
      <ApolloProvider client={apolloClient}>
        <AppProviders>
          <Component {...pageProps} />
        </AppProviders>
      </ApolloProvider>
    )
  }
}

export default withApolloClient(MyApp)
