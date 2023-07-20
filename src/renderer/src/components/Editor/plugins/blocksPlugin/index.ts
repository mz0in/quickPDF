import customComponents from './components'
import { Editor } from 'grapesjs'

/**
 * Add block templates to the GrapesJS editor.
 * @param editor The GrapesJS editor instance.
 */
export default function addBlockTemplates(editor: Editor): void {
  // Array of block templates
  customComponents.forEach((template) => {
    // Add each block template to the BlockManager
    editor.BlockManager.add(template.label, template)
  })
}
