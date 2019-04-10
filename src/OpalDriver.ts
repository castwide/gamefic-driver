import {Driver} from './Driver';

export class OpalDriver extends Driver {
	private opal: any;

	constructor(opal: any) {
		super();
		this.opal = opal;
	}

	start() {
		var state = this.opal.gvars.character.$state();
		var json = state.$to_json();
		this.notify(JSON.parse(json));
	}

	receive(input: string) {
		this.opal.gvars.character.$queue().$push(input);
		this.update();
	}

	update() {
		this.opal.gvars.plot.$update();
		this.opal.gvars.plot.$ready();
		var state = this.opal.gvars.character.$state();
		var json = state.$to_json();
		var response = JSON.parse(json);
		this.notify(response);
	}
}
