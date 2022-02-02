export abstract class Driver {
	private updateCallbacks: Function[] = [];

	abstract start(): Promise<any>;

	abstract receive(input: string): Promise<any>;

	abstract update(): Promise<any>;

	abstract snapshot(): Promise<any>;

	abstract restore(data: any): Promise<any>;

	onUpdate(callback: Function) {
		this.updateCallbacks.push(callback);
	}

	protected notify(state: any) {
		this.updateCallbacks.forEach((callback) => {
			callback(state);
		})
	}
}
