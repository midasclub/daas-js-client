import { CreatePlayerData } from "./CreatePlayerData"

export interface CreateLobbyData {
	name: string
	server: String
	gameMode: String
	radiantHasFirstPick: boolean
	players: Array<CreatePlayerData>
}
