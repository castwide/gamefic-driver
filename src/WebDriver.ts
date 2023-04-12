import { Driver } from './Driver';
import * as axios from 'axios';
var qs = require('qs');

export class WebDriver extends Driver {
    constructor(
        private url: string = '/'
    ) {
        super();
    }

    start() {
        console.log('freakin tryin');
        return new Promise((resolve) => {
            axios.default.post(this.url + '/start').then((response) => {
                this.notify(response.data);
                resolve(response.data);
            });
        });
    }

    receive(input: string) {
        return new Promise((resolve) => {
            axios.default.post(`${this.url}/receive`, qs.stringify({ command: input })).then((_response) => {
                resolve(true);
            });
        });
    }

    update() {
        return new Promise((resolve) => {
            axios.default.post(`${this.url}/update`).then((response) => {
                this.notify(response.data);
                resolve(response.data);
            });
        });
    }

    snapshot() {
        return new Promise((resolve) => {
            axios.default.get(this.url + '/snapshot').then((response) => {
                resolve(response.data);
            });
        });
    }

    restore(data: any) {
        return new Promise((resolve) => {
            axios.default.post(this.url + '/restore', qs.stringify({ snapshot: data })).then((response) => {
                this.notify(response.data);
                resolve(response.data);
            });
        });
    }
}
