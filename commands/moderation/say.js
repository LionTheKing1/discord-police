const { Comando } = require("../../utils/command.js")
const { findAnimatedEmojis } = require("../../functions.js")
const { MessageMentions } = require("discord.js")
const { EmbedError } = require("../../utils/embeds.js")

module.exports = class Say extends Comando {
    constructor(client) {
        super(client, {
            name: "say",
            aliases: ["falar"],
            description: "Eu falo a frase que você quiser!",
            usage: "<canal> <frase>",
            needPermissions: ["MANAGE_GUILD"],
            botNeedPermissions: ["MANAGE_GUILD"],
            needArguments: true
        })
    }
    async run(client, message, args) {
        const channelToSay = message.guild.channels.cache.get(args[0]) || (args[0].match(MessageMentions.CHANNELS_PATTERN) ? message.mentions.channels.first() : false ) || message.channel     
        const messageToParse = message.guild.channels.cache.get(args[0].replace(/<|#|>/g, "")) ? args.slice(1) : args
        const messageToFind = await findAnimatedEmojis(message, messageToParse)
        if(messageToParse.length < 1) return message.reply("você precisa inserir um texto!")

        try {
            var messageToSay = JSON.parse(messageToFind.join(" "))
        } 
        catch(error) {
                messageToSay = messageToFind.join(" ")
        }
    
        return channelToSay.send(messageToSay).catch(error => {
            message.channel.send(message.author, new EmbedError(error))
        })
    }
}

