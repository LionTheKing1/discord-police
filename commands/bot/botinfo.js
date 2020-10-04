const { MessageEmbed } = require("discord.js");
const { Comando } = require("../../utils/command.js");
const emoji = require('../../utils/emojis.json');


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
        .setDescription('Obrigado por se interessar em ver minhas informações!')
        .addField('🔧 Programado em:', '<:nodejs:761618994565349387> NodeJS', true)
        .addField(`${emoji.person} Desenvolvedor:`, '`Lion#6221` (317796741024055307)', true)
        .addField('🕐 Uptime', '`Em breve uma função para isso`')
        .addField()
        
    }
}