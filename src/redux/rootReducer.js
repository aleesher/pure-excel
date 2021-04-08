import {
  TABLE_RESIZE_COL,
  TABLE_RESIZE_ROW,
  CHANGE_TEXT
} from "./types";

let prevState;

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE_COL: {
      prevState = { ...state.colState, [action.id]: action.value };
      return { ...state, colState: prevState };
    }
    case TABLE_RESIZE_ROW: {
      prevState = { ...state.rowState, [action.id]: action.value };
      return { ...state, rowState: prevState };
    }
    case CHANGE_TEXT: {
      prevState = { ...state.dataState, [action.id]: action.value };
      return { ...state, dataState: prevState, currentText: action.value };
    }
    default: return state;
  }
}