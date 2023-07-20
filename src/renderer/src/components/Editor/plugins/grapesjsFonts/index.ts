import { Editor } from 'grapesjs'
import { fontPluginHandler } from './fonts'
import './fonts.css'

/**
 * GrapesJS Font Plugin.
 * This plugin adds the functionality to load custom fonts to the GrapesJS editor.
 * It provides an icon in the options panel to open the font loading interface.
 * @param editor The GrapesJS editor instance.
 */
export default function grapesjsFontPlugin(editor: Editor): void {
  const commands = editor.Commands

  // Add an icon for fonts in the options panel
  editor.Panels.addButton('options', {
    id: 'openFonts',
    className: 'fa fa-font',
    command: 'open-fonts',
    attributes: { title: 'Load Fonts' },
    category: 'Custom Category' // Add a new category for the custom icon
  })

  // Handle the 'open-fonts' command
  commands.add('open-fonts', {
    run(editor: Editor) {
      fontPluginHandler(editor)
    }
  })
}
