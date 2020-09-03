const { Comando } = require("../../utils/command.js");
const { MessageEmbed } = require("discord.js");
const { defaultEmbed, channelMessage } = require("../../utils/manualEmbeds.js").config
const { ReactionCollector } = require("discord.js-collector");
const { SimpleEmbed } = require("../../utils/embeds.js");
const { findChannel } = require("../../functions.js")
const blueColor = "2EFEF7";
const emoji = require("../../utils/emojis.json");

module.exports = class Config extends Comando {
    constructor(client) {
        super(client, {
            name: "configurar",
            aliases: ["config"],
            description: "Configure minhas funções no seu servidor!",
            needPermissions: ["MANAGE_GUILD"],
            enable: false,
            botNeedPermissions: ["MANAGE_MESSAGES"]
        })
    }

    async run(client, message, args) {
    const serverConfig = await require("mongoose").model('Servers').findOne({"serverID": message.guild.id})
    const modules = {
        "moderation":
            [
            {
                name: "logs",
                usage: "<canal>",
                description: "Defina o canal que eu irei avisar sobre as punições dos usuários no servidor!",
            },
            {
                name:"oi",
                usage: "usage",
                description: "desc"
            }
        ]
    }


        const configMessage = new MessageEmbed()
        .setAuthor("Configurar Servidor", 'https://i.imgur.com/ei0p0hY.png')
        .setDescription(`**Método de uso:** \`${client.prefix}config <usage>\``)
        .setColor(blueColor)
        .setFooter(`Configurando ${message.guild.name}`, client.user.displayAvatarURL())
        .setTimestamp()
        .addField(`${emoji.meowmoderation} Moderação`, modules.moderation.map(x => `Nome: ${x.name}\nDescrição: ${x.description}\nUsage: config ${x.name} ${x.usage || ""}`).join("\n\n"))


        switch(args[0] ? args[0].toLowerCase() : "") {
            case "logs":

                const botMessage = await message.channel.send(message.author,defaultEmbed(args[0], {
                        tutorial: {
                            title: "Atualize as definições!",
                            description: "Reaja com **\"📜\"** para alterar o canal no qual irei lhe informar sobre as punições do servidor.\nReaja com **\"🗑️\"** para resetar as definições."
                        },
                        description: `**Canal atual**: ${serverConfig.punishmentLogs.channelID.length > 0 ? `<#${serverConfig.punishmentLogs.channelID}>` : "Sem canal definido."}`
                    }))
            
            default: 
            return message.channel.send(message.author, configMessage)
        }
    }
}