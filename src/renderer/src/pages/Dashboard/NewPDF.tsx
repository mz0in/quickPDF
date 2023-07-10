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

interface defaultFormValue {
  date: Date | string
  height: number
  width: number
}

export default function NewPage(): JSX.Element {
  const [opened, { close }] = useDisclosure(true)
  const [modalData, setModalData] = useState<defaultFormValue>()
  const { companyName } = useParams()
  const navigate = useNavigate()

  const form = useForm<defaultFormValue>({
    initialValues: {
      date: new Date(),
      height: 21,
      width: 15
    }
  })

  /**
   * middleware for saving function in utils
   * @param htmlStrings contain html version of gjs code
   * @param pageHead contain the head of the pdf html document like fonts
   * @param gjsCode gjs json code for importing in future
   */
  const handleSave = (htmlStrings: htmlObject[], pageHead: string, gjsCode: any) => {
    notifications.show({
      id: 'load-data',
      loading: true,
      title: 'Saving Company',
      message: 'Data is saving on the server please wait.',
      autoClose: false,
      withCloseButton: false
    })
    console.log('htmlStrings', htmlStrings)
    let allCss = ''
    let allHtml = ''

    // saving all strings in one
    for (let i = 0; i < htmlStrings.length; i++) {
      allCss = allCss.concat(htmlStrings[i].css)
      allHtml = allHtml.concat(htmlStrings[i].htmlBody)
    }

    let info = {
      ...modalData,
      companyName
    }
    // Object that contain htmlCode array and meta data of the paper.
    let CodeOfPaper = {
      code: gjsCode,
      info,
      pageHead
    }

    saveAsPDF(allCss, allHtml, pageHead, info, CodeOfPaper)
    notifications.update({
      id: 'load-data',
      color: 'teal',
      title: 'Saved',
      message: 'data now saved on the server.',
      icon: <IconCheck size="1rem" />,
      autoClose: 2000
    })
  }

  const handleModalSubmit = (values: defaultFormValue) => {
    close() // to close opened modal
    setModalData({
      date: dateToValue(values.date as Date),
      height: values.height,
      width: values.width
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
    <Modal opened={opened} onClose={() => navigate(-1)} title="New Newspaper" centered>
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
