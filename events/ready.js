module.exports = async (client) => {
    console.clear()
    console.log(`Hello everyone, i'm there!`)

    setInterval(() => {
        const statuses = ["online", "dnd", "idle"]
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const presenceList = [
            {
                type: "PLAYING",
                name: "Counter Strike: Global Offensive"
            }, {
                type: "PLAYING",
                name: "me mencione para mais informações!"
            }, {
                type: "STREAMING",
                name: `com ${client.guilds.cache.map((x) => x.memberCount).reduce((p, c) => p + c)} usuários!`
            }
        ]
        const presence = presenceList[Math.floor(Math.random() * presenceList.length)]

        client.user.setPresence({ activity: presence, status: status})
    }, 30000)

    setInterval(() => {

    }, 10000)


}