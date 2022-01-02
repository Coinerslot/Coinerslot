import { createTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

const coinerslotPrimary = '#000'
const coinerslotSecondary = '#004BEB'

const theme = createTheme({
  typography: {
    fontFamily: ['Mulish', 'serif'].join(','),
  },
  palette: {
    primary: {
      main: coinerslotPrimary,
    },
    secondary: {
      main: coinerslotSecondary,
    },
    error: {
      main: red[500],
    },
    background: {
      default: '#D1D1D1',
    },
    navbar: {
      primary: '#0393cc',
    },
    text: {
      primary: '#000',
    },
    h1: {
      primary: coinerslotPrimary,
    },
    footer: {
      main: '#182846',
    },
  },
})

export default theme
