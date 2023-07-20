import { PaperEditor, htmlObject } from '@renderer/components/Editor'
import { saveAsPDF } from '@renderer/services/utils'
import { IconCheck } from '@renderer/components/icons'
import { notifications } from '@mantine/notifications'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface CodeOfPaperProps {
  code: htmlObject[]
  info: {
    companyName: string
    date: Date | string
    height: number
    width: number
  }
}

const dummayData: CodeOfPaperProps = {
  code: [
    {
      css: '',
      htmlBody: ''
    }
  ],
  info: {
    companyName: 'test',
    date: '',
    height: 21,
    width: 15
  }
}

export default function EditPDF(): JSX.Element {
  const [paperData, setPaperData] = useState<CodeOfPaperProps>(dummayData)
  const { companyName, realDate } = useParams<{ companyName: string; realDate: string }>()
  const navigate = useNavigate()

  const getPaperCode = async (): Promise<void> => {
    //@ts-ignore api is defined in the preload of electronjs
    const codeOfPaper: CodeOfPaperProps = await window.api.getPapersWithDate(companyName, realDate)
    if (codeOfPaper === undefined) {
      notifications.show({
        id: 'err-loading',
        loading: false,
        title: 'Error',
        message: "Can't find paper in the system.",
        autoClose: false,
        withCloseButton: true,
        onClose: () => navigate(-1)
      })
    } else {
      console.log('data', codeOfPaper)
      setPaperData(codeOfPaper)
    }
  }

  useEffect(() => {
    getPaperCode()
  }, [])

  /**
   * Middleware for saving function in utils
   * @param htmlStrings Contain HTML version of GJS code
   * @param gjsCode GJS JSON code for importing in the future
   */
  const handleSave = (htmlStrings: htmlObject[], gjsCode: any): void => {
    notifications.show({
      id: 'load-data',
      loading: true,
      title: 'Saving Company',
      message: 'Data is saving on the server, please wait.',
      autoClose: false,
      withCloseButton: false
    })

    console.log('htmlStrings', htmlStrings)

    let allCss = ''
    let allHtml = ''

    // Saving all strings in one
    for (let i = 0; i < htmlStrings.length; i++) {
      allCss = allCss.concat(htmlStrings[i].css)
      allHtml = allHtml.concat(htmlStrings[i].htmlBody)
    }

    const CodeOfPaper = {
      code: gjsCode,
      info: paperData?.info
    }

    saveAsPDF(allCss, allHtml, paperData?.info, CodeOfPaper)

    notifications.update({
      id: 'load-data',
      color: 'teal',
      title: 'Saved',
      message: 'Data now saved on the server.',
      icon: <IconCheck size="1rem" />,
      autoClose: 2000
    })
  }

  return (
    <PaperEditor
      id="editor"
      canvasSize={{
        height: paperData?.info.height ?? 0,
        width: paperData?.info.width ?? 0
      }}
      gjsCode={paperData?.code as any}
      companyName={companyName as string}
      onSave={handleSave}
    />
  )
}
