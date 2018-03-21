import { WebHookEventType } from "@daas/model"

export interface CreateWebhookData {
	eventType: WebHookEventType
	url: string
}
