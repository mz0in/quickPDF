import { PaperCreator } from '@renderer/components/Editor'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, Flex, NumberInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { saveAsPDF } from '@renderer/services/utils'
import { IconCheck } from '@renderer/components/icons'
import { notifications } from '@mantine/notifications'
import type { htmlObject } from '@renderer/components/Editor'
import { dateToValue } from '@renderer/services/utils'
import { useParams, useNavigate } from 'react-router-dom'

interface DefaultFormValue {
  date: Date | string
  height: number
  width: number
}

export default function NewPage(): JSX.Element {
  const [opened, { close }] = useDisclosure(true)
  const [modalData, setModalData] = useState<DefaultFormValue | undefined>()
  const { companyName } = useParams()
  const navigate = useNavigate()

  const form = useForm<DefaultFormValue>({
    initialValues: {
      date: new Date(),
      height: 52,
      width: 32
    }
  })

  /**
   * Middleware for saving function in utils
   * @param htmlStrings - Contains html version of gjs code
   * @param gjsCode - gjs json code for importing in the future
   */
  const handleSave = (htmlStrings: htmlObject[], gjsCode: any): void => {
    notifications.show({
      id: 'load-data',
      loading: true,
      title: 'Saving Company',
      message: 'Data is saving on the server please wait.',
      autoClose: false,
      withCloseButton: false
    })

    let allCss = ''
    let allHtml = ''

    // Saving all strings in one
    for (let i = 0; i < htmlStrings.length; i++) {
      allCss = allCss.concat(htmlStrings[i].css)
      allHtml = allHtml.concat(htmlStrings[i].htmlBody)
    }

    const info = {
      ...modalData!,
      companyName: companyName as string
    }

    // Object that contains htmlCode array and meta data of the paper.
    const CodeOfPaper = {
      code: gjsCode,
      info
    }

    saveAsPDF(allCss, allHtml, info, CodeOfPaper)
    notifications.update({
      id: 'load-data',
      color: 'teal',
      title: 'Saved',
      message: 'Data now saved on the server.',
      icon: <IconCheck size="1rem" />,
      autoClose: 2000
    })
  }

  const handleModalSubmit = (values: DefaultFormValue): void => {
    close() // Close opened modal
    setModalData({
      date: dateToValue(values.date as Date),
      height: values.height + 2,
      width: values.width + 2
    })
  }

  if (modalData !== undefined) {
    return (
      <PaperCreator
        id="editor"
        canvasSize={{
          height: modalData.height,
          width: modalData.width
        }}
        onSave={handleSave}
        companyName={companyName as string}
      />
    )
  }

  return (
    <Modal opened={opened} onClose={(): void => navigate(-1)} title="New Newspaper" centered>
      <form onSubmit={form.onSubmit(handleModalSubmit)}>
        <DatePickerInput
          label="Pick date"
          dropdownType="modal"
          placeholder="Pick date"
          data-autofocus
          mx="auto"
          maw={400}
          {...form.getInputProps('date')}
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
