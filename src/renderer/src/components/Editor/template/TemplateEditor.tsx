import { Editor } from 'grapesjs'
import type { HtmlObject } from '..'
import { CoreEditor } from '../CoreEditor'

interface GrapesJSProps {
  id: string
  config?: any
  onSave: (htmlObjects: HtmlObject[]) => void
  canvasSize: {
    height: number
    width: number
  }
  paperCode: HtmlObject
}

export function TemplateEditor({
  id,
  config,
  onSave,
  canvasSize,
  paperCode
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

    onSave(htmlStrings)
  }
  return (
    <CoreEditor
      id={id}
      config={config}
      onSaveFunction={onSaveFunction}
      canvasSize={canvasSize}
      isTemplateEditor={true}
      pageManager={{
        pages: [
          {
            name: `page 1`,
            id: `1`,
            styles: paperCode.css,
            component: paperCode.htmlBody
          }
        ]
      }}
    />
  )
}
