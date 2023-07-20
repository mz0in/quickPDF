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
  componentName: string
}

export function TemplateCreator({
  id,
  config,
  onSave,
  canvasSize,
  componentName
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
        htmlBody: body
          .replaceAll('<body>', `<div id="#${componentName}Bar">`)
          .replaceAll('</body>', '</div>'),
        css: css?.replaceAll('body', `#${componentName}Bar`)
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
      pageManager={false}
    />
  )
}
