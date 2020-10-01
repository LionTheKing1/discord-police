const { MessageEmbed } = require("discord.js");
const { Comando } = require("../../utils/command.js");



module.exports = class botInfo extends Comando {
    constructor(client) {
        super(client, {
            name: "botinfo",
            aliases: ["police", "info"],
            description: "Veja as minhas informações!",
            enabled: false
        })
    }

    async run(client, message, args) {
        const infoEmbed = new MessageEmbed()
        .setColor('2EFEF7')
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        
    }
}