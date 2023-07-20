import { Editor } from 'grapesjs'

/**
 * Zoom in and Zoom out plugin for GrapesJS editor.
 * This plugin adds buttons to the editor's options panel for zooming in and out.
 * It also supports zooming using keyboard shortcuts.
 * @param editor - GrapesJS editor instance.
 */
export default function zoomManagerPlugin(editor: Editor): void {
  // Add Zoom In button
  editor.Panels.addButton('options', {
    id: 'Zoom In',
    className: 'fa fa-plus',
    command: 'zoomin',
    attributes: { title: 'Zoom In' },
    category: 'Custom Category' // add a new category for the custom icon
  })

  // Add Zoom Out button
  editor.Panels.addButton('options', {
    id: 'Zoom Out',
    className: 'fa fa-minus',
    command: 'zoomout',
    attributes: { title: 'Zoom Out' },
    category: 'Custom Category' // add a new category for the custom icon
  })

  // Command to Zoom In
  editor.Commands.add('zoomin', {
    run: () => {
      const zoom = editor.Canvas.getZoom()
      editor.Canvas.setZoom(`${zoom + 5}`)
    }
  })

  // Command to Zoom Out
  editor.Commands.add('zoomout', {
    run: () => {
      const zoom = editor.Canvas.getZoom()
      editor.Canvas.setZoom(`${zoom - 5}`)
    }
  })

  // Zooming using keyboard shortcuts
  document.addEventListener('keydown', function (event) {
    if (event.shiftKey && (event.keyCode === 187 || event.keyCode === 107)) {
      // Shift + '+' or Shift + '=' key (Zoom In)
      event.preventDefault()
      editor.runCommand('zoomin')
    }
    if (event.shiftKey && (event.key === '-' || event.key === '_')) {
      // Shift + '-' or Shift + '_' key (Zoom Out)
      event.preventDefault()
      editor.runCommand('zoomout')
    }
  })
}
