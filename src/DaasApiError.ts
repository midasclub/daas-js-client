export class DaasApiError extends Error {
	public readonly error: Object

	constructor(error: { message: string }) {
		super(error.message)
		this.error = error
	}
}
