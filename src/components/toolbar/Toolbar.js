import { ExcelStateComponent } from "@core/ExcelStateComponent";
import { $ } from "@core/dom";

import { createToolbar } from "./toolbar.template";

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar';

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            ...options
        });
    }

    prepare() {
        const initialState = {
            textAlign: 'left',
            fontWeight: 'normal',
            textDecoration: 'none',
            fontStyle: 'normal'
        };

        this.initState(initialState);
    }

    get template() {
        return createToolbar(this.state);
    }

    toHTML() {
        return this.template;
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value);
            console.log(value);
            this.setState(value);
            console.log(this.state);
        }
      }
}