import { DOMListener } from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
    
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
    }

    // return template of the Component
    toHTML() {
        return '';
    }

    init() {
        this.initDOMListeners();
    }

    destroy() {
        this.removeDOMListeners();
    }
}