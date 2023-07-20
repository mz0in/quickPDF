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
import {
  IconArrowLeft,
  IconUserPlus,
  IconUserEdit,
  IconLogout,
  IconMoon,
  IconSun
} from '@renderer/components/icons'
import { useNavigate } from 'react-router-dom'
import { auth } from '@renderer/services/firebase'
import { signOut } from 'firebase/auth'

interface HeaderComponentProps {
  /**
   * Flag to determine if a back button should be displayed in the header.
   */
  isBack?: boolean
  /**
   * Flag to determine if the dark color scheme is enabled.
   */
  dark: boolean
  /**
   * Function to toggle the color scheme.
   */
  toggleColorScheme: () => void
}

const useStyles = createStyles(() => ({
  inner: {
    height: rem(56),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))

/**
 * Component for rendering the header with navigation options and user menu.
 * @param {HeaderComponentProps} props - The props for the HeaderComponent component.
 * @returns {JSX.Element} The HeaderComponent component.
 */
export default function HeaderComponent({
  isBack = false,
  dark,
  toggleColorScheme
}: HeaderComponentProps): JSX.Element {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const [isAdmin] = useAdminChecker()

  /**
   * Function to handle user logout.
   */
  const logout = (): void => {
    signOut(auth)
      .then(async () => {
        localStorage.removeItem('user')
        //@ts-ignore DB is defined in the preload of electronjs
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
                onClick={(): void => navigate(-1)}
                variant={'gradient'}
                gradient={
                  dark
                    ? { from: 'gray', to: 'gray', deg: 45 }
                    : { from: 'black', to: 'gray', deg: 45 }
                }
                p={5}
                size="lg"
              >
                <IconArrowLeft />
              </ActionIcon>
            ) : null}
            <Text>QuickPDF</Text>
          </Group>
          <Group>
            <ActionIcon
              size="xl"
              onClick={(): void => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <IconSun /> : <IconMoon />}
            </ActionIcon>
            <Menu shadow="md" width={150}>
              <Menu.Target>
                <Avatar color={'dark'} src={auth.currentUser?.photoURL} radius="xl" />
              </Menu.Target>
              <Menu.Dropdown>
                {isAdmin ? (
                  <>
                    <Menu.Item icon={<IconUserPlus />} onClick={(): void => navigate('/user-add')}>
                      add user
                    </Menu.Item>
                    <Menu.Item icon={<IconUserEdit />} onClick={(): void => navigate('/user-edit')}>
                      Edit User
                    </Menu.Item>
                  </>
                ) : null}
                <Menu.Item icon={<IconLogout />} onClick={logout}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </div>
      </Container>
    </Header>
  )
}
