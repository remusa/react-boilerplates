import red from '@material-ui/core/colors/red'
import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4c566a',
      main: '#3b4252',
      dark: '#2e3440',
      contrastText: '#434c5e',
    },
    secondary: {
      main: '#3b4252',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#2e3440',
    },
  },
})

export default theme
