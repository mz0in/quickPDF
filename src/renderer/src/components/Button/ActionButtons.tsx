import { Box, Text, useMantineColorScheme } from '@mantine/core'
import { IconSquareRoundedPlus } from '../icons'
import { useNavigate } from 'react-router-dom'

interface pdfCompneyCardProps {
  logo: string
  id: string
}

interface addButtonProps {
  url: string
  height?: string
}

interface paperProps {
  url: string
  height?: string
  date: number
  month: string
}

interface LayoutProps {
  url: string
  name: string
}

export function AddButton({ url, height = '110px' }: addButtonProps): JSX.Element {
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

export function PdfCompanyCard({ logo, id }: pdfCompneyCardProps): JSX.Element {
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

export function PaperCard({ url, date, month }: paperProps): JSX.Element {
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

export function LayoutCard({ url, name }: LayoutProps): JSX.Element {
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
