import { Editor } from "grapesjs";
import { styleUpdater } from "./function";

export function fontPluginHandler(editor: Editor){
    const FontsModal = editor.Modal
    const editorCss = editor.Css

  // Define the content of the modal
  const content = `<div class="font-selector">
  <div class="form-group">
    <label for="global-font-select">Global Font:</label>
    <select id="global-font-select" class="font-select">
      <option value="roboto">Roboto</option>
      <option value="chanakya">Chanakya</option>
      <option value="sf-mono">SF Mono</option>
    </select>
  </div>

  <div class="form-group">
    <label for="heading-font-select">Heading Font:</label>
    <select id="heading-font-select" class="font-select">
      <option value="roboto">Roboto</option>
      <option value="chanakya">Chanakya</option>
      <option value="sf-mono">SF Mono</option>
    </select>
  </div>
</div>  
<div>
<button class="save-button">Save</button>
<button class="reset-button">Reset</button>
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

  // updating global fonts with editor setted fonts
  styleUpdater(editor, "global-font-select", "*")

  // updating heading fonts
  styleUpdater(editor, "heading-font-select", "h1")

}