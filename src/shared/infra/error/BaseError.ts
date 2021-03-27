export class BaseError extends Error {
	constructor(
		message: string,
		public error: number = 400
	){
		super(message);
		this.error = error;
		this.error = error;
	}
}