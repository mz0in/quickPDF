import { Layout } from '@renderer/components/layouts'
import { useForm } from '@mantine/form'
import {
  Checkbox,
  MultiSelect,
  NumberInput,
  TextInput,
  Title,
  Paper,
  Button,
  LoadingOverlay
} from '@mantine/core'
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'
import { fireStore, auth } from '@renderer/services/firebase'
import { notifications } from '@mantine/notifications'
import { IconCross } from '@renderer/components/icons'
import { useState } from 'react'
import { useAdminChecker } from '@renderer/services/hooks'
import NotFoundTitle from '@renderer/components/page/Access'

export default function EditUser(): JSX.Element {
  const [user, setUser] = useState(false)
  const [number, setNumber] = useState<number | ''>()
  const [papers, setPapers] = useState<string[]>(['test'])
  const [isAdmin] = useAdminChecker()

  const form = useForm({
    initialValues: {
      uid: '',
      name: '',
      isAdmin: false,
      number: 0,
      papers: []
    }
  })

  // Getting all papers
  const getAllPapers = async (): Promise<void> => {
    const q = query(collection(fireStore, 'papers'))
    const querySnapshot = await getDocs(q)
    const allPapers: string[] = []
    querySnapshot.forEach((doc) => {
      allPapers.push(doc.id)
    })
    console.log(allPapers)
    setPapers(allPapers)
  }

  // Searching for user
  const searchFromNumber = async (): Promise<void> => {
    console.log('runned')
    const userRef = collection(fireStore, 'users')
    const q = query(userRef, where('number', '==', number))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      form.setValues({
        uid: doc.id,
        name: doc.data().name,
        isAdmin: doc.data().isAdmin,
        number: doc.data().number,
        papers: doc.data().papers
      })
      getAllPapers()
      setNumber(0)
      setUser(true)
    })
  }

  const save = (values: typeof form.values): void => {
    notifications.show({
      id: 'load-data',
      loading: true,
      title: 'Saving user',
      message: 'Data is saving on the server, please wait.',
      autoClose: false,
      withCloseButton: false
    })

    updateDoc(doc(fireStore, `users/${values.uid}`), {
      isAdmin: values.isAdmin,
      name: values.name,
      number: values.number,
      papers: values.papers
    }).then(() => {
      // Updating localData if changing for currentUser
      if (auth.currentUser?.uid === values.uid) {
        const currentUserData = JSON.parse(localStorage.getItem('user') as string)
        currentUserData.papers = values.papers
        localStorage.setItem('user', JSON.stringify(currentUserData))
      }
      notifications.update({
        id: 'load-data',
        color: 'teal',
        title: `Saved ${values.number}`,
        message: 'User is saved on the server',
        icon: <IconCross size="1rem" />,
        autoClose: 2000
      })
      form.reset()
      setUser(false)
    })
  }

  if (isAdmin === false) {
    return <NotFoundTitle />
  }

  if (isAdmin === true) {
    return (
      <Layout size="sm" isBack>
        <Title align="center" sx={{ fontWeight: 900 }}>
          Edit user
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <NumberInput
            placeholder="His Number"
            label="Number"
            value={number}
            onChange={setNumber}
            withAsterisk
            hideControls
          />
          <Button my={10} fullWidth onClick={searchFromNumber}>
            Search
          </Button>
        </Paper>
        {user ? (
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form onSubmit={form.onSubmit((values) => save(values))}>
              <TextInput
                my={10}
                placeholder="His Name"
                label="Name"
                {...form.getInputProps('name')}
                withAsterisk
              />
              <NumberInput
                my={10}
                placeholder="His Number"
                label="Number"
                {...form.getInputProps('number')}
                withAsterisk
                hideControls
              />
              <Checkbox
                my={10}
                labelPosition="left"
                label="Admin"
                {...form.getInputProps('isAdmin')}
              />
              <MultiSelect
                my={10}
                data={papers}
                label="Papers that he will work on"
                placeholder="Pick all that you like"
                clearButtonProps={{ 'aria-label': 'Clear selection' }}
                {...form.getInputProps('papers')}
                clearable
              />
              <Button my={10} fullWidth type="submit">
                Save
              </Button>
            </form>
          </Paper>
        ) : null}
      </Layout>
    )
  }

  return <LoadingOverlay visible={true} />
}
