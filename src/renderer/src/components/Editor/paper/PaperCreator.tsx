import { HtmlObject } from '..'
import grapesjsPageManagerPlugin from '../plugins/pageManger'
import { CoreEditor } from '../CoreEditor'

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
  onSave?: (htmlObjects: HtmlObject[], gjsCode: any) => void
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
  return (
    <CoreEditor
      id={id}
      config={config}
      onSave={onSave}
      canvasSize={canvasSize}
      companyName={companyName}
      isEditor={false}
      customPlugins={[grapesjsPageManagerPlugin]}
      customPluginOpts={{
        [grapesjsPageManagerPlugin]: {
          width: `${canvasSize?.width}in`, // new page width
          height: `${canvasSize?.height}in` // new page height
        }
      }}
    />
  )
}
