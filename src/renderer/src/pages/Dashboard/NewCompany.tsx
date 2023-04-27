import { Layout, FormLayout } from '@renderer/components/layouts'
import {
  TextInput,
  FileInput,
  Avatar,
  Center,
  Stack,
  Select,
  NumberInput,
  Button
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { fireStore, storage } from '@renderer/services/firebase'
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { ref, uploadString } from 'firebase/storage'
import { spaceToDash } from '@renderer/services/utils'
import { IconLoader3, IconCheck } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { notifications } from '@mantine/notifications'
import { useAdminChecker } from '@renderer/services/hooks'
import NotFoundTitle from '@renderer/components/page/Access'

interface FormValues {
  name: string
  type: string
  owner: string
  mobileNumber: number
  address: string
  creator: string
}

export default function NewCompany() {
  const [image, setImage] = useState<string>('')
  const [isAdmin] = useAdminChecker()
  const [users, setUsers] = useState([{ value: 'daily', label: 'Daily' }])
  const navigate = useNavigate()

  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      type: '',
      owner: '',
      mobileNumber: 0,
      address: '',
      creator: ''
    }
  })

  const getAllUsers = async () => {
    const docSnap = await getDoc(doc(fireStore, 'company', 'allUsers'))
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data().users)
      let updatedData = docSnap.data().users.map((user) => {
        return {
          value: user.uid,
          label: user.name
        }
      })
      setUsers(updatedData)
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!')
    }
  }

  // fetrching all users
  useEffect(() => {
    getAllUsers()
  }, [])

  const handleFileUpload = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const save = async (values: typeof form.values) => {
    notifications.show({
      id: 'load-data',
      loading: true,
      title: 'Saving Company',
      message: 'Data is saving on the server please wait.',
      autoClose: false,
      withCloseButton: false
    })
    let nameInSpaceToDash = spaceToDash(values.name)
    // save the image with company-name
    const storageRef = ref(storage, `images/${nameInSpaceToDash}/${nameInSpaceToDash}.jpeg`)
    //1. uploading image
    uploadString(storageRef, image, 'data_url').then(async () => {
      //2. saving paper
      await setDoc(doc(fireStore, `papers`, `${nameInSpaceToDash}`), {
        name: values.name,
        type: values.type,
        owner: values.owner,
        mobileNumber: values.mobileNumber,
        address: values.address,
        logo: `images/${nameInSpaceToDash}/${nameInSpaceToDash}.jpeg`
      }).then(() => {
        //3. assing paper to user
        updateDoc(doc(fireStore, 'users', values.creator), {
          papers: arrayUnion(nameInSpaceToDash)
        }).then(() => {
          notifications.update({
            id: 'load-data',
            color: 'teal',
            title: 'Saved',
            message: 'data now saved on the server.',
            icon: <IconCheck size="1rem" />,
            autoClose: 2000
          })
        })
      })
      navigate('/')
      console.log('saved')
    })
  }

  if (isAdmin === false) {
    return <NotFoundTitle />
  }

  return (
    <Layout size="sm" isBack>
      <FormLayout title="New Company!">
        <form onSubmit={form.onSubmit((values) => save(values))}>
          <Center>
            <Avatar size={100} radius="lg" src={image} />
          </Center>
          <Stack spacing={10}>
            <TextInput
              placeholder="Name"
              label="Full name"
              withAsterisk
              {...form.getInputProps('name')}
            />
            <FileInput
              accept="image/*"
              label="Logo"
              placeholder="Upload logo"
              onChange={handleFileUpload}
            />
            <Select
              label="Type"
              placeholder="Pick one"
              data={[
                { value: 'daily', label: 'Daily' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'monthly' }
              ]}
              {...form.getInputProps('type')}
            />
            <TextInput
              placeholder="Owner"
              label="Owner name"
              withAsterisk
              {...form.getInputProps('owner')}
            />
            <NumberInput
              placeholder="Mobile Number"
              label="Number"
              withAsterisk
              hideControls
              {...form.getInputProps('mobileNumber')}
            />
            <TextInput
              placeholder="Address"
              label="Full Address"
              withAsterisk
              {...form.getInputProps('address')}
            />
            <Select
              data={users}
              placeholder="Pick one"
              label="Creator"
              withAsterisk
              {...form.getInputProps('creator')}
              maxDropdownHeight={160}
            />
            <Button fullWidth type="submit">
              Save
            </Button>
          </Stack>
        </form>
      </FormLayout>
    </Layout>
  )
}
