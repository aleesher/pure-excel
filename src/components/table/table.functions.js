import { range } from "@core/utils";
import { EVENT_KEYS, TABLE_BOUNDARIES } from "./Table";

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

export function shiftPressed(event) {
  return event.shiftKey;
}

export function matrix($current, $target) {
  const current = $current.id(true);
  const target = $target.id(true);

  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return cols.reduce((acc, col) => {
      rows.forEach(row => acc.push(`${row}:${col}`));
      return acc;
  }, []);
}

export function moveKeyPressed(event) {
  return Object.keys(EVENT_KEYS)
          .some((code) => EVENT_KEYS[code] === event.keyCode);
}

export function getCellToMove(keyCode, { col, row }) {
  switch (keyCode) {
      case EVENT_KEYS.tab:
      case EVENT_KEYS.arrowRight:
          TABLE_BOUNDARIES.end > col && col++;
          break;
      case EVENT_KEYS.enter:
      case EVENT_KEYS.arrowDown:
          TABLE_BOUNDARIES.end > row && row++;
          break;
      case EVENT_KEYS.arrowUp:
          TABLE_BOUNDARIES.start < row && row--;
          break;
      case EVENT_KEYS.arrowLeft:
          TABLE_BOUNDARIES.start < col && col--;
          break;
  }

  return { col, row };
}