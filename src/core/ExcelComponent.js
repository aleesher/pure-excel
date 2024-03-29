import { DOMListener } from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
    
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.emitter = options.emitter;
        this.store = options.store;
        this.subscribers = options.subscribers || [];
        this.unsubscribers = [];
        this.storeSub = null;
        this.prepare();
    }

    prepare() {}

    // return template of the Component
    toHTML() {
        return '';
    }

    $emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }

    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn);
        this.unsubscribers.push(unsub);
    }

    $dispatch(action) {
        this.store.dispatch(action);
    }

    $subscribe(fn) {
        this.storeSub = this.store.subscribe(fn);
    }

    storeChanged() {}

    isWatching(key) {
        return this.subscribers.includes(key);
    }

    init() {
        this.initDOMListeners();
    }

    destroy() {
        this.removeDOMListeners();
        this.unsubscribers.forEach(unsub => unsub());
        this.storeSub.unsubscribe();
    }
}