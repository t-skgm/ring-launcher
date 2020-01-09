import * as React from 'react'
import styled from 'styled-components'
import { GlobalStyle } from 'components/GlobalStyle'
import { Launcher } from 'components/organisms'

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0);
  flex-direction: column;
`

function App() {
  return (
    <Container>
      <GlobalStyle />
      <Launcher />
    </Container>
  )
}

export default App
