import { ThemeProvider } from '@mui/material'
import Desktop from './components/Desktop'

import './variables.scss'
import theme from './theme'

function App() {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Desktop />
      </ThemeProvider>
    </div>
  )
}

export default App
