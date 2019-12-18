import { useMutation, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { NextPage } from 'next'
import { useState } from 'react'
import Layout from '../components/Layout'

const POSTS_PER_PAGE = 10

interface IProps {}

const Index: NextPage<IProps> = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')

  const [createLink, { data, error, loading }] = useMutation(CREATE_LINK, {
    variables: { title, description, url },
    update: (proxy, mutationResult) => {
      const { links } = proxy.readQuery({
        query: GET_LINKS,
        variables: { first: 10, skip: 0 },
      })

      const newLink = mutationResult.data.createLink

      proxy.writeQuery({
        query: GET_LINKS,
        variables: { first: 10, skip: 0 },
        data: {
          links: [newLink, ...links],
        },
      })
    },
  })

  const handleSubmit = async e => {
    e.preventDefault()
    if (title === '' || url === '' || description === '') {
      return false
    }

    await createLink()

    e.target.elements.title.value = ''
    e.target.elements.description.value = ''
    e.target.elements.url.value = ''
  }

  return (
    <Layout>
      <h1>Podwave</h1>

      <form onSubmit={handleSubmit}>
        <h1>Submit</h1>

        <input placeholder='title' name='title' onChange={e => setTitle(e.target.value)} />

        <input
          placeholder='description'
          name='description'
          onChange={e => setDescription(e.target.value)}
        />

        <input placeholder='url' name='url' onChange={e => setUrl(e.target.value)} />

        <button type='submit'>Submit</button>
      </form>

      <LinksList />
    </Layout>
  )
}

const LinksList: React.FC = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_LINKS, {
    variables: { skip: 0, first: POSTS_PER_PAGE },
    notifyOnNetworkStatusChange: true,
  })

  if (data && data.links) {
    return (
      <div>
        <ul data-testid='postListList'>
          {data.links.map((post, index) => (
            <li key={post.id}>
              <div>
                <code>{index + 1}. </code>
                <a href={post.url}>{post.title}</a>
                <p id={post.id} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return <div>Loading...</div>
}

export default Index

const GET_LINKS = gql`
  query links($search: String, $first: Int!, $skip: Int!) {
    links(search: $search, first: $first, skip: $skip) {
      id
      title
      description
      url
      updatedAt
    }
  }
`
const CREATE_LINK = gql`
  mutation createLink($title: String!, $description: String!, $url: String!) {
    createLink(title: $title, description: $description, url: $url) {
      link {
        id
        title
        description
        url
        createdAt
      }
    }
  }
`
