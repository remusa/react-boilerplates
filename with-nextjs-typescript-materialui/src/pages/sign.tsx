import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import SourceLink from '../components/SourceLink'
import Link from '../components/Link'
import Copyright from '../components/Copyright'

export default function Sign() {
  return (
    <Container maxWidth='sm'>
      <Box my={4}>
        <Typography variant='h4' component='h1' gutterBottom>
          Login
        </Typography>
        <Link href='/about' color='primary'>
          Go to the about page
        </Link>
        <SourceLink />
        <Copyright />
      </Box>
    </Container>
  )
}
