import { Editor } from 'grapesjs'
import { fontPluginHandler } from './fonts'
import './fonts.css'

export default (editor: Editor): void => {
  const commands = editor.Commands
  // adding icon for fonts
  editor.Panels.addButton('options', {
    id: 'openFonts',
    className: 'fa fa-font',
    command: 'open-fonts',
    attributes: { title: 'load fonts' },
    category: 'Custom Category' // add a new category for the custom icon
  })

  // handing calling of he open-fonts command
  commands.add('open-fonts', {
    run(editor: Editor) {
      fontPluginHandler(editor)
    }
  })
}
