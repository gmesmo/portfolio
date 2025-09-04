import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      light: '#ff9440',
      main: '#d3670e',
      dark: '#a44a00',
      contrastText: '#fff'
    },
    secondary: {
      light: '#c74cc0',
      main: '#91248b',
      dark: '#5e0059',
      contrastText: '#fff'
    },
    text: {
      primary: '#fff',
      secondary: '#979797',
      disabled: '#999999'
    },
    action: {
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)'
    },
    divider: '#e0e0e0'
  }
})

export default theme
