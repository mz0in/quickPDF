import { Editor } from 'grapesjs'

/**
 * Update the font styles for the given selector.
 * This function updates the font-family style of the selector based on the value selected in the font select element.
 * @param editor The GrapesJS editor instance.
 * @param id The ID of the font select element.
 * @param selector The CSS selector for the element to apply the font style.
 */
export function styleUpdater(editor: Editor, id: string, selector: string): void {
  const globalFontSelect = document.getElementById(id) as HTMLSelectElement
  // @ts-ignore we are handling the undefiend in bellow code
  const currentFont = editor.Css.getRule(selector)?.attributes?.style['font-family']
  console.log('currentFont', currentFont)

  // Check if currentFont is undefined or 'undefined'
  if (typeof currentFont === 'undefined' || currentFont === 'undefined') {
    // Set global-font-select to the default empty value
    globalFontSelect.value = ''
  } else {
    // Check if currentFont matches any option value in globalFontDom
    const options = globalFontSelect.options
    let foundOption = false

    for (let i = 0; i < options.length; i++) {
      if (options[i].value === currentFont) {
        // Set the matched option as selected
        globalFontSelect.value = currentFont
        foundOption = true
        break
      }
    }

    // If no match found, set global-font-select to the default empty value
    if (!foundOption) {
      globalFontSelect.value = ''
    }
  }

  // Create a new style rule if currentFont is null or undefined
  if (!currentFont) {
    // editor.Css.setRule(selector, { "font-family": 'undefined'});
    console.log(currentFont, selector)
    globalFontSelect.value = '' // Set the select to an empty option
  }
}

/**
 * Save the font settings for the GrapesJS editor.
 * This function sets the global font and heading fonts (h1 to h4) for the editor.
 * @param editor The GrapesJS editor instance.
 * @param globalFont The selected global font to apply to the editor.
 * @param headingFont The selected font to apply to heading elements (h1 to h4) in the editor.
 */
export function save(editor: Editor, globalFont: string, headingFont: string): void {
  const css = editor.Css
  // Set global font
  css.setRule('*', { 'font-family': globalFont })

  // Set heading font for h1 to h4
  ;['h1', 'h2', 'h3', 'h4'].forEach((heading) => {
    css.setRule(heading, { 'font-family': `${headingFont} !important` })
  })
}
