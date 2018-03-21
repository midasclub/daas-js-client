import { WebHook, WebHookEventType } from "@daas/model"
import { AbstractClient } from "./AbstractClient"
import { handleNotFound } from "./support/handleNotFound"
import { CreateWebhookData } from "./interfaces/CreateWebhookData"
import { UpdateWebhookData } from "./interfaces/UpdateWebhookData"

export class WebhooksClient extends AbstractClient {
	async get(id: number): Promise<WebHook | null> {
		return await handleNotFound(async () => {
			const { body } = await super.getRequest(`webhooks/${id}`)
			return WebHook.deserialize(body)
		})
	}

	async getAll(): Promise<Array<WebHook>> {
		const { body } = await super.getRequest("webhooks")
		return body.map(WebHook.deserialize)
	}

	async create(data: CreateWebhookData): Promise<WebHook> {
		const { body } = await super.postRequest(
			"webhooks",
			Object.assign(data, {
				eventType: WebHookEventType[data.eventType]
			})
		)
		return WebHook.deserialize(body)
	}

	async update(webhook: WebHook, data: UpdateWebhookData): Promise<WebHook>
	async update(id: number, data: UpdateWebhookData): Promise<WebHook>

	async update(
		webhookOrId: WebHook | number,
		data: UpdateWebhookData
	): Promise<WebHook> {
		const id = typeof webhookOrId === "number" ? webhookOrId : webhookOrId.id
		const { body } = await super.putRequest(
			`webhooks/${id}`,
			Object.assign(
				data,
				typeof data.eventType !== "undefined"
					? {
							eventType: WebHookEventType[data.eventType]
					  }
					: {}
			)
		)
		return WebHook.deserialize(body)
	}

	async delete(webhook: WebHook): Promise<void>
	async delete(id: number): Promise<void>

	async delete(webhookOrId: WebHook | number): Promise<void> {
		const id = typeof webhookOrId === "number" ? webhookOrId : webhookOrId.id
		await this.deleteRequest(`webhooks/${id}`)
	}
}
