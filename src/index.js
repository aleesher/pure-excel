import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';

import { Store } from "@core/createStore";
import { rootReducer } from "@/redux/rootReducer";
import { storage } from "@core/utils";

import './scss/index.scss'

const store = new Store(rootReducer, storage('excel-state'));

store.subscribe(state => {
    storage('excel-state', state);
});

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
});

excel.render();