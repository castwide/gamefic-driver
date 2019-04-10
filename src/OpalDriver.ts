import {Driver} from './Driver';

export class OpalDriver extends Driver {
	private engine: any;

	constructor(engine: any) {
		super();
		this.engine = engine;
	}

	start() {
		var state = this.engine.start();
		this.notify(state);
	}

	receive(input: string) {
		this.engine.receive(input);
		this.update();
	}

	update() {
		var state = this.engine.update();
		this.notify(state);
	}
}
