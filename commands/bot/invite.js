const { Comando } = require("../../utils/command.js")
const { SimpleEmbed } = require("../../utils/embeds.js")
module.exports = class Invite extends Comando {
    constructor(client) {
        super(client, {
            name: "invite",
            aliases: ["convidar"],
            description: "Me convide para o seu servidor!"
        })
    }
    run(client, message, args) {
        const invite = `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`
        return message.channel.send(message.author, new SimpleEmbed(`Me adicione no seu servidor! [Clique aqui](${invite}).`))
    }
}