import { fontsDialogPlugin as _fontsDialogPlugin, cmdOpenFonts as _cmdOpenFonts } from './fonts'
import './fonts.css'

export default (editor) => {

  // adding icon for fonts
  editor.Panels.addButton('options', {
    id: 'openFonts',
    className: 'fa fa-font',
    command: 'open-fonts',
    attributes: { title: 'load fonts' },
    category: 'Custom Category' // add a new category for the custom icon
  })

  _fontsDialogPlugin(editor, options)
}
