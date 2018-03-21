import { GameMode, Server } from "@daas/model"
import { CreatePlayerData } from "./CreatePlayerData"

export interface CreateLobbyData {
	name: string
	server: Server
	gameMode: GameMode
	radiantHasFirstPick: boolean
	players: Array<CreatePlayerData>
}
