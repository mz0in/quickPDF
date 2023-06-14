export function componentClass(initalClass: string, index: number): string {
    return `q-${initalClass}-q${index}`
}

export function componentStyle(
    initalClass: string,
    index: number | number[], 
    rowHeight: number = 75 
): string {
    console.log("function is running to create style")
    if (Array.isArray(index)) {
        let finalClasses: string = "";
        for (let element of index) {
            let newClass = componentClass(initalClass, element);
            finalClasses += `
            .${newClass} {
            min-height: ${rowHeight}px;
            flex-grow: 1;
            flex-basis: 100%;
            }`
        }
        return finalClasses;
    }
    let newClass = componentClass(initalClass, index);

    return `
        .${newClass} {
        min-height: ${rowHeight}px;
        flex-grow: 1;
        flex-basis: 100%;
        }`
        
}

export function styleWithFlex(percantage: number, rowHeight: number = 75) {
    return `
    min-height: ${rowHeight}px;
    flex-grow: 1;
    flex-basis: ${percantage}%;
    `
}

export function styleWithFlexForInner(noOfColumns: number, rowHeight: number = 75) {
    return `
    min-height: ${rowHeight}px;
    flex-grow: 1;
    lex-basis: calc(100% / ${noOfColumns});
    `
}