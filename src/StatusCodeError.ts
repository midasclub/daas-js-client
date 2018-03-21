export class StatusCodeError extends Error {
	public readonly statusCode: number
	public readonly response: Object

	constructor(statusCode: number, response: Object) {
		super(`The request returned HTTP status ${statusCode}`)
		this.statusCode = statusCode
		this.response = response
	}
}
