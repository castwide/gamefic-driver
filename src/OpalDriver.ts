import { Driver } from './Driver';

export class OpalDriver extends Driver {
	private plot: any;
	private narrator: any;
	private player: any;

	// @ts-ignore
	constructor(private opal: any = Opal, private klass: string = 'Gamefic::Plot') {
		super();
		this.plot = this.opal.Object.$const_get(this.klass).$new();
		this.narrator = this.opal.Object.$const_get('Gamefic::Narrator').$new(this.plot);
		this.player = this.plot.$introduce();
	}

	start() {
		return new Promise((resolve, reject) => {
			try {
				this.narrator.$start();
				var state = this.player.$output().$to_json();
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
				this.player.$queue().$push(input);
				resolve(true);
			} catch (e) {
				reject(e);
			}
		});
	}

	update() {
		return new Promise((resolve, reject) => {
			try {
				this.narrator.$finish();
				this.narrator.$start();
				const state = this.player.$output().$to_json();
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
				const snapshot = this.plot.$save();
				resolve(snapshot);
			} catch (e) {
				reject(e);
			}
		});
	}

	restore(snapshot: any) {
		return new Promise((resolve, reject) => {
			try {
				this.plot = this.opal.Object.$const_get(this.klass).$restore(snapshot);
				this.player = this.plot.$players().$first();
				this.narrator = this.opal.Object.$const_get('Gamefic::Narrator').$new(this.plot);
				var state = this.player.$output().$to_json();
				var result = JSON.parse(state);
				this.notify(result);
				resolve(result);
			} catch (e) {
				reject(e);
			}
		});
	}
}
