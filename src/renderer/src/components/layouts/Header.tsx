import {
  createStyles,
  Header,
  Text,
  Container,
  rem,
  Avatar,
  ActionIcon,
  Group,
  Menu
} from '@mantine/core'
import { useAdminChecker } from '@renderer/services/hooks'
import { IconArrowLeft, IconUserPlus, IconUserEdit } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

const useStyles = createStyles(() => ({
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
  const [isAdmin] = useAdminChecker()

  return (
    <Header height={56} mb={30}>
      <Container size="xl">
        <div className={classes.inner}>
          <Group>
            {isBack ? (
              <ActionIcon onClick={() => navigate(-1)} variant={'gradient'} gradient={{ from: 'black', to: 'gray', deg: 45 }} p={5} size="lg">
                <IconArrowLeft />
              </ActionIcon>
            ) : null}
            <Text>QuickPDF</Text>
          </Group>
          {isAdmin ? (
            <Menu shadow="md" width={150}>
              <Menu.Target>
                <Avatar color={'dark'} radius="xl" />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item icon={<IconUserPlus size={14} />} onClick={() => navigate('/user-add')}>
                  add user
                </Menu.Item>
                <Menu.Item icon={<IconUserEdit size={14} />} onClick={() => navigate('/user-edit')}>
                  Edit User
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Avatar color={'dark'} radius="xl" />
          )}
        </div>
      </Container>
    </Header>
  )
}
