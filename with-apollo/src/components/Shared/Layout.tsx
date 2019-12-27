import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

const LayoutStyles = styled.div`
  height: 100vh;
  text-align: center;

  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: auto minmax(auto, 1fr) auto;
  grid-template-areas: 'header header header' '. main .' 'footer footer footer';

  @media all and (max-width: 500px) {
    grid-template-columns: auto minmax(auto, 1fr) auto;
    grid-template-areas:
      'header header header'
      '. main .'
      'footer footer footer';
  }
`

interface Props {
  children: any
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <LayoutStyles>
      <Header />

      <Main>{children}</Main>

      <Footer />
    </LayoutStyles>
  )
}

export default Layout
