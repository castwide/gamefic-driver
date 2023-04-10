import { Driver } from './Driver';

export class OpalDriver extends Driver {
	private opal: any;

	constructor(opal: any) {
		super();
		this.opal = opal;
	}

	start() {
		return new Promise((resolve) => {
			this.opal.gvars.plot = this.opal.Object.$const_get('Gamefic::Plot').$new();
			this.opal.gvars.player = this.opal.gvars.plot.$make_player_character();
			this.opal.gvars.plot.$introduce(this.opal.gvars.player);
			this.opal.gvars.plot.$ready();
			var state = this.opal.gvars.player.$output().$to_json();
			var result = JSON.parse(state);
			resolve(result);	
		});
	}

	receive(input: string) {
		this.opal.gvars.player.$queue().$push(input);
		return this.update();
	}

	update() {
		this.opal.gvars.plot.$update();
		this.opal.gvars.plot.$ready();
		var state = this.opal.gvars.player.$output().$to_json();
		var result = JSON.parse(state);
		this.notify(result);
		if (result.queue.length > 0) {
			return this.update();
		}
		return new Promise((resolve) => {
			resolve(result);
		});
	}

	snapshot() {
		var snapshot = this.opal.gvars.plot.$save();
		return new Promise((resolve) => {
			resolve(snapshot);
		});
	}

	restore(snapshot: any) {
		this.opal.gvars.plot = this.opal.Object.$const_get('Gamefic::Plot').$restore(snapshot);
		this.opal.gvars.player = this.opal.gvars.plot.$players().$first();
		this.opal.gvars.plot.$ready();
		var state = this.opal.gvars.player.$output().$to_json();
		var result = JSON.parse(state);
		this.notify(result);
		return new Promise((resolve) => {
			resolve(result);
		});
	}
}
