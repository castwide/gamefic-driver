import {Driver} from './Driver';

// This engine assumes that Opal has already been compiled with a Gamefic
// project. Gamefic 2.0 creates a global $engine variable.
declare const Opal: any;

export class OpalDriver implements Driver {
	constructor() {
	}

	start(): Promise<any> {
		return new Promise((resolve, reject) => {
			try {
				Opal.gvars.engine.$run();
				var state = Opal.gvars.engine.$user().$character().$state();
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
				Opal.gvars.engine.$receive(input);
				var state = Opal.gvars.engine.$user().$character().$state();
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
				Opal.gvars.engine.$update();
				var state = Opal.gvars.engine.$user().$character().$state();
				var json = state.$to_json();
				resolve(JSON.parse(json));
			} catch(e) {
				reject(e);
			}
		});
	}
}
