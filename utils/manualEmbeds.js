const { MessageEmbed } = require("discord.js");
const emoji = require("../utils/emojis.json");
const blueColor = "2EFEF7";

module.exports.config = {
    defaultEmbed: function defaultEmbed(args, embed = {}) {
        const embedMessage = new MessageEmbed()
        .setAuthor(("Info " + args[0].toUpperCase() + args.slice(1).toLowerCase()) || "Default command message", 'https://i.imgur.com/ei0p0hY.png')
        .setDescription(embed.description || "No description provided.")
        .setColor(blueColor)
        .setFooter("Config command")
        .setTimestamp()
    
        if(embed.tutorial) 
        embedMessage.addField(embed.tutorial.title || "No title provided", embed.tutorial.description || "No description provided")
        return embedMessage;
    },

    channelMessage: new MessageEmbed()
    .setTitle("🔧 Configurações")
    .setDescription("Mencione ou digite o ID do canal desejado.")
    .setColor(blueColor)
    .setTimestamp()
}