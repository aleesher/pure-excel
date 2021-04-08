import { getCellStyle } from "./table.functions";

const CODES = {
    A: 65,
    Z: 90
}

function toCell(row, state) {
    return function(_, col) {
        const style = getCellStyle(state.colState, col);
        const cellId = `${row}:${col}`;
        return `
            <div class="cell"
                 contenteditable=""
                 data-col="${col}"
                 data-type="cell"
                 data-id="${cellId}"
                 ${style}>
                 ${state.dataState[cellId] || ''}
            </div>
        `;
    }
}

function toColumn(state) {
    return function(col, index) {
        const style = getCellStyle(state.colState, index);
        return `
            <div class="column" data-type="resizable" data-col="${index}" ${style}>
                ${col}
                <div class="col-resize" data-resize="col"></div>
            </div>
        `;
    }
}

function createRow(idx, content = '', state = {}) {
    const style = getCellStyle(state.rowState, idx, true);
    const resize = idx !== 0 ? '<div class="row-resize" data-resize="row"></div>' : '';
    return `
        <div class="row" data-type="resizable" data-row="${idx}" ${style}>
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

export function createTable(rowsCount = 15, state) {
    
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn(state))
        .join('');

    rows.push(createRow(null, cols));

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(row, state))
            .join('');
        rows.push(createRow(row + 1, cells, state));
    }

    return rows.join('');
}