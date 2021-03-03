export const CODES = {
    A: 65,
    Z: 90
}

function toCell(cell) {
    return `
        <div class="cell" contenteditable="" data-resize-cell="${cell}"></div>
    `;
}

function toColumn(col) {
    return `
        <div class="column" data-type="resizable">
            ${col}
            <div class="col-resize" data-resize="col" data-colname="${col}"></div>
        </div>
    `;
}

function createRow(idx, content = '') {
    const resize = idx !== 0 ? '<div class="row-resize" data-resize="row"></div>' : '';
    return `
        <div class="row">
            <div class="row-info">
                ${idx ? idx : ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

function toChar(_, idx) {
    return String.fromCharCode(CODES.A + idx);
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('');

    rows.push(createRow(null, cols));

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map((_, idx) => toCell(toChar(_, idx)))
            .join('');
        rows.push(createRow(i + 1, cells));
    }

    return rows.join('');
}