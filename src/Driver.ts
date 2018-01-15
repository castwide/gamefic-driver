export abstract class Driver {
	private updateCallbacks: Function[] = [];

	abstract start();

	abstract receive(input: string);

	abstract update();

	onUpdate(callback: Function) {
		this.updateCallbacks.push(callback);
	}

	protected notify(state: any) {
		this.updateCallbacks.forEach((callback) => {
			callback(state);
		})
	}
}
