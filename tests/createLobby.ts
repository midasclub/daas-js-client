import { DaasApiClient } from "../index"

async function main () {
  const daas = new DaasApiClient("DAAS_URL", "DAAS_API_KEY")

  const daasLobby = await daas.Lobbies.create({
    name: "Lobby Test",
    server: "BRAZIL",
    gameMode: "ALL_PICK",
    radiantHasFirstPick: true,
    players: [
      {
        "steamId": "XXXXXXXXXXXXXXXX",
        "isRadiant": true,
        "isCaptain": true
      },
      {
        "steamId": "XXXXXXXXXXXXXXXX",
        "isRadiant": true,
        "isCaptain": false
      },
      {
        "steamId": "XXXXXXXXXXXXXXXX",
        "isRadiant": true,
        "isCaptain": false
      },
      {
        "steamId": "XXXXXXXXXXXXXXXX",
        "isRadiant": true,
        "isCaptain": false
      },
      {
        "steamId": "XXXXXXXXXXXXXXXX",
        "isRadiant": true,
        "isCaptain": false
      },
      {
        "steamId": "XXXXXXXXXXXXXXXX",
        "isRadiant": false,
        "isCaptain": false
      },
      {
        "steamId": "XXXXXXXXXXXXXXXX",
        "isRadiant": false,
        "isCaptain": false
      },
      {
        "steamId": "XXXXXXXXXXXXXXXX",
        "isRadiant": false,
        "isCaptain": true
      },
      {
        "steamId": "XXXXXXXXXXXXXXXX",
        "isRadiant": false,
        "isCaptain": false
      },
      {
        "steamId": "XXXXXXXXXXXXXXXX",
        "isRadiant": false,
        "isCaptain": false
      }
    ]
  })

  if(daasLobby.status === 0) {
    console.log("Lobby created successfully!")
    console.log(JSON.stringify(daasLobby, null, 2))
  } else {
    console.log("Error creating Lobby")
    console.log(JSON.stringify(daasLobby, null, 2))
  }
} 

main().catch(console.error)