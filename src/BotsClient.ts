import { Bot } from "@daas/model"
import { AbstractClient } from "./AbstractClient"
import { CreateBotData } from "./interfaces/CreateBotData"
import { handleNotFound } from "./support/handleNotFound"

export class BotsClient extends AbstractClient {
	async get(id: number): Promise<Bot | null> {
		return await handleNotFound(async () => {
			const { body } = await super.getRequest(`bots/${id}`)
			return Bot.deserialize(body)
		})
	}

	async getAll(): Promise<Array<Bot>> {
		const { body } = await super.getRequest("bots")
		return body.map(Bot.deserialize)
	}

	async create(data: CreateBotData): Promise<Bot> {
		const { body } = await super.postRequest("bots", data)
		return Bot.deserialize(body)
	}

	async delete(bot: Bot): Promise<void>
	async delete(id: number): Promise<void>

	async delete(botOrId: Bot | number): Promise<void> {
		const id = typeof botOrId === "number" ? botOrId : botOrId.id
		await this.deleteRequest(`bots/${id}`)
	}
}
