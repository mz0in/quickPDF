import { TemplateEditor } from '@renderer/components/Editor'
import { setComponentInLocalStorage } from '@renderer/services/utils'
import { IconCheck } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'
import type { htmlObject } from '@renderer/components/Editor'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface CodeOfPaperProps {
  htmlBody: string
  css: string
  info: {
    height: number
    width: number
  }
}

const dummayData: CodeOfPaperProps = {
  htmlBody: '',
  css: '',
  info: {
    height: 0,
    width: 0
  }
}

export default function EditPDF(): JSX.Element {
  const [paperData, setPaperData] = useState<CodeOfPaperProps>(dummayData)
  const { companyName, componentName } = useParams()
  const navigate = useNavigate()

  const getLayoutCode = async () => {
    //@ts-ignore
    let codeOfLayout = JSON.parse(localStorage.getItem(companyName))
    if (codeOfLayout === undefined) {
      notifications.show({
        id: 'err-loading',
        loading: false,
        title: 'error',
        message: "can't find layout in system.",
        autoClose: false,
        withCloseButton: true,
        onClose: () => navigate(-1)
      })
    }
    console.log('data', codeOfLayout)
    let dataToSet: CodeOfPaperProps = codeOfLayout[componentName as string]
    setPaperData(dataToSet)
  }

  useEffect(() => {
    getLayoutCode()
  }, [])

  const handleSave = (htmlStrings: htmlObject[]) => {
    notifications.show({
      id: 'load-data',
      loading: true,
      title: 'Saving Company',
      message: 'Data is saving on the server please wait.',
      autoClose: false,
      withCloseButton: false
    })
    console.log('htmlStrings', htmlStrings)

    let info = {
      title: componentName as string,
      height: paperData.info.height,
      width: paperData.info.width
    }

    setComponentInLocalStorage(companyName as string, info, htmlStrings)
    notifications.update({
      id: 'load-data',
      color: 'teal',
      title: 'Saved',
      message: 'data now saved on the server.',
      icon: <IconCheck size="1rem" />,
      autoClose: 2000
    })
  }

  return (
    <TemplateEditor
      id="editor"
      canvasSize={{
        height: paperData?.info.height as number,
        width: paperData?.info.width as number
      }}
      paperCode={
        {
          htmlBody: paperData.htmlBody,
          css: paperData.css
        } as htmlObject
      }
      //   pageHead={paperData?.pageHead as string}
      onSave={handleSave}
    />
  )
}
