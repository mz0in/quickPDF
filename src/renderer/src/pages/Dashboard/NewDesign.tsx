import { TemplateEditor } from '@renderer/components/Editor'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, TextInput, Flex, NumberInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { inToPx } from '@renderer/services/utils'

interface defaultFormValue {
  title: string
  height: number
  width: number
}

export default function NewDesign(): JSX.Element {
  const [opened, { close }] = useDisclosure(true)
  const [modalData, setModalData] = useState<defaultFormValue>()

  const form = useForm<defaultFormValue>({
    initialValues: {
      title: '',
      height: 0,
      width: 0
    }
  })

  const handleSave = (html: string) => {
    console.log('HTML saved:', html)
  }

  const handleModalSubmit = (values: defaultFormValue) => {
    close() // to close opened modal
    setModalData({
      title: values.title,
      height: inToPx(values.height),
      width: inToPx(values.width)
    })
  }

  if (modalData !== undefined) {
    return (
      <TemplateEditor
        id="editor"
        canvasSize={{
          height: modalData.height,
          width: modalData.width
        }}
        onSave={handleSave}
      />
    )
  }

  return (
    <Modal opened={opened} onClose={close} title="Design" centered>
      <form onSubmit={form.onSubmit(handleModalSubmit)}>
        <TextInput
          placeholder="Design Name"
          label="Name"
          {...form.getInputProps('title')}
          withAsterisk
        />
        <Flex mt={10} gap={15} justify="space-betweeen" align="center" direction="row">
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
          save
        </Button>
      </form>
    </Modal>
  )
}
