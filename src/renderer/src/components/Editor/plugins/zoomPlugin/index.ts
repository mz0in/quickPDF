/**
 * Zoom in Zoom out
 */

import { Editor } from 'grapesjs'

const myPlugin = (editor: Editor) => {
  editor.Panels.addButton('options', {
    id: 'Zoom Out',
    className: 'fa fa-minus',
    command: 'zoomout',
    attributes: { title: 'Back' },
    category: 'Custom Category' // add a new category for the custom icon
  })
  editor.Panels.addButton('options', {
    id: 'Zoom In',
    className: 'fa fa-plus',
    command: 'zoomin',
    attributes: { title: 'Back' },
    category: 'Custom Category' // add a new category for the custom icon
  })

  editor.Commands.add('zoomin', {
    run: () => {
      let zoom = editor.Canvas.getZoom()
      editor.Canvas.setZoom(`${zoom + 5}`)
    }
  })

  editor.Commands.add('zoomout', {
    run: () => {
      let zoom = editor.Canvas.getZoom()
      editor.Canvas.setZoom(`${zoom - 5}`)
    }
  })

  document.addEventListener('keydown', function (event) {
    if (event.shiftKey && (event.keyCode === 187 || event.keyCode === 107)) {
      event.preventDefault()
      editor.runCommand('zoomin')
    }
    if (event.shiftKey && (event.key === '-' || event.key === '_')) {
      event.preventDefault()
      editor.runCommand('zoomout')
    }
  })
}

export default myPlugin
