import React, { createContext } from 'react'
import { createGlobalStyle, ThemeProvider as StyledProvider } from 'styled-components'
import useDarkMode from '../../hooks/useDarkMode'
import { darkTheme, lightTheme } from './theme'

// interface IDefaultProps {
//     theme: DefaultTheme
// }

// interface IGlobal {
//     theme: {
//         colorBackground: string
//         colorFont: string
//     }
// }

const GlobalStyle = createGlobalStyle`
    /* @import '~react-bulma-components/src/index.sass'; */
    @import url('https://fonts.googleapis.com/css?family=Lato&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

    html {
        box-sizing: border-box;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    body {
        align-items: center;
        height: 100vh;
        margin: 0;
        padding: 0;
        background-color: ${
          // @ts-ignore
          props => props.theme.colorBackground
        };
        color: ${
          // @ts-ignore
          props => props.theme.colorFont
        };
        font-family: 'Lato-Regular', 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        /* font-size: 2rem; */
        line-height: 2;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /* transition: color 0.3s ease-out, background 0.3s ease-out; */
        transition: all 0.3s linear;
    }

    body > * {
        color: ${
          // @ts-ignore
          props => props.theme.colorFont
        };
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: 'Montserrat', sans-serif;
        cursor: default;
    }

    button {
        outline: none;
        cursor: pointer;
    }

    a {
        text-decoration: none;
    }

    p {
        text-align: center;
    }
`

interface IContext {
  theme: string
  toggleTheme: () => void
}

const ThemeContext = createContext({} as IContext)

interface IProps {
  children: HTMLElement
}

const ThemeProvider: React.FC<IProps> = ({ children }) => {
  const [theme, toggleTheme, componentMounted] = useDarkMode()
  const currentTheme = theme === 'light' ? lightTheme : darkTheme

  if (!componentMounted) {
    return <div />
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledProvider theme={currentTheme}>
        <>
          <GlobalStyle />
          {children}
        </>
      </StyledProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider, GlobalStyle }
