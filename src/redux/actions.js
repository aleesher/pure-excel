import {
  TABLE_RESIZE_COL,
  TABLE_RESIZE_ROW,
  CHANGE_TEXT
} from "./types";

export function tableResizeCol(data) {
  return {
    type: TABLE_RESIZE_COL,
    ...data
  }
}

export function tableResizeRow(data) {
  return {
    type: TABLE_RESIZE_ROW,
    ...data
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    ...data
  }
}