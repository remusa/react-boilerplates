import { gql } from 'apollo-boost'

export const IS_LOGGED_IN_QUERY = gql`
  query {
    isLoggedIn @client
  }
`

export const ME_QUERY = gql`
  query {
    me {
      id
      username
      email
    }
  }
`

export const ME_QUERY_CACHE = gql`
  query($id: Int!) {
    UserType(id: id) {
      id
      username
      email
    }
  }
`
