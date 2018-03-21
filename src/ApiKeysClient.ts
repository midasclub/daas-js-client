import { ApiAccessLevel, ApiKey, PlainTextApiKey } from "@daas/model"
import { AbstractClient } from "./AbstractClient"
import { handleNotFound } from "./support/handleNotFound"
import { CreateApiKeyData } from "./interfaces/CreateApiKeyData"
import { UpdateApiKeyData } from "./interfaces/UpdateApiKeyData"
import { UpdateApiPermissionsData } from "./interfaces/UpdateApiPermissionsData"

export class ApiKeysClient extends AbstractClient {
	async get(fragment: string): Promise<ApiKey | null> {
		return await handleNotFound(async () => {
			const { body } = await super.getRequest(`apiKeys/${fragment}`)
			return ApiKey.deserialize(body)
		})
	}

	async getAll(): Promise<Array<ApiKey>> {
		const { body } = await super.getRequest("apiKeys")
		return body.map(ApiKey.deserialize)
	}

	async create(data: CreateApiKeyData): Promise<PlainTextApiKey> {
		const { body } = await super.postRequest(
			"apiKeys",
			Object.assign(data, {
				permissions: {
					apiKeys: ApiAccessLevel[data.permissions.lobbies],
					lobbies: ApiAccessLevel[data.permissions.apiKeys],
					bots: ApiAccessLevel[data.permissions.bots],
					webhooks: ApiAccessLevel[data.permissions.webhooks]
				}
			})
		)
		return PlainTextApiKey.deserialize(body)
	}

	async update(apiKey: ApiKey, data: UpdateApiKeyData): Promise<ApiKey>
	async update(fragment: string, data: UpdateApiKeyData): Promise<ApiKey>

	async update(
		apiKeyOrFragment: ApiKey | string,
		data: UpdateApiKeyData
	): Promise<ApiKey> {
		const convert = (key: keyof UpdateApiPermissionsData) => {
			if (typeof data.permissions !== "undefined") {
				const permission = data.permissions[key]

				if (typeof permission !== "undefined") {
					const obj = { permissions: {} } as any
					obj.permissions[key] = ApiAccessLevel[permission]
					return obj
				}
			}

			return {}
		}
		const fragment =
			typeof apiKeyOrFragment === "string"
				? apiKeyOrFragment
				: apiKeyOrFragment.fragment
		const { body } = await super.putRequest(
			`apiKeys/${fragment}`,
			Object.assign(
				data,
				convert("apiKeys"),
				convert("lobbies"),
				convert("bots"),
				convert("webhooks")
			)
		)
		return ApiKey.deserialize(body)
	}

	async delete(apiKey: ApiKey): Promise<void>
	async delete(fragment: string): Promise<void>

	async delete(apiKeyOrId: ApiKey | string): Promise<void> {
		const fragment =
			typeof apiKeyOrId === "string" ? apiKeyOrId : apiKeyOrId.fragment
		await super.deleteRequest(`apiKeys/${fragment}`)
	}
}
