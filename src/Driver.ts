export interface Driver {
	start(): Promise<any>;
	receive(input: string): Promise<any>;
	update(): Promise<any>;
}
