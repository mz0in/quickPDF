import { TemplateCreator, HtmlObject } from '@renderer/components/Editor'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, TextInput, Flex, NumberInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { setComponentInLocalStorage } from '@renderer/services/utils'
import { useParams, useNavigate } from 'react-router-dom'
import { notifications } from '@mantine/notifications'

interface DefaultFormValue {
  title: string
  height: number
  width: number
}

export default function NewDesign(): JSX.Element {
  const [opened, { close }] = useDisclosure(true)
  const [modalData, setModalData] = useState<DefaultFormValue | undefined>()
  const { companyName } = useParams()
  const navigate = useNavigate()

  const form = useForm<DefaultFormValue>({
    initialValues: {
      title: '',
      height: 0,
      width: 0
    }
  })

  const handleSave = (html: HtmlObject[]): void => {
    console.log('HTML saved:', html)
    setComponentInLocalStorage(companyName as string, modalData!, html)
    notifications.show({
      id: 'load-data',
      title: `Saved ${modalData?.title}`,
      message: 'Saved data on the server.',
      autoClose: 1000,
      withCloseButton: false
    })
  }

  const handleModalSubmit = (values: DefaultFormValue): void => {
    close() // Close opened modal
    setModalData({
      title: values.title,
      height: values.height,
      width: values.width
    })
  }

  if (modalData !== undefined) {
    return (
      <TemplateCreator
        id="editor"
        canvasSize={{
          height: modalData.height,
          width: modalData.width
        }}
        componentName={modalData.title}
        onSave={handleSave}
      />
    )
  }

  return (
    <Modal opened={opened} onClose={(): void => navigate(-1)} title="Design" centered>
      <form onSubmit={form.onSubmit(handleModalSubmit)}>
        <TextInput
          placeholder="Design Name"
          label="Name"
          {...form.getInputProps('title')}
          withAsterisk
        />
        <Flex mt={10} gap={15} justify="space-between" align="center" direction="row">
          <NumberInput
            label="Height"
            placeholder="in inch"
            {...form.getInputProps('height')}
            withAsterisk
            hideControls
          />
          <NumberInput
            label="Width"
            placeholder="in inch"
            {...form.getInputProps('width')}
            withAsterisk
            hideControls
          />
        </Flex>
        <Button type="submit" fullWidth mt={20}>
          Save
        </Button>
      </form>
    </Modal>
  )
}
