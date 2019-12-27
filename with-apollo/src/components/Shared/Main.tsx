import React from 'react'
import styled from 'styled-components'

const MainStyles = styled.div`
  grid-area: main;
  height: 100%;
`

interface Props {
  children: any
}

const Main: React.FC<Props> = ({ children }) => {
  return <MainStyles>{children}</MainStyles>
}

export default Main
