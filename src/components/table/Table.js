import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/dom";

import { createTable } from "./table.template";
import {
    shouldResize,
    isCell,
    shiftPressed,
    matrix,
    moveKeyPressed,
    getCellToMove
} from "./table.functions";
import { resizeHandler } from "./table.resize";
import { TableSelection } from "./TableSelection";

export const RESIZE_TYPES = {
    column: 'col',
    row: 'row'
};

export const EVENT_KEYS = {
    tab: 9,
    enter: 13,
    arrowLeft: 37,
    arrowUp: 38,
    arrowRight: 39,
    arrowDown: 40,
}

export const TABLE_BOUNDARIES = {
    start: 0,
    end: 25
}

export class Table extends ExcelComponent {
    static className = 'excel__table';
    
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });

        this.selection = null;
    }

    init() {
        super.init();

        this.selection = new TableSelection();
        const $el = this.$root.find(`[data-id="${TABLE_BOUNDARIES.start}:${TABLE_BOUNDARIES.start}"]`);
        this.selection.select($el);
        
        this.$emit('table:select', $el);

        this.$on('formula:input', (text) =>
            this.selection.$current.text(text));
        
        this.$on('formula:enter', () => 
            this.selection.$current.focus().trim())
    }

    toHTML() {
        return createTable(30);
    }

    onMousedown(event) {
        if (shouldResize(event)) {     
            resizeHandler(this.$root, event);
        } else if (isCell(event)) {
            const $target = $(event.target);
            if (shiftPressed(event)) {
                const $group = matrix(this.selection.$current, $target)
                                .map(id => this.$root.find(`[data-id="${id}"]`));
                this.selection.selectGroup($group);
            } else {
                this.selection.select($target);
                this.$emit('table:select', $target);
            }

        }
    }

    onKeydown(event) {
        if (moveKeyPressed(event) && !shiftPressed(event)) {
            event.preventDefault();

            const { $current } = this.selection;
            const { keyCode } = event;

            const cell = getCellToMove(keyCode, $current.id(true));

            const $target = this.$root.find(`[data-id="${cell.row}:${cell.col}"]`);

            this.selection.select($target);
        } 
    }

    onInput(event) {
        this.$emit('table:input', $(event.target));
    }
}