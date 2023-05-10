const category = "Inner Blocks"
const stylePrefix = "qpdf-inner-"
const rowHeight = 75;

const clsRow = `${stylePrefix}row`;
const clsCell = `${stylePrefix}cell`;
const styleRow = `
    .${clsRow} {
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      flex-wrap: nowrap;
      padding: 5px;
    }
    }`;

const styleClm = `
    .${clsCell} {
      min-height: ${rowHeight}px;
      flex-grow: 1;
      flex-basis: 100%;
    }`;

const step = 0.2;
const minDim = 1;
const currentUnit = 1;
const resizerBtm: Record<string, any> = {
  tl: 0,
  tc: 0,
  tr: 0,
  cl: 0,
  cr: 0,
  bl: 0,
  br: 0,
  minDim
};
const resizerRight: Record<string, any> = {
  ...resizerBtm,
  cr: 1,
  bc: 0,
  currentUnit,
  minDim,
  step,
  keyWidth: 'flex-basis'
};

const rowAttr = {
  class: clsRow,
  'data-gjs-droppable': `.${clsCell}`,
  'data-gjs-resizable': resizerBtm,
  'data-gjs-name': 'Row'
};

const colAttr: Record<string, any> = {
  class: clsCell,
  'data-gjs-draggable': `.${clsRow}`,
  'data-gjs-resizable': resizerRight,
  'data-gjs-name': 'Cell',
  'data-gjs-unstylable': 'width',
  'data-gjs-stylable-require': 'flex-basis'
};


const attrsToString = (attrs: Record<string, any>) => {
  const result = [];

  for (let key in attrs) {
    let value = attrs[key];
    const toParse = value instanceof Array || value instanceof Object;
    value = toParse ? JSON.stringify(value) : value;
    result.push(`${key}=${toParse ? `'${value}'` : `'${value}'`}`);
  }

  return result.length ? ` ${result.join(' ')}` : '';
};

const attrsRow = attrsToString(rowAttr);
const attrsCell = attrsToString(colAttr);
const commonBlockProps = {
  category,
  select: true,
};

const blocks = [
  {
    ...commonBlockProps,
    label: '1 block',
    content: `<div ${attrsRow}>
      <div ${attrsCell} class="column-inner-1"></div>
    </div>
    <style>
        ${styleClm}
        ${styleRow}
        .column-inner-1 {
          flex-basis: calc(100% / 1);
        }
      </style>`
  },
  {
    ...commonBlockProps,
    label: '2 block',
    content: `<div ${attrsRow}>
      <div ${attrsCell} class="column-inner-2"></div>
      <div ${attrsCell} class="column-inner-2"></div>
    </div>
    <style>
        ${styleClm}
        ${styleRow}
        .column-inner-2 {
          flex-basis: calc(100% / 2);
        }
      </style>`
  },
  {
    ...commonBlockProps,
    label: '3 block',
    content: `<div ${attrsRow}>
      <div ${attrsCell} class="column-inner-3"></div>
      <div ${attrsCell} class="column-inner-3"></div>
      <div ${attrsCell} class="column-inner-3"></div>
    </div>
    <style>
        ${styleClm}
        ${styleRow}
        .column-inner-3 {
          flex-basis: calc(100% / 3);
        }
      </style>`
  },
  {
    ...commonBlockProps,
    label: '4 block',
    content: `<div ${attrsRow}>
      <div ${attrsCell} class="column-inner-4"></div>
      <div ${attrsCell} class="column-inner-4"></div>
      <div ${attrsCell} class="column-inner-4"></div>
      <div ${attrsCell} class="column-inner-4"></div>
    </div>
    <style>
        ${styleClm}
        ${styleRow}
        .column-inner-4 {
          flex-basis: calc(100% / 4);
        }
      </style>`
  },
  {
    ...commonBlockProps,
    label: '5 block',
    content: `<div ${attrsRow}>
      <div ${attrsCell} class="column-inner-5"></div>
      <div ${attrsCell} class="column-inner-5"></div>
      <div ${attrsCell} class="column-inner-5"></div>
      <div ${attrsCell} class="column-inner-5"></div>
      <div ${attrsCell} class="column-inner-5"></div>
    </div>
    <style>
        ${styleClm}
        ${styleRow}
        .column-inner-5 {
          flex-basis: calc(100% / 5);
        }
      </style>`
  },
  {
    ...commonBlockProps,
    label: '6 block',
    content: `<div ${attrsRow}>
      <div ${attrsCell} class="column-inner-6"></div>
      <div ${attrsCell} class="column-inner-6"></div>
      <div ${attrsCell} class="column-inner-6"></div>
      <div ${attrsCell} class="column-inner-6"></div>
      <div ${attrsCell} class="column-inner-6"></div>
      <div ${attrsCell} class="column-inner-6"></div>
    </div>
    <style>
        ${styleClm}
        ${styleRow}
        .column-inner-6 {
          flex-basis: calc(100% / 6);
        }
      </style>`
  },
  {
    ...commonBlockProps,
    label: '7 block',
    content: `<div ${attrsRow}>
      <div ${attrsCell} class="column-inner-7"></div>
      <div ${attrsCell} class="column-inner-7"></div>
      <div ${attrsCell} class="column-inner-7"></div>
      <div ${attrsCell} class="column-inner-7"></div>
      <div ${attrsCell} class="column-inner-7"></div>
      <div ${attrsCell} class="column-inner-7"></div>
      <div ${attrsCell} class="column-inner-7"></div>
    </div>
    <style>
        ${styleClm}
        ${styleRow}
        .column-inner-7 {
          flex-basis: calc(100% / 7);
        }
      </style>`
  },
  {
    ...commonBlockProps,
    label: '8 block',
    content: `<div ${attrsRow}>
      <div ${attrsCell} class="column-inner-8"></div>
      <div ${attrsCell} class="column-inner-8"></div>
      <div ${attrsCell} class="column-inner-8"></div>
      <div ${attrsCell} class="column-inner-8"></div>
      <div ${attrsCell} class="column-inner-8"></div>
      <div ${attrsCell} class="column-inner-8"></div>
      <div ${attrsCell} class="column-inner-8"></div>
      <div ${attrsCell} class="column-inner-8"></div>
    </div>
    <style>
        ${styleClm}
        ${styleRow}
        .column-inner-8 {
          flex-basis: calc(100% / 8);
        }
      </style>`
  },
]

export default blocks