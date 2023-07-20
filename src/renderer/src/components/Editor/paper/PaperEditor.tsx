import grapesjsPageManagerPlugin from '../plugins/pageManger'
import '../plugins/pageManger/css/grapesjs-project-manager.min.css'
import localBlocks from '../plugins/localBlocks'
import type { HtmlObject } from '..'
import { CoreEditor } from '../CoreEditor'
import { Editor } from 'grapesjs'

interface GrapesJSProps {
  id: string
  config?: any
  onSave: (htmlObjects: HtmlObject[], gjsCode: any) => void
  canvasSize: {
    height: number
    width: number
  }
  gjsCode: any
  companyName: string
}

export function PaperEditor({
  id,
  config,
  onSave,
  canvasSize,
  gjsCode,
  companyName
}: GrapesJSProps): JSX.Element {
  const onSaveFunction = (editor: Editor): void => {
    // saveing all pages code into array
    const allPages = editor.Pages.getAll()
    // htmlStrings contains html,css of all the pages in array format
    const htmlStrings: HtmlObject[] = allPages.map((page) => {
      const component = page.getMainComponent()
      const body = editor.getHtml({ component })
      const css = editor.getCss({ component })

      return {
        htmlBody: body,
        css: css
      }
    }) as HtmlObject[]

    const gjsCode = editor.getProjectData()

    onSave(htmlStrings, gjsCode)
  }

  return (
    <CoreEditor
      id={id}
      config={config}
      onSaveFunction={onSaveFunction}
      canvasSize={canvasSize}
      gjsCode={gjsCode}
      customPlugins={[grapesjsPageManagerPlugin, localBlocks]}
      customPluginOpts={{
        [grapesjsPageManagerPlugin]: {
          width: `${canvasSize?.width}cm`, // new page width
          height: `${canvasSize?.height}cm` // new page height
        },
        [localBlocks]: {
          companyName: companyName
        }
      }}
    />
  )
}
