import { Box } from '@mantine/core'
import { IconSquareRoundedPlus } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

interface pdfCompneyCardProps {
  logo: string
  id: string
}

interface addButtonProps {
  url: string
  height?: string
}

export function AddButton({ url, height = '110px' }: addButtonProps) {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        backgroundColor: '#f1f1f1',
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
      onClick={() => navigate(url)}
    >
      <IconSquareRoundedPlus />
    </Box>
  )
}

export function PdfCompanyCard({ logo, id }: pdfCompneyCardProps) {
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
      onClick={() => navigate(`/company/${id}`)}
    ></Box>
  )
}
