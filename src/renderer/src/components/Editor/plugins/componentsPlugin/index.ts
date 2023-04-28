/**
 * blocks are small components like text, headings, date, fonts, images
 */

import { Editor } from 'grapesjs'
import { templates } from './templates'

export default (editor: Editor) => {
  templates.map(template => {
    editor.BlockManager.add(template.id, template)
  })
}
