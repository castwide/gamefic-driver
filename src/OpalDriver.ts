import { Driver } from './Driver';

export class OpalDriver extends Driver {
	private opal: any;

	constructor(opal: any) {
		super();
		this.opal = opal;
	}

	start() {
		return new Promise((resolve) => {
			this.opal.gvars.plot.$ready();
			var state = this.opal.gvars.character.$output().$to_json();
			var result = JSON.parse(state);
			resolve(result);	
		});
	}

	receive(input: string) {
		this.opal.gvars.character.$queue().$push(input);
		this.update();
	}

	update() {
		this.opal.gvars.plot.$update();
		this.opal.gvars.plot.$ready();
		var state = this.opal.gvars.character.$output().$to_json();
		var result = JSON.parse(state);
		this.notify(result);
		if (result.queue.length > 0) {
			setTimeout(this.update.bind(this), 1);
		}
	}

	snapshot() {
		var snapshot = this.opal.gvars.plot.$save().$to_json();
		return new Promise((resolve) => {
			resolve(JSON.parse(snapshot));
		});
	}

	restore(data: any) {
		this.opal.gvars.plot.$restore(data);
		this.opal.gvars.plot.$ready();
		var state = this.opal.gvars.character.$output().$to_json();
		var result = JSON.parse(state);
		this.notify(result);
	}
}
