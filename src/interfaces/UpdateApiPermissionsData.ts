import { ApiAccessLevel } from "@daas/model"

export interface UpdateApiPermissionsData {
	bots?: ApiAccessLevel
	lobbies?: ApiAccessLevel
	apiKeys?: ApiAccessLevel
	webhooks?: ApiAccessLevel
}
