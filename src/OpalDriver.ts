import { Driver } from './Driver';

export class OpalDriver extends Driver {
	private plot: any;
	private narrator: any;
	private player: any;

	// @ts-ignore
	constructor(private opal: any = Opal, private klass: string = 'Gamefic::Plot') {
		super();
		this.plot = this.opal.Object.$const_get(this.klass).$new();
		if (this.opal.Object.$const_get('Gamefic::Narrator')) {
			this.narrator = this.opal.Object.$const_get('Gamefic::Narrator').$new(this.plot);
		} else {
			console.warn("Gamefic::Narrator not found. Falling back to the Gamefic 3.0 API");
		}
		this.player = this.plot.$introduce();
	}

	start() {
		return new Promise((resolve, reject) => {
			try {
				this.safeNarratorStart()
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
				this.safeNarratorFinish();
				this.safeNarratorStart();
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
				if (this.opal.Object.$const_get('Gamefic::Narrator')) {
					this.narrator = this.opal.Object.$const_get('Gamefic::Narrator').$new(this.plot);
				}
				var state = this.player.$output().$to_json();
				var result = JSON.parse(state);
				this.notify(result);
				resolve(result);
			} catch (e) {
				reject(e);
			}
		});
	}

	safeNarratorStart() {
		if (this.narrator) {
			this.narrator.$start();
		} else {
			this.plot.$ready();
		}
	}

	safeNarratorFinish() {
		if (this.narrator) {
			this.narrator.$finish();
		} else {
			this.plot.$update();
		}
	}
}
