export function onSubmit(selectedComponent, editor, details, myModal) {
    // get code of the selected item
    const htmlCode = selectedComponent?.toHTML();
    let cssCode = editor.CodeManager.getCode(selectedComponent, 'css', { cssc: editor.CssComposer })
    console.log(htmlCode)
    console.log(cssCode)
    setBlockInLocalStorage(details, htmlCode, cssCode);
    myModal.close();
}

function localStorageIniter(): number {
    let blockValue = localStorage.getItem('totalBlocks');
    if (blockValue) {
        blockValue = String(parseInt(blockValue, 10) + 1);
    } else {
        blockValue = '1';
    }
    localStorage.setItem('totalBlocks', blockValue);
    return parseInt(blockValue, 10);
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

export function setBlockInLocalStorage(details, htmlCode, cssCode) {
    let blockNumber = localStorageIniter();
    const newName = `${details.name}-${blockNumber}`
    let allBlocks = getBlocksFromLocalStorage();
    if (!allBlocks[details.category]) {
        allBlocks[details.category] = {};
    }

    allBlocks[details.category][newName] = {
        htmlCode,
        cssCode
    };

    //updating blockNumbr
    blockNumber = blockNumber + 1;
    localStorage.setItem('totalBlocks', JSON.stringify(blockNumber));
    localStorage.setItem("userBlocks", JSON.stringify(allBlocks))
}