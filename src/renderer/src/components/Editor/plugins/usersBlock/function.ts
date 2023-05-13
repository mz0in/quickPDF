export function onSubmit(selectedComponent, editor) {
    // get code of the selected item
    const htmlCode = selectedComponent?.toHTML();
    let cssCode = editor.CodeManager.getCode(selectedComponent, 'css', { cssc: editor.CssComposer })
    console.log(htmlCode)
    console.log(cssCode)
}

function localStorageIniter() {
    let totalBlocksInLocalStorage = localStorage.getItem("totalBlocks");
    if (totalBlocksInLocalStorage == null) {
        let value = {
            total: 0
        }
        localStorage.setItem("totalBlocks", JSON.stringify(value));
        return value;
    } else {
        return JSON.parse(totalBlocksInLocalStorage);
    }
}

export function getBlocksFromLocalStorage() {
    let initalValue = {}

    let blocks = localStorage.getItem("userBlocks");
    if (blocks == null) {
        return initalValue
    } else {
        return JSON.parse(blocks);
    }
}

export function setBlockInLocalStorage(name, htmlCode, cssCode) {
    const blockNumber = localStorageIniter();
    const newName = `${name}-${blockNumber}`
    let allBlocks = getBlocksFromLocalStorage();
    allBlocks[`${newName}`] = {
        htmlCode,
        cssCode
    }
    localStorage.setItem("userBlocks", JSON.stringify(allBlocks))
}