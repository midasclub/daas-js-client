import { AbstractClient } from "./AbstractClient"
import { BotsClient } from "./BotsClient"
import { LobbiesClient } from "./LobbiesClient"
import { ApiKeysClient } from "./ApiKeysClient"
import { WebhooksClient } from "./WebhooksClient"

export class DaasApiClient extends AbstractClient {
	public get ApiKeys() {
		return new ApiKeysClient(this.url, this.apiKey)
	}

	public get Bots() {
		return new BotsClient(this.url, this.apiKey)
	}

	public get Lobbies() {
		return new LobbiesClient(this.url, this.apiKey)
	}

	public get Webhooks() {
		return new WebhooksClient(this.url, this.apiKey)
	}

	constructor(url: string, apiKey: string) {
		super(`${url}/api/v1`, apiKey)
	}
}
