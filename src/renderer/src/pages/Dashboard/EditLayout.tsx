import { TemplateEditor } from '@renderer/components/Editor'
import { setComponentInLocalStorage } from '@renderer/services/utils'
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

export default function EditDesign(): JSX.Element {
  const [paperData, setPaperData] = useState<CodeOfPaperProps>(dummayData)
  const { companyName, componentName } = useParams()
  const navigate = useNavigate()

  const getLayoutCode = async (): Promise<void> => {
    const codeOfLayout = JSON.parse(localStorage.getItem(companyName as string) as string)
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
    const dataToSet: CodeOfPaperProps = codeOfLayout[componentName as string]
    setPaperData(dataToSet)
  }

  useEffect(() => {
    getLayoutCode()
  }, [])

  const handleSave = (htmlStrings: htmlObject[]): void => {
    console.log('htmlStrings', htmlStrings)

    const info = {
      title: componentName as string,
      height: paperData.info.height,
      width: paperData.info.width
    }

    setComponentInLocalStorage(companyName as string, info, htmlStrings)
    notifications.show({
      id: 'load-data',
      title: `saved ${componentName}`,
      message: 'saved on server.',
      autoClose: 1000,
      withCloseButton: false
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
      onSave={handleSave}
    />
  )
}
