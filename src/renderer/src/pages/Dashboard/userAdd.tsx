import { Layout, FormLayout } from '@renderer/components/layouts'
import { useForm } from '@mantine/form'
import { TextInput, PasswordInput, Button, MultiSelect } from '@mantine/core'
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
  const [isAdmin] = useAdminChecker();
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      name: '',
      emailAddress: '',
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
        // 1. registered user
        const user = userCredential.user
        updateProfile(user, {
          //2. updating name
          displayName: values.name
        }).then(() => {
          //3. adding in compnay employ list
          const userRef = doc(fireStore, 'company', 'allUsers')
          updateDoc(userRef, {
            users: arrayUnion({
              name: user.displayName,
              uid: user.uid
            })
          }).then(() => {
            //4. giving user there company
            setDoc(doc(fireStore, `users/${user.uid}`), {
              isAdmin: false,
              papers: values.papers
            }).then(() => {
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
            })
          })
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

  if (isAdmin === false) {
    return (
      <NotFoundTitle/>
    )
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
            my={10}
            label="Email"
            placeholder="his email"
            {...form.getInputProps('emailAddress')}
            withAsterisk
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
