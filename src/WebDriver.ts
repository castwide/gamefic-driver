import {Driver} from './Driver';
import * as axios from 'axios';
var qs = require('qs');

export class WebDriver implements Driver {
	constructor(
		public url: string = '/'
	) {}

	start(): Promise<any> {
		return new Promise((resolve, reject) => {
			axios.default.get(this.url).then((response) => {
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

	receive(input: string): Promise<any> {
		return new Promise((resolve, reject) => {
			axios.default.post(this.url + '/receive', qs.stringify({command: input})).then((response) => {
				this.update().then((response) => {
					resolve(response);
				}).catch((error) => {
					reject(error);
				});
			}).catch((error) => {
				reject(error);
			});
		});
	}

	update(): Promise<any> {
		return new Promise((resolve, reject) => {
			axios.default.post(this.url + '/update').then((response) => {
				resolve(response.data);
			}).catch((error) => {
				reject(error);
			});
		});
	}
}
