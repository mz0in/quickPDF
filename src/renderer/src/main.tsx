import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider, MantineThemeOverride } from '@mantine/core'
import App from './App'
import { Notifications } from '@mantine/notifications'

const theme: MantineThemeOverride = {
  colors: {
    brand: [
      '#0C0404',
      '#1B1B1B',
      '#1A1110',
      '#0C090A',
      '#242124',
      '#100C08',
      '#040200',
      '#080806',
      '#0B0B0B',
      '#000000'
    ]
  },
  primaryColor: 'brand'
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Notifications />
      <App />
    </MantineProvider>
  </React.StrictMode>
)
