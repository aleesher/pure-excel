import { ExcelComponent } from "@core/ExcelComponent";

import { createTable } from "./table.template";
import { shouldResize } from "./table.functions";
import { resizeHandler } from "./table.resize";

export const RESIZE_TYPES = {
    column: 'col',
    row: 'row'
};

export class Table extends ExcelComponent {
    static className = 'excel__table';
    
    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        });
    }

    toHTML() {
        return createTable(30);
    }

    onMousedown(event) {
        if (shouldResize(event)) {     
            resizeHandler(this.$root, event);
        }
    }
}