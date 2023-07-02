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
import { IconArrowLeft, IconUserPlus, IconUserEdit, IconLogout } from "@renderer/components/icons"
import { useNavigate } from 'react-router-dom'
import { auth } from '@renderer/services/firebase'
import { signOut } from 'firebase/auth'

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

  const logout = () => {
    signOut(auth)
      .then(async () => {
        localStorage.removeItem('user')
        //@ts-ignore
        await window?.DB?.setData('company', 'companies', undefined)
        location.reload()
      })
      .catch((error) => {
        console.log('An error happened.', error)
      })
  }

  return (
    <Header height={56} mb={30}>
      <Container size="xl">
        <div className={classes.inner}>
          <Group>
            {isBack ? (
              <ActionIcon
                onClick={() => navigate(-1)}
                variant={'gradient'}
                gradient={{ from: 'black', to: 'gray', deg: 45 }}
                p={5}
                size="lg"
              >
                <IconArrowLeft />
              </ActionIcon>
            ) : null}
            <Text>QuickPDF</Text>
          </Group>
          <Menu shadow="md" width={150}>
            <Menu.Target>
              <Avatar color={'dark'} src={auth.currentUser?.photoURL} radius="xl" />
            </Menu.Target>
            <Menu.Dropdown>
              {isAdmin ? (
                <>
                  <Menu.Item
                    icon={<IconUserPlus />}
                    onClick={() => navigate('/user-add')}
                  >
                    add user
                  </Menu.Item>
                  <Menu.Item
                    icon={<IconUserEdit />}
                    onClick={() => navigate('/user-edit')}
                  >
                    Edit User
                  </Menu.Item>
                </>
              ) : null}
              <Menu.Item icon={<IconLogout />} onClick={logout}>
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </Container>
    </Header>
  )
}
