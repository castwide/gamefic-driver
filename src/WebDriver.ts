import { Driver } from './Driver';
import * as axios from 'axios';
var qs = require('qs');

export class WebDriver extends Driver {
    constructor(
        public url: string = '/'
    ) {
        super();
    }

    start() {
        return new Promise((resolve, reject) => {
            axios.default.get(this.url).then((_response) => {
                axios.default.post(this.url + '/start').then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }

    receive(input: string) {
        return new Promise((resolve, reject) => {
            axios.default.post(this.url + '/receive', qs.stringify({ command: input })).then((_response) => {
                resolve(this.update());
            }).catch((error) => {
                reject(error);
            });
        });
    }

    update() {
        return new Promise((resolve, reject) => {
            axios.default.post(this.url + '/update').then((response) => {
                this.notify(response.data);
                if (response.data.queue.length > 0) {
                    return this.update();
                }
                resolve(response.data);
            }).catch((error) => {
                reject(error);
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
