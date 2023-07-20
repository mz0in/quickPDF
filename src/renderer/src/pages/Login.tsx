import { Dispatch, SetStateAction } from 'react'
import { TextInput, PasswordInput, Paper, Title, Container, Button } from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, fireStore } from '@renderer/services/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { notifications } from '@mantine/notifications'
import { IconCross, IconDiscountCheckFilled } from '@renderer/components/icons'

interface Props {
  loginHook: Dispatch<SetStateAction<boolean | null>>
}

export default function LoginPage({ loginHook }: Props): JSX.Element {
  const [emailValue, setEmailValue] = useInputState<string>('')
  const [passwordValue, setPasswordValue] = useInputState<string>('')

  const submitForm = async (): Promise<void> => {
    notifications.show({
      id: 'login-data',
      loading: true,
      title: 'Logging in',
      message: 'Retrieving data from the server, please wait.',
      autoClose: false,
      withCloseButton: false
    })

    try {
      const userCredential = await signInWithEmailAndPassword(auth, emailValue, passwordValue)
      const user = userCredential.user
      console.log(user)

      const docRef = doc(fireStore, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      window.localStorage.setItem(
        'user',
        JSON.stringify({
          login: true,
          admin: docSnap.data()?.isAdmin ? true : false,
          papers: docSnap.data()?.papers
        })
      )

      loginHook(true) // hook to reload App.tsx

      notifications.update({
        id: 'login-data',
        color: 'green',
        title: `Welcome ${user.displayName}`,
        message: 'Login successful',
        icon: <IconDiscountCheckFilled size="1rem" />,
        autoClose: 4000
      })
    } catch (error: any) {
      const errorMessage = error.message
      console.log('errorMsg', errorMessage)

      notifications.update({
        id: 'login-data',
        color: 'red',
        title: 'Error',
        message: errorMessage,
        icon: <IconCross size="1rem" />,
        autoClose: 4000
      })
    }
  }

  return (
    <Container size={420} my={40}>
      <Title align="center" sx={{ fontWeight: 900 }}>
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="you@codenanshu.in"
          required
          value={emailValue}
          onChange={setEmailValue}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={passwordValue}
          onChange={setPasswordValue}
        />
        <Button onClick={submitForm} fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  )
}
