import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/dom";

import { EVENT_KEYS } from "../table/Table";
export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        });
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div id="formula-input" class="input" contenteditable spellcheck="false"></div>
        `;
    }

    init() {
        super.init();

        const $formula = this.$root.find('#formula-input');

        this.$on('table:select',
            $cell => $formula.text($cell.text()));

        this.$on('table:input', 
            $cell => $formula.text($cell.text()));
    }

    onInput(event) {
        this.$emit('formula:input', $(event.target).text());
    }

    onKeydown(event) {
        const { keyCode } = event;
        if ((keyCode === EVENT_KEYS.enter ||
            keyCode === EVENT_KEYS.tab) &&
            !event.shiftKey) {
            event.preventDefault();

            this.$emit('formula:enter', '');
        }
    }
}