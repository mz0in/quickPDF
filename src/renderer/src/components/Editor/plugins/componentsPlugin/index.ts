/**
 * blocks are small components like text, headings, date, fonts, images
 * hint: draggable: means that this component is only able to drag and drop inside the given list
 * hint: droppable: means that this component is only accept the given component to drop
 */

import { Editor } from 'grapesjs'
import { templates } from './templates'

export default (editor: Editor) => {
  const comps = editor.DomComponents;
  templates.forEach((element) => {
    element.map((template) => {
      editor.BlockManager.add(template.id, template)
    })
  })

  // custom components for handling system
  comps.addType('row', {
    // Model definition
  model: {
    // Default properties
    defaults: {
      tagName: 'div',
      droppable: '[data-gjs-type=column]'
    }
  }
  })

  comps.addType('column', {
    // Model definition
  model: {
    // Default properties
    defaults: {
      tagName: 'div',
      draggable: '[data-gjs-type=row]'
    }
  }
  })

  comps.addType('qsection', {
    // Model definition
  model: {
    // Default properties
    defaults: {
      tagName: 'div',
      draggable: '[data-gjs-type=column]',
      style: {'min-height': "75px"}
    }
  }
  })
}
