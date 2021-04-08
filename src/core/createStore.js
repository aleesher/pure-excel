import { objectIsEmpty } from "@core/utils";

export class Store {
  initialState = {
    colState: {},
    rowState: {},
    dataState: {},
    currentText: ''
  }

  constructor(rootReducer, initialState) {
    this.initialState = objectIsEmpty(initialState) ? this.initialState : initialState;
    this.rootReducer = rootReducer;
    this.state = this.rootReducer({ ...this.initialState }, { type: '__INIT__' });
    this.listeners = [];
  }
  
  subscribe(fn) {
    this.listeners.push(fn);
    return {
      unsubscribe() {
        this.listeners = this.listeners.filter(listener => listener !== fn);
      }
    }
  }

  dispatch(action) {
    this.state = this.rootReducer(this.state, action);
    this.listeners.forEach(listener => listener(this.state));
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }
}