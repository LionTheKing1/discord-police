const { Comando } = require("../../utils/command.js");
const { MessageEmbed } = require("discord.js");

module.exports = class GuildIcon extends Comando {
    constructor(client) {
        super(client, {
            name: "guildicon",
            aliases: ["servericon"],
            description: "Veja o ícone do seu servidor!",
            usage: "<serverID>",
        })
    }
    run(client, message, args) {
        const guild = client.guilds.cache.get(args[0]) || message.guild

        if(!guild.iconURL()) return message.reply("o servidor não possui nenhum ícone! :sob:")
        const guildIcon = new MessageEmbed()
        .setTitle("🖼️ " + guild.name)
        .setDescription(`**[Clique aqui](${guild.iconURL({size: 2048, dynamic: true})}) para baixar a imagem.**`)
        .setImage(guild.iconURL({size: 2048, dynamic: true}))
        .setFooter(`guildIcon Command`, client.user.displayAvatarURL())
        .setTimestamp()

        return message.channel.send(message.author, guildIcon)
    }
}