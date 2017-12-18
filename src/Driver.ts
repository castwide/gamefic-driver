export class Driver {
	private updateCallbacks: Function[] = [];

	start() {}

	receive(input: string) {}

	update() {}

	onUpdate(callback: Function) {
		this.updateCallbacks.push(callback);
	}

	protected notify(state: any) {
		this.updateCallbacks.forEach((callback) => {
			callback(state);
		})
	}
}
