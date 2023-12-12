import { createGlobalStyle } from 'styled-components'
import { PancakeTheme } from '@pancakeswap/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};
    --colors-primary:#5CE1E6 !important;
    --colors-backgroundAlt:#0D0023 !important;
    --colors-secondary:#5CE1E6 !important;
    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
