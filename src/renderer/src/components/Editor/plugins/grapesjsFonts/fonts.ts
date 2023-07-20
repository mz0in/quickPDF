import { Editor } from 'grapesjs'
import { styleUpdater, save as fontSave } from './function'
import { fontNames } from '@renderer/services/utils'

/**
 * Generate the HTML options for font selection.
 * @returns HTML string with font options.
 */
function fontsToHtml(): string {
  const fontsHtmlArr = fontNames.map((font) => {
    return `<option value="'${font}'">${font}</option>`
  })

  return fontsHtmlArr.toString()
}

/**
 * Handle the GrapesJS font plugin.
 * This function opens a modal to select global and heading fonts for the editor.
 * @param editor The GrapesJS editor instance.
 */
export function fontPluginHandler(editor: Editor): void {
  const FontsModal = editor.Modal

  // Define the content of the modal
  const content = `<div class="font-selector">
  <div class="form-group">
    <label for="global-font-select">Global Font:</label>
    <select id="global-font-select" class="font-select">
      ${fontsToHtml()}
    </select>
  </div>

  <div class="form-group">
    <label for="heading-font-select">Heading Font:</label>
    <select id="heading-font-select" class="font-select">
      ${fontsToHtml()}
    </select>
  </div>
</div>  
<div>
<button id="save-button">Save</button>
<button id="reset-button">Reset</button>
</div>
`

  // Create the modal
  const myModal = FontsModal.open({
    content,
    title: 'Fonts',
    width: '200px',
    height: 'auto',
    closedOnEscape: true,
    closedOnClickOutside: true
  })

  // Updating global fonts with editor-set fonts
  styleUpdater(editor, 'global-font-select', '*')

  // Updating heading fonts
  styleUpdater(editor, 'heading-font-select', 'h1')

  const globalFont = document.getElementById('global-font-select') as HTMLSelectElement
  const headingFont = document.getElementById('heading-font-select') as HTMLSelectElement

  document.getElementById('save-button')?.addEventListener('click', () => {
    fontSave(editor, globalFont.value, headingFont.value)
    myModal.close()
  })

  document.getElementById('reset-button')?.addEventListener('click', () => {
    globalFont.value = ''
    headingFont.value = ''
  })
}
