import { Lobby, LobbyStatus, MatchResult } from "@daas/model"
import { AbstractClient } from "./AbstractClient"
import { handleNotFound } from "./support/handleNotFound"
import { CreateLobbyData } from "./interfaces/CreateLobbyData"
import { UpdateLobbyData } from "./interfaces/UpdateLobbyData"

export class LobbiesClient extends AbstractClient {
	async get(id: number): Promise<Lobby | null> {
		return await handleNotFound(async () => {
			const { body } = await super.getRequest(`lobbies/${id}`)
			return Lobby.deserialize(body)
		})
	}

	async getAll(): Promise<Array<Lobby>> {
		const { body } = await super.getRequest("lobbies")
		const lobbies = body.map(Lobby.deserialize) as Array<Lobby>

		lobbies.forEach(lobby => {
			lobby.players = []
		})

		return lobbies
	}

	async create(data: CreateLobbyData): Promise<Lobby> {
		const { body } = await super.postRequest(
			"lobbies",
			Object.assign(data, {
				server: data.server,
				gameMode: data.gameMode
			})
		)
		return Lobby.deserialize(body)
	}

	async update(lobby: Lobby, data: UpdateLobbyData): Promise<Lobby>
	async update(id: number, data: UpdateLobbyData): Promise<Lobby>

	async update(
		lobbyOrId: Lobby | number,
		data: UpdateLobbyData
	): Promise<Lobby> {
		const id = typeof lobbyOrId === "number" ? lobbyOrId : lobbyOrId.id
		const { body } = await super.putRequest(
			`lobbies/${id}`,
			Object.assign(
				data,
				typeof data.matchResult !== "undefined"
					? {
							matchResult: MatchResult[data.matchResult]
					  }
					: {},
				typeof data.status !== "undefined"
					? {
							status: LobbyStatus[data.status]
					  }
					: {}
			)
		)
		return Lobby.deserialize(body)
	}

	async delete(lobby: Lobby): Promise<void>
	async delete(id: number): Promise<void>

	async delete(lobbyOrId: Lobby | number): Promise<void> {
		const id = typeof lobbyOrId === "number" ? lobbyOrId : lobbyOrId.id
		await super.deleteRequest(`lobbies/${id}`)
	}
}
