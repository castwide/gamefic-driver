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
		axios.default.get(this.url).then((response) => {
			axios.default.post(this.url + '/start').then((response) => {
				this.notify(response.data);
			}).catch((error) => {
				console.error(error);
			});
		}).catch((error) => {
			console.error(error);
		});
	}

	receive(input: string) {
		axios.default.post(this.url + '/receive', qs.stringify({command: input})).then((response) => {
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
}
