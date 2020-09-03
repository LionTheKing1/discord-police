const { Comando } = require("../../utils/command.js")

module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Veja os status da minha conexão com o servidor.",
        })
    }
        run(client, message, args) {
            return message.channel.send(`🏓**|** ${message.author} **Pong!**\n\`\`Gateway Ping: ${Date.now() - message.createdTimestamp}ms\`\`\n \`\`API: ${client.ws.ping}ms\`\``)
        }
}