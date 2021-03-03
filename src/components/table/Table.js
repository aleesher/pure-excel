import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { $ } from "@core/dom";

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
        if (event.target.dataset.resize) {
            const $resizer = $(event.target);
            const $parent = $resizer.closest('[data-type="resizable"]');
            const coords = $parent.getCoords();

            const { colname } = event.target.dataset;
            
            document.onmousemove = e => {
                const delta = e.pageX - coords.right;
                const value = coords.width + delta;
                $parent.$el.style.width = value + 'px';
                const nodes = document.querySelectorAll(`[data-resize-cell="${colname}"]`);
                for (let i = 0; i < nodes.length; i++) {
                    nodes[i].style.width = value + 'px';
                }
            }

            document.onmouseup = () => {
                document.onmousemove = null;
            }
        }
    }

    onMousemove(event) {
    }


    onMouseup() {
    }
}