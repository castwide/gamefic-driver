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

	receive(input: string) {
		axios.default.post(this.url + '/receive', qs.stringify({ command: input })).then((response) => {
			this.update();
		}).catch((error) => {
			console.error(error);
		});
	}

	update() {
		axios.default.post(this.url + '/update').then((response) => {
			this.notify(response.data);
			if (response.data.continued) {
				this.update();
			}
		}).catch((error) => {
			console.error(error);
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
		axios.default.post(this.url + '/restore', qs.stringify({ snapshot: JSON.stringify(data) })).then((response) => {
			this.notify(response.data);
		});
	}
}
