import { MantineProvider, ColorSchemeProvider, ColorScheme, MantineThemeOverride } from '@mantine/core';
import App from './App'
import { Notifications } from '@mantine/notifications'
import { useLocalStorage } from '@mantine/hooks';


export default function MainComponent() {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
        getInitialValueInEffect: true,
      });

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

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
        // primaryColor: 'brand',
        primaryColor: colorScheme === 'dark' ? 'gray' : 'brand',
        colorScheme
    }
    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
                <Notifications />
                <App />
            </MantineProvider>
        </ColorSchemeProvider>
    )
}
