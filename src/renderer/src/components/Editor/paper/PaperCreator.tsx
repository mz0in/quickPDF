import { HtmlObject } from '..'
import grapesjsPageManagerPlugin from '../plugins/pageManger'
import localBlocks from '../plugins/localBlocks'
import { CoreEditor } from '../CoreEditor'
import { Editor } from 'grapesjs'

interface GrapesJSProps {
  /** Unique ID of the editor container. */
  id: string
  /** Additional configuration options for GrapesJS. */
  config?: any
  /**
   * Callback function triggered when the editor content is saved.
   *
   * @param htmlObjects - An array of HTML objects representing each page's content and CSS.
   * @param gjsCode - The full GrapesJS project data, including components and styles.
   */
  onSave: (htmlObjects: HtmlObject[], gjsCode: any) => void
  /**
   * Dimensions of the canvas in centimeters.
   * Used to set the size of the paper in GrapesJS.
   */
  canvasSize: {
    /** Height of the canvas in centimeters. */
    height: number
    /** Width of the canvas in centimeters. */
    width: number
  }
  /** Company name used for local blocks. */
  companyName: string
}

export function PaperCreator({
  id,
  config,
  onSave,
  canvasSize,
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
