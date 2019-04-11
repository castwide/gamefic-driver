import { Driver } from './Driver';

export class OpalDriver extends Driver {
	private opal: any;

	constructor(opal: any) {
		super();
		this.opal = opal;
	}

	start() {
		this.opal.gvars.plot.$update();
		this.opal.gvars.plot.$ready();
		var state = this.opal.gvars.character.$state();
		var result = JSON.parse(state.$to_json());
		this.notify(result);
	}

	receive(input: string) {
		this.opal.gvars.character.$queue().$push(input);
		this.update();
	}

	update() {
		this.opal.gvars.plot.$update();
		this.opal.gvars.plot.$ready();
		var state = this.opal.gvars.character.$state();
		var result = JSON.parse(state.$to_json());
		this.notify(result);
	}
}
