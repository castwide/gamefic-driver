import { Driver } from './Driver';

export class OpalDriver extends Driver {
	// @ts-ignore
	constructor(private opal: any = Opal, private klass: string = 'Gamefic::Plot') {
		super();
	}

	start() {
		return new Promise((resolve, reject) => {
			try {
				this.opal.gvars.plot = this.opal.Object.$const_get(this.klass).$new();
				this.opal.gvars.player = this.opal.gvars.plot.$introduce();
				this.opal.gvars.plot.$ready();
				var state = this.opal.gvars.player.$output().$to_json();
				var result = JSON.parse(state);
				this.notify(result);
				resolve(true);
			} catch (e) {
				reject(e);
			}
		});
	}

	receive(input: string) {
		return new Promise((resolve, reject) => {
			try {
				this.opal.gvars.player.$queue().$push(input);
				resolve(true);
			} catch (e) {
				reject(e);
			}
		});
	}

	update() {
		return new Promise((resolve, reject) => {
			try {
				this.opal.gvars.plot.$update();
				this.opal.gvars.plot.$ready();
				const state = this.opal.gvars.player.$output().$to_json();
				const result = JSON.parse(state);
				this.notify(result);
				resolve(result);
			} catch (e) {
				reject(e);
			}
		});
	}

	snapshot() {
		return new Promise((resolve, reject) => {
			try {
				const snapshot = this.opal.gvars.plot.$save();
				resolve(snapshot);
			} catch (e) {
				reject(e);
			}
		});
	}

	restore(snapshot: any) {
		return new Promise((resolve, reject) => {
			try {
				this.opal.gvars.plot = this.opal.Object.$const_get(this.klass).$restore(snapshot);
				this.opal.gvars.player = this.opal.gvars.plot.$players().$first();
				var state = this.opal.gvars.player.$output().$to_json();
				var result = JSON.parse(state);
				this.notify(result);
				resolve(result);
			} catch (e) {
				reject(e);
			}
		});
	}
}
