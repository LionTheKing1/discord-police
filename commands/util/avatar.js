const { Comando } = require("../../utils/command.js");
const { findUser } = require("../../functions.js");
const { MessageEmbed } = require("discord.js");

module.exports = class Avatar extends Comando {
    constructor(client) {
        super(client, {
            name: "avatar",
            aliases: ["icon"],
            description: "Veja o avatar de um usuário!",
            usage: "<user>"
        })
    }

    run(client, message, args) {
        const userToView = findUser(client, args[0]) || message.author
        const embedAvatar = new MessageEmbed()
        .setTitle("🖼️ " + userToView.username || userToView.user.username)
        .setDescription(`**[Clique aqui](${userToView.displayAvatarURL({size: 2048, dynamic: true})}) para baixar a imagem.**`)
        .setImage(userToView.displayAvatarURL({size: 2048, dynamic: true}))
        .setFooter(`Avatar Command`, client.user.displayAvatarURL())
        .setTimestamp()

        return message.channel.send(message.author, embedAvatar)
    }
}