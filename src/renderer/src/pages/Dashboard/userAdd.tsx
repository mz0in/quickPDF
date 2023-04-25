import { Layout, FormLayout } from '@renderer/components/layouts'
import { useForm } from '@mantine/form'
import { TextInput, PasswordInput, Button } from '@mantine/core'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@renderer/services/firebase'
import { notifications } from '@mantine/notifications'
import { IconCross } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

export default function UserAdd(): JSX.Element {
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      name: '',
      emailAddress: '',
      password: ''
    }
  })

  const save = (values: typeof form.values) => {
    // saving user
    notifications.show({
      id: 'load-data',
      loading: true,
      title: 'Saving user',
      message: 'Data is saving on the server please wait.',
      autoClose: false,
      withCloseButton: false
    })
    createUserWithEmailAndPassword(auth, values.emailAddress, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        updateProfile(user, {
          displayName: values.name
        }).then(() => {
          notifications.update({
            id: 'load-data',
            color: 'teal',
            title: 'Saved ' + values.name,
            message: 'user is saved on the server',
            icon: <IconCross size="1rem" />,
            autoClose: 2000
          })

          navigate('/')
        })
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        // ..
        notifications.update({
          id: 'load-data',
          color: 'red',
          title: 'Error ' + errorCode,
          message: errorMessage,
          icon: <IconCross size="1rem" />,
          autoClose: 2000
        })
      })
  }

  return (
    <Layout size="sm" isBack>
      <FormLayout title="Add User">
        <form onSubmit={form.onSubmit((values) => save(values))}>
          <TextInput
            label="First Name"
            placeholder="Atar"
            {...form.getInputProps('name')}
            withAsterisk
          />
          <TextInput
            label="Email"
            placeholder="his email"
            {...form.getInputProps('emailAddress')}
            withAsterisk
          />
          <PasswordInput my={20} placeholder="Password" label="Password"
          {...form.getInputProps('password')}
           withAsterisk />
          <Button fullWidth type="submit">
            Save
          </Button>
        </form>
      </FormLayout>
    </Layout>
  )
}
