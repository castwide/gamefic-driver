import {Driver} from './Driver';

// This engine assumes that Opal has already been compiled with a Gamefic
// project. Gamefic 2.0 creates a global $engine variable.
declare const Opal: any;

export class OpalDriver implements Driver {
	constructor() {
	}

	start(): Promise<any> {
		return new Promise((resolve) => {
			Opal.gvars.engine.$run();
			var state = Opal.gvars.engine.$user().$character().$state();
			var json = state.$to_json();
			resolve(JSON.parse(json));
		});
	}
	receive(input: string): Promise<any> {
		return new Promise((resolve) => {
			Opal.gvars.engine.$receive(input);
			var state = Opal.gvars.engine.$user().$character().$state();
			var json = state.$to_json();
			resolve(JSON.parse(json));
		});
	}
	update(): Promise<any> {
		return new Promise((resolve) => {
			Opal.gvars.engine.$update();
			var state = Opal.gvars.engine.$user().$character().$state();
			var json = state.$to_json();
			resolve(JSON.parse(json));
		});
	}
}
