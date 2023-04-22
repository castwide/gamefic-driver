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
        return new Promise((resolve, reject) => {
            axios.default.post(this.url + '/start').then((response) => {
                this.notify(response.data);
                resolve(true);
            }).catch((e) => {
                reject(e);
            })
        });
    }

    receive(input: string) {
        return new Promise((resolve, reject) => {
            axios.default.post(`${this.url}/receive`, qs.stringify({ command: input })).then((_response) => {
                resolve(true);
            }).catch((e) => {
                reject(e);
            })
        });
    }

    update() {
        return new Promise((resolve, reject) => {
            axios.default.post(`${this.url}/update`).then((response) => {
                this.notify(response.data);
                resolve(true);
            }).catch((e) => {
                reject(e);
            })
        });
    }

    snapshot() {
        return new Promise((resolve, reject) => {
            axios.default.get(this.url + '/snapshot').then((response) => {
                resolve(response.data);
            }).catch((e) => {
                reject(e);
            })
        });
    }

    restore(data: any) {
        return new Promise((resolve, reject) => {
            axios.default.post(this.url + '/restore', qs.stringify({ snapshot: data })).then((response) => {
                this.notify(response.data);
                resolve(true);
            }).catch((e) => {
                reject(e);
            })
        });
    }
}
