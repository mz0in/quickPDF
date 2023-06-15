/* blocks */
// column
export function styleWithFlex(percantage: number, rowHeight: number = 75) {
    return `
    min-height: ${rowHeight}px;
    flex-grow: 1;
    flex-basis: ${percantage}%;
    `
}

//row 

export function styleWithFlexForInner(noOfColumns: number, rowHeight: number = 75) {
    return `
    min-height: ${rowHeight}px;
    flex-grow: 1;
    flex-basis: calc(100% / ${noOfColumns});
    `
}