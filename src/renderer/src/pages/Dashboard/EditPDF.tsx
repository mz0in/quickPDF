import { PaperEditor } from '@renderer/components/Editor'
import { saveAsPDF } from '@renderer/services/utils'
import { IconCheck } from '@renderer/components/icons'
import { notifications } from '@mantine/notifications'
import type { htmlObject } from '@renderer/components/Editor'
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
      head: '',
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
  const { companyName, realDate } = useParams()
  const navigate = useNavigate()

  const getPaperCode = async () => {
    //@ts-ignore
    let codeOfPaper: CodeOfPaperProps = await window.api.getPapersWithDate(companyName, realDate)
    if (codeOfPaper === undefined) {
      notifications.show({
        id: 'err-loading',
        loading: false,
        title: 'error',
        message: "can't find paper in system.",
        autoClose: false,
        withCloseButton: true,
        onClose: () => navigate(-1)
      })
    }
    console.log('data', codeOfPaper)
    setPaperData(codeOfPaper)
  }

  useEffect(() => {
    getPaperCode()
  }, [])

   /**
   * middleware for saving function in utils
   * @param htmlStrings contain html version of gjs code
   * @param gjsCode gjs json code for importing in future
   */
  const handleSave = (htmlStrings: htmlObject[], gjsCode: any) => {
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

    let CodeOfPaper = {
      code: gjsCode,
      info: paperData?.info
    }

    saveAsPDF(allCss, allHtml, paperData?.info, CodeOfPaper)
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
    <PaperEditor
      id="editor"
      canvasSize={{
        height: paperData?.info.height as number,
        width: paperData?.info.width as number
      }}
      gjsCode={paperData?.code as any}
      companyName={companyName as string}
      onSave={handleSave}
    />
  )
}
