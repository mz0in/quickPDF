import customComponents from './components'
import type { Editor } from 'grapesjs'

export const templates = [customComponents]

export default (editor: Editor): void => {
  templates.forEach((element) => {
    element.map((template: any) => {
      editor.BlockManager.add(template.id, template)
    })
  })
}
