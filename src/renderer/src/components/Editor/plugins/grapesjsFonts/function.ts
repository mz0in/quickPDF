import { Editor } from 'grapesjs'

export function styleUpdater(editor: Editor, id: string, selector: string): void {
  const globalFontSelect = document.getElementById(id) as HTMLSelectElement
  // @ts-ignore handling undefiend in bellow code
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
    globalFontSelect.value = '' // Set the select to empty option
  }
}

export function save(editor: Editor, globalFont: string, headingFont: string): void {
  const css = editor.Css
  // set global font
  css.setRule('*', { 'font-family': globalFont })

  // set heading font from h1-h6
  ;['h1', 'h2', 'h3', 'h4'].forEach((heading) => {
    css.setRule(heading, { 'font-family': headingFont })
  })
}
