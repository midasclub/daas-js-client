import { LobbyStatus, MatchResult } from "@daas/model"

export interface UpdateLobbyData {
	status?: LobbyStatus.CANCELLED
	matchResult?: MatchResult
}
