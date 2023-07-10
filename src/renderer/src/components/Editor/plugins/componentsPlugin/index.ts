/**
 * blocks are small components like text, headings, date, fonts, images
 * hint: draggable: means that this component is only able to drag and drop inside the given list
 * hint: droppable: means that this component is only accept the given component to drop
 */

import { Editor } from 'grapesjs'
import { templates } from './templates'

export default (editor: Editor) => {
  
  templates.forEach((element) => {
    element.map((template) => {
      editor.BlockManager.add(template.id, template)
    })
  })
}
