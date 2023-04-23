import Layout from '@renderer/components/layouts'
import {
  Paper,
  TextInput,
  Title,
  FileInput,
  Avatar,
  Center,
  Stack,
  Select,
  NumberInput,
  Button
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { fireStore, storage } from '@renderer/services/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { ref, uploadString } from 'firebase/storage'
import { spaceToDash } from '@renderer/services/utils'
import { IconLoader3, IconCheck } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { notifications } from '@mantine/notifications'
import { useAdminChecker } from '@renderer/services/hooks'

interface FormValues {
  name: string
  type: string
  owner: string
  mobileNumber: number
  address: string
}

export default function NewCompany() {
  const [image, setImage] = useState<string>('')
 const [isAdmin] = useAdminChecker()
  const [isLoading, setIsLogin] = useState<boolean>(false)
  const navigate = useNavigate()

  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      type: '',
      owner: '',
      mobileNumber: 0,
      address: ''
    }
  })

  const handleFileUpload = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const save = async (values: typeof form.values) => {
    setIsLogin(true)
    let nameInSpaceToDash = spaceToDash(values.name)
    // save the image with company-name
    const storageRef = ref(storage, `images/${nameInSpaceToDash}/${nameInSpaceToDash}.jpeg`)
    // uploading image
    uploadString(storageRef, image, 'data_url').then(async () => {
      // saving the document
      notifications.show({
        id: 'load-data',
        loading: true,
        title: 'Saving Company',
        message: 'Data is saving on the server please wait.',
        autoClose: false,
        withCloseButton: false
      })
      await setDoc(doc(fireStore, 'company', `${nameInSpaceToDash}`), {
        ...values,
        logo: `images/${nameInSpaceToDash}/${nameInSpaceToDash}.jpeg`
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
      navigate('/')
      console.log('saved')
    })
  }

  if (isAdmin === false){
    return (
      <Center>
        <p>you don't have access to add compines</p>
      </Center>
    )
  }

  return (
    <Layout size="sm" isBack>
      <Title
        align="center"
        sx={{
          fontWeight: 900
        }}
      >
        New Company!
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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
            <Button fullWidth type="submit" rightIcon={isLoading ? <IconLoader3 /> : null}>
              Save
            </Button>
          </Stack>
        </form>
      </Paper>
    </Layout>
  )
}
