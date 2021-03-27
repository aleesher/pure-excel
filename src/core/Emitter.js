export class Emitter {
  constructor() {
    this.listeners = {};
  }

  // dispatch, fire, trigger
  // уведомляет слушателей если они есть
  emit(event, ...args) {
    this.listeners[event].forEach(listener => {
        listener(...args);
    });
  }

  // on, listen
  // Подписываемся на уведомления
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] = 
        this.listeners[event].filter(listener => listener != fn);
    };
  }
}

// Example
// const emitter = new Emitter();
// const unsubscribe = emitter.subscribe('alisher', (data) => { console.log('data', data)});

// emitter.emit('alisher', 'hello world');

// setTimeout(() => {
//   emitter.emit('alisher', 'hello world 2');
// }, 1000);

// setTimeout(() => {
//   emitter.emit('alisher', 'hello world 3');
//   // unsubscribe();
// }, 2000);

// setTimeout(() => {
//   emitter.emit('alisher', 'hello world 4');
// }, 3000);