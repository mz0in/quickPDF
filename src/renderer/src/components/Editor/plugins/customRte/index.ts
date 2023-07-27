/**
 * custom rich text editor for grapesj
 */

import { Editor } from 'grapesjs'

const myPlugin = function (editor: Editor): void {
  const rte = editor.RichTextEditor
  console.log('its the RichTextEditor: ', rte)
  // TODO: create [fontSize, colors]
}

export default myPlugin
