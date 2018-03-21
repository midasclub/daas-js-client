import fetch, { Headers, RequestInit } from "node-fetch"
import { ParsedResponse, parseResponse } from "./support/parseResponse"
import { DaasApiClientOptions } from "./interfaces/DaasApiClientOptions"

export abstract class AbstractClient {
	protected readonly url: string
	protected readonly apiKey: string
	protected readonly options: {
		insecure: boolean
	}
	private readonly agent: any

	constructor(url: string, apiKey: string, options: DaasApiClientOptions = {}) {
		this.url = url
		this.apiKey = apiKey
		this.options = Object.assign({ insecure: false }, options)

		if (options.insecure && typeof require === "function") {
			// We're running in node - we can allow invalid certs
			const https = require("https")
			this.agent = new https.Agent({
				rejectUnauthorized: false
			})
		}
	}

	private fetch(
		path: string,
		options: RequestInit = {}
	): Promise<ParsedResponse> {
		const headers = new Headers()
		headers.append("Content-Type", "application/json")
		headers.append("X-DaaS-Api-Key", this.apiKey)

		return fetch(`${this.url}/${path}`, {
			headers,
			...(() => (this.agent ? { agent: this.agent } : {}))(),
			...options
		}).then(parseResponse)
	}

	protected async getRequest(path: string) {
		return this.fetch(path, {
			method: "GET"
		})
	}

	protected async postRequest(path: string, body: Object) {
		return this.fetch(path, {
			method: "POST",
			body: JSON.stringify(body)
		})
	}

	protected async putRequest(path: string, body: Object) {
		return this.fetch(path, {
			method: "PUT",
			body: JSON.stringify(body)
		})
	}

	protected async deleteRequest(path: string, body: Object = {}) {
		return this.fetch(path, {
			method: "DELETE",
			body: JSON.stringify(body)
		})
	}
}
