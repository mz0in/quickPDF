import { Box, Text, useMantineColorScheme } from '@mantine/core'
import { IconSquareRoundedPlus } from '../icons'
import { useNavigate } from 'react-router-dom'

interface AddButtonProps {
  url: string
  height?: string
}

interface PdfCompanyCardProps {
  logo: string
  id: string
}

interface PaperCardProps {
  url: string
  date: number
  month: string
}

interface LayoutCardProps {
  url: string
  name: string
}

/**
 * Button to add a new item.
 * @param {string} url - The URL to navigate when the button is clicked.
 * @param {string} height - The height of the button (optional).
 * @returns {JSX.Element} The AddButton component.
 */
export function AddButton({ url, height = '110px' }: AddButtonProps): JSX.Element {
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        backgroundColor: dark ? '#25262B' : '#f1f1f1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '110px',
        height: height,
        border: 'none',
        filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))',
        cursor: 'pointer'
      }}
      component="button"
      onClick={(): void => navigate(url)}
    >
      <IconSquareRoundedPlus />
    </Box>
  )
}

/**
 * Card component for displaying a PDF company.
 * @param {string} logo - The URL of the company's logo.
 * @param {string} id - The ID of the company.
 * @returns {JSX.Element} The PdfCompanyCard component.
 */
export function PdfCompanyCard({ logo, id }: PdfCompanyCardProps): JSX.Element {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        backgroundColor: '#f1f1f1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '110px',
        height: '110px',
        borderRadius: '5px',
        border: 'none',
        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
        backgroundImage: `url("${logo}")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'pointer'
      }}
      component="button"
      onClick={(): void => navigate(`/company/${id}`)}
    ></Box>
  )
}

/**
 * Card component for displaying a paper.
 * @param {string} url - The URL to navigate when the card is clicked.
 * @param {number} date - The date to be displayed on the card.
 * @param {string} month - The month to be displayed on the card.
 * @returns {JSX.Element} The PaperCard component.
 */
export function PaperCard({ url, date, month }: PaperCardProps): JSX.Element {
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        backgroundColor: dark ? '#25262B' : '#f1f1f1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '110px',
        height: '150px',
        border: 'none',
        filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))',
        cursor: 'pointer'
      }}
      component="button"
      onClick={(): void => navigate(url)}
    >
      <Text
        variant="gradient"
        gradient={
          dark ? { from: 'white', to: '#f1f1f1', deg: 45 } : { from: 'indigo', to: 'cyan', deg: 45 }
        }
        sx={{ fontFamily: 'SF display, sans-serif' }}
        ta="center"
        fz="xl"
        fw={700}
      >
        {date}
      </Text>
      <Text fz="sm">{month}</Text>
    </Box>
  )
}

/**
 * Card component for displaying a layout.
 * @param {string} url - The URL to navigate when the card is clicked.
 * @param {string} name - The name of the layout to be displayed on the card.
 * @returns {JSX.Element} The LayoutCard component.
 */
export function LayoutCard({ url, name }: LayoutCardProps): JSX.Element {
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        backgroundColor: dark ? '#25262B' : '#f1f1f1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '110px',
        height: '150px',
        border: 'none',
        filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))',
        cursor: 'pointer'
      }}
      component="button"
      onClick={(): void => navigate(url)}
    >
      <Text fz="sm">{name}</Text>
    </Box>
  )
}
