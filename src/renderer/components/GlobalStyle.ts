import { createGlobalStyle } from 'styled-components'
import { colors } from '@/constants'

export const GlobalStyle = createGlobalStyle`
  html {
    font-family: monospace;
    -webkit-app-region: drag;
    background: rgba(0, 0, 0, 0);
    height: 100%;
    overflow: hidden;
  }
  body {
    color: ${colors.textColor};
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0
  }
  #root {
    height: 100%;
    width: 100%;
  }
`
