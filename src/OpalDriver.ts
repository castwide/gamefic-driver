import {Driver} from './Driver';

export class OpalDriver extends Driver {
	private opal: any;

	constructor(opal: any) {
		super();
		this.opal = opal;
	}

	start() {
		try {
			this.opal.gvars.engine.$run();
			var state = this.opal.gvars.engine.$user().$character().$state();
			var json = state.$to_json();
			this.notify(JSON.parse(json));
		} catch(e) {
			console.error(e);
		}
	}

	receive(input: string) {
		try {
			this.opal.gvars.engine.$receive(input);
			this.update();
		} catch(e) {
			console.error(e);
		}
	}

	update() {
		try {
			this.opal.gvars.engine.$update();
			var state = this.opal.gvars.engine.$user().$character().$state();
			var json = state.$to_json();
			var response = JSON.parse(json);
			this.notify(response);
			if (response.continued) {
				this.update();
			}
		} catch(e) {
			console.error(e);
		}
	}
}
