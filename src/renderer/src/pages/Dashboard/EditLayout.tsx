import { TemplateEditor, htmlObject } from '@renderer/components/Editor'
import { setComponentInLocalStorage } from '@renderer/services/utils'
import { notifications } from '@mantine/notifications'
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
  const { companyName, componentName } = useParams<{ companyName: string; componentName: string }>()
  const navigate = useNavigate()

  const getLayoutCode = async (): Promise<void> => {
    const codeOfLayout = JSON.parse(localStorage.getItem(companyName as string) as string)
    if (codeOfLayout === undefined) {
      notifications.show({
        id: 'err-loading',
        loading: false,
        title: 'Error',
        message: "Can't find layout in the system.",
        autoClose: false,
        withCloseButton: true,
        onClose: () => navigate(-1)
      })
    } else {
      console.log('data', codeOfLayout)
      const dataToSet: CodeOfPaperProps = codeOfLayout[componentName as string]
      setPaperData(dataToSet)
    }
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
      title: `Saved ${componentName}`,
      message: 'Saved on server.',
      autoClose: 1000,
      withCloseButton: false
    })
  }

  return (
    <TemplateEditor
      id="editor"
      canvasSize={{
        height: paperData?.info.height ?? 0,
        width: paperData?.info.width ?? 0
      }}
      paperCode={{
        htmlBody: paperData.htmlBody,
        css: paperData.css
      }}
      onSave={handleSave}
    />
  )
}
