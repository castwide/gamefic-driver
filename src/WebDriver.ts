import {Driver} from './Driver';
import * as axios from 'axios';
var qs = require('qs');
import * as Url from 'url';

export class WebDriver implements Driver {
	constructor(
		public url: string = '/'
	) {}

	start(): Promise<any> {
		return new Promise((resolve, reject) => {
			axios.default.get(this.url).then((response) => {
				axios.default.post('/start').then((response) => {
					resolve(response.data);
				}).catch((error) => {
					reject(error);
				});
			}).catch((error) => {
				reject(error);
			});
		});
	}

	receive(input: string): Promise<any> {
		return new Promise((resolve, reject) => {
			axios.default.post(Url.resolve(this.url, 'update'), qs.stringify({command: input})).then((response) => {
				resolve(response.data);
			}).catch((error) => {
				reject(error);
			});
		});
	}

	update(): Promise<any> {
		return new Promise((resolve, reject) => {
			reject('not implemented');
		});
	}
}
