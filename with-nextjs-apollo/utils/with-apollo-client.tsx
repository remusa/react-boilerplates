import { getDataFromTree } from '@apollo/react-ssr'
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost'
import Head from 'next/head'
import * as React from 'react'
import initApollo from './init-apollo'

const withApollo = (App: any) => {
  return class Apollo extends React.Component {
    apolloClient: ApolloClient<NormalizedCacheObject>

    static displayName = 'withApollo(App)'

    static async getInitialProps(ctx: any) {
      const { Component, router } = ctx

      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx)
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo()
      if (typeof window === 'undefined') {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App {...appProps} Component={Component} router={router} apolloClient={apollo} />
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error)
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract()

      return { ...appProps, apolloState }
    }

    constructor(props: any) {
      super(props)
      this.apolloClient = initApollo(props.apolloState)
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />
    }
  }
}

export default withApollo
