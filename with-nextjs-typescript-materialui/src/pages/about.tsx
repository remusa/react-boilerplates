import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import Copyright from '../components/Copyright'
import Link from '../components/Link'

export default function App() {
  return (
    <Container maxWidth='sm'>
      <Box my={4}>
        <Typography variant='h4' component='h1' gutterBottom>
          About page
        </Typography>
        <Link href='/'>Go to the main page</Link>
        <p>About me</p>
        <Copyright />
      </Box>
    </Container>
  )
}
