import {Driver} from './Driver';

export class OpalDriver implements Driver {
	private opal: any;

	constructor(opal: any) {
		this.opal = opal;
	}

	start(): Promise<any> {
		return new Promise((resolve, reject) => {
			try {
				this.opal.gvars.engine.$run();
				var state = this.opal.gvars.engine.$user().$character().$state();
				var json = state.$to_json();
				resolve(JSON.parse(json));
			} catch(e) {
				reject(e);
			}
		});
	}

	receive(input: string): Promise<any> {
		return new Promise((resolve, reject) => {
			try {
				this.opal.gvars.engine.$receive(input);
				var state = this.opal.gvars.engine.$user().$character().$state();
				var json = state.$to_json();
				resolve(JSON.parse(json));
			} catch(e) {
				reject(e);
			}
		});
	}

	update(): Promise<any> {
		return new Promise((resolve, reject) => {
			try {
				this.opal.gvars.engine.$update();
				var state = this.opal.gvars.engine.$user().$character().$state();
				var json = state.$to_json();
				resolve(JSON.parse(json));
			} catch(e) {
				reject(e);
			}
		});
	}
}
