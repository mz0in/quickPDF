import { Editor } from "grapesjs";
import html2canvas from 'html2canvas';

export default function customSaveModal(editor: Editor) {
  // // Get the selected component
  const selectedComponent = editor.getSelected()?.getEl();

  // let cssCode = editor.CodeManager.getCode(selectedComponent, 'css', { cssc: editor.CssComposer })

  // console.log(cssCode)
  // Get the Modal module
  const modal = editor.Modal;

  // Define the content of the modal
  // Define the content of the modal
  const content = `
                <div class="modal">
                <div class="modal-content">
                  <form>
                    <p>Details</p>
                    <div class="container form-row">
                      <input class="form-column" type="text" id="component-name" name="component-name" placeholder="name">
                      <input class="form-column" type="text" id="component-category" name="component-category" placeholder="category">
                    </div>
                    <div class="container image-container">
                    <div id="screenShotCanvas" width="750px" height="300px"/>
                    </div>
                    <div class="container button-container">
                      <button type="submit" class="save-button">Save</button>
                      <button type="reset" class="reset-button">Reset</button>
                    </div>
                  </form>
                </div>
              </div>                       
`;

  // Create the modal
  const myModal = modal.open({
    content,
    title: 'Save',
    width: '400px',
    height: 'auto',
    closedOnEscape: true,
    closedOnClickOutside: true,
  });

  html2canvas(selectedComponent as HTMLElement, {
    width: 720,
    height: 300,
    scale: 1
  }).then(function (canvas) {
    document.getElementById("screenShotCanvas")?.appendChild(canvas);
  });

  return myModal
}