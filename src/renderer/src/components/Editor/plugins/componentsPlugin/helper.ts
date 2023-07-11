/* blocks */
// column
export function styleWithFlex(noOfColumns: number, rowHeight = 75): string {
  const percantage = 100 / noOfColumns
  return `
    min-height: ${rowHeight}px;
    flex-grow: 1;
    flex-basis: ${percantage}%;
    `
}

//row

export function styleWithFlexForInner(noOfColumns: number, rowHeight = 75): string {
  return `
    min-height: ${rowHeight}px;
    flex-grow: 1;
    flex-basis: calc(100% / ${noOfColumns});
    `
}
