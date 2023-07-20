import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  MantineThemeOverride
} from '@mantine/core'
import App from './App'
import { Notifications } from '@mantine/notifications'
import { useLocalStorage } from '@mantine/hooks'

// Define the possible color schemes
type PossibleColorSchemes = 'light' | 'dark'

export default function MainComponent(): JSX.Element {
  // Use local storage to store and retrieve the selected color scheme
  const [colorScheme, setColorScheme] = useLocalStorage<PossibleColorSchemes>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true
  })

  // Function to toggle between light and dark color schemes
  const toggleColorScheme = (value?: ColorScheme): void =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  // Customize the theme based on the selected color scheme
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
    primaryColor: colorScheme === 'dark' ? 'gray' : 'brand',
    colorScheme
  }

  return (
    // Wrap the app with ColorSchemeProvider to handle color scheme changes
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      {/* Apply the custom theme using MantineProvider */}
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        {/* Show notifications within the app */}
        <Notifications />
        {/* Render the main application */}
        <App />
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
