import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import Copyright from '../components/Copyright'
import Link from '../components/Link'
import SourceLink from '../components/SourceLink'

export default function App() {
  return (
    <Container maxWidth='sm'>
      <Box my={4}>
        <Typography variant='h4' component='h1' gutterBottom>
          Next.js with TypeScript, Material UI, and Jest template
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
