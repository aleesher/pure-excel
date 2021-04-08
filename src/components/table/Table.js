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
import * as actions from "@/redux/actions";

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
        
        this.selectCell($el);

        this.$on('formula:input', (text) => {
            this.selection.$current.text(text)
            this.updateTextInStore(text);
        });
        
        this.$on('formula:enter', () => 
            this.selection.$current.focus().trim())

        // this.$subscribe(state => {
        //     console.log('Table', state);
        // });
    }

    toHTML() {
        return createTable(30, this.store.getState());
    }

    async resizeTable(event) {
        const data = await resizeHandler(this.$root, event);
        const actionKey = data.resizeType === RESIZE_TYPES.column ? 
                            'tableResizeCol' : 
                            'tableResizeRow';
        this.$dispatch(actions[actionKey](data));
    }

    onMousedown(event) {
        if (shouldResize(event)) {     
            this.resizeTable(event);
        } else if (isCell(event)) {
            const $target = $(event.target);
            if (shiftPressed(event)) {
                const $group = matrix(this.selection.$current, $target)
                                .map(id => this.$root.find(`[data-id="${id}"]`));
                this.selection.selectGroup($group);
            } else {
                this.selectCell($target);
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
            
            this.selectCell($target);
        } 
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
        this.updateTextInStore($cell.text())
    }

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.$current.id(),
            value
        }));
    }

    onInput(event) {
        this.updateTextInStore($(event.target).text());
    }
}