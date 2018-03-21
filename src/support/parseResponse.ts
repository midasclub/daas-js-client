import { Response } from "node-fetch"
import { StatusCodeError } from "../StatusCodeError"
import { DaasApiError } from "../DaasApiError"

export interface ParsedResponse {
	statusCode: number
	body: any
}

export async function parseResponse(
	response: Response
): Promise<ParsedResponse> {
	const text = await response.text()
	const json = JSON.parse(text || "{}")

	if (typeof json.error === "object" && typeof json.error.code === "string") {
		throw new DaasApiError(json.error)
	} else if (response.status >= 400) {
		throw new StatusCodeError(response.status, json)
	}

	return { statusCode: response.status, body: json }
}
