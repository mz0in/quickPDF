import customComponents from './components'
import type { Editor } from 'grapesjs'

export const templates = [customComponents]

export default (editor: Editor) => {
  templates.forEach((element) => {
    element.map((template) => {
      editor.BlockManager.add(template.id, template)
    })
  })
}
