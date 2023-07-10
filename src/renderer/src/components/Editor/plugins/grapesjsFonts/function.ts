import { Editor } from "grapesjs";

export function styleUpdater(editor: Editor, id: string, selector: string) {
  const globalFontSelect = document.getElementById(id) as HTMLSelectElement;
  let currentFont = editor.Css.getRule(selector)?.attributes?.style['font-family'];

  // Check if currentFont is undefined or 'undefined'
  if (typeof currentFont === 'undefined' || currentFont === 'undefined') {
    // Set global-font-select to the default empty value
    globalFontSelect.value = '';
  } else {
    // Check if currentFont matches any option value in globalFontDom
    const options = globalFontSelect.options;
    let foundOption = false;

    for (let i = 0; i < options.length; i++) {
      if (options[i].value === currentFont) {
        // Set the matched option as selected
        globalFontSelect.value = currentFont;
        foundOption = true;
        break;
      }
    }

    // If no match found, set global-font-select to the default empty value
    if (!foundOption) {
      globalFontSelect.value = '';
    }
  }

  // Create a new style rule if currentFont is null or undefined
  if (!currentFont) {
    // editor.Css.setRule(selector, { "font-family": 'undefined'});
    console.log(currentFont, selector)
    globalFontSelect.value = ''; // Set the select to empty option
  }
}
