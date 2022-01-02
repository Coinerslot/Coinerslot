import React from 'react'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from '@material-ui/styles'
import { QueryClient, QueryClientProvider } from 'react-query'
import theme from './theme'
import AppRouter from './navigations'
const queryClient = new QueryClient()

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </ThemeProvider>
    </RecoilRoot>
  )
}
export default App
