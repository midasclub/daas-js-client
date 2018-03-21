import { WebHookEventType } from "@daas/model"

export interface UpdateWebhookData {
	eventType?: WebHookEventType
	url?: string
	regenerateSecret?: boolean
}
