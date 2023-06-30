import { Layout, FormLayout } from '@renderer/components/layouts'
import { useForm } from '@mantine/form'
import {
  TextInput,
  PasswordInput,
  Button,
  MultiSelect,
  NumberInput,
  LoadingOverlay
} from '@mantine/core'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { arrayUnion, doc, updateDoc, query, collection, getDocs, setDoc } from 'firebase/firestore'
import { auth, fireStore } from '@renderer/services/firebase'
import { notifications } from '@mantine/notifications'
import { IconCross } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAdminChecker } from '@renderer/services/hooks'
import NotFoundTitle from '@renderer/components/page/Access'

export default function UserAdd(): JSX.Element {
  const [papers, setPapers] = useState(['test'])
  const [isAdmin] = useAdminChecker()
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      name: '',
      emailAddress: '',
      number: 0,
      password: '',
      papers: []
    }
  })

  const getAllPapers = async () => {
    const q = query(collection(fireStore, 'papers'))
    const querySnapshot = await getDocs(q)
    let allPapers: string[] = []
    querySnapshot.forEach((doc) => {
      allPapers.push(doc.id)
    })
    console.log(allPapers)
    setPapers(allPapers)
  }

  useEffect(() => {
    getAllPapers()
  }, [])

  const save = async (values: typeof form.values) => {
    // saving user
    notifications.show({
      id: 'load-data',
      loading: true,
      title: 'Saving user',
      message: 'Data is saving on the server please wait.',
      autoClose: false,
      withCloseButton: false
    })
    try {
      // 1. registered user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.emailAddress,
        values.password
      )
      const user = userCredential.user

      //2. updating name
      await updateProfile(user, {
        displayName: values.name
      })

      //3. adding in company employ list
      const userRef = doc(fireStore, 'company', 'allUsers')
      await updateDoc(userRef, {
        users: arrayUnion({
          name: user.displayName,
          uid: user.uid
        })
      })

      //4. giving user their company
      await setDoc(doc(fireStore, `users/${user.uid}`), {
        isAdmin: false,
        name: values.name,
        number: values.number,
        papers: values.papers
      })

      //5. updating notification
      notifications.update({
        id: 'load-data',
        color: 'teal',
        title: 'Saved ' + values.name,
        message: 'user is saved on the server',
        icon: <IconCross size="1rem" />,
        autoClose: 2000
      })
      navigate('/')
    } catch (error: any) {
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
    }
  }

  if (isAdmin === false) {
    return <NotFoundTitle />
  }

  if (isAdmin === true) {
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
              my={10}
              label="Email"
              placeholder="his email"
              {...form.getInputProps('emailAddress')}
              withAsterisk
            />
            <NumberInput
              my={10}
              placeholder="His Number"
              label="Number"
              withAsterisk
              {...form.getInputProps('number')}
              hideControls
            />
            <PasswordInput
              my={10}
              placeholder="Password"
              label="Password"
              {...form.getInputProps('password')}
              withAsterisk
            />
            <MultiSelect
              my={20}
              data={papers}
              label="Papers that he will work on"
              placeholder="Pick all that you like"
              clearButtonProps={{ 'aria-label': 'Clear selection' }}
              {...form.getInputProps('papers')}
              clearable
            />
            <Button fullWidth type="submit">
              Save
            </Button>
          </form>
        </FormLayout>
      </Layout>
    )
  }

  return <LoadingOverlay visible={true} />
}
