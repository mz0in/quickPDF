import {
  createStyles,
  Header,
  Text,
  Container,
  rem,
  Avatar,
  ActionIcon,
  Group
} from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  inner: {
    height: rem(56),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))

export default function HeaderComponent({ isBack = false }) {
  const { classes } = useStyles()
  const navigate = useNavigate()

  return (
    <Header height={56} mb={30}>
      <Container size="xl">
        <div className={classes.inner}>
          <Group>
            {isBack ? (
              <ActionIcon onClick={() => navigate(-1)} variant={'gradient'} p={5} size="lg">
                <IconArrowLeft />
              </ActionIcon>
            ) : null}
            <Text>QuickPDF</Text>
          </Group>
          <Avatar color={'dark'} radius="xl" />
        </div>
      </Container>
    </Header>
  )
}
