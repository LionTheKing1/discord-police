const { Comando } = require('../../utils/command.js');
const serverModel = require('../../database/models/serverconfig.js');
const emoji = require('../../utils/emojis.json');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = class setPrefix extends Comando {
    constructor(client) {
        super(client, {
            name: 'prefixo',
            aliases: ['setprefix', 'prefix'],
            description: "Altere o meu prefixo em seu servidor!",
            needArguments: true,
            needPermissions: ['MANAGE_GUILD'],
            cooldownType: "guild",
            cooldownTime: 30000
        })
    }

    async run(client, message, args) {
        const toChange = args[0];

        if(toChange.length > 4) return message.channel.send(`${emoji.interruption} **|** ${message.author}, você precisa inserir um prefixo com 4 ou menos caracteres!`);
        if(!toChange || toChange.length < 1) return message.channel.send(`${emoji.interruption} **|** ${message.author}, você precisa inserir um prefixo válido!`);
    
        const messageToReply = await message.channel.send(`${emoji.waiting} **|** ${message.author}, Alterando o prefixo para \`${toChange}\``);
        const serverConfig = await serverModel.findOne({ serverID: message.guild.id })
        serverConfig.prefix = toChange

        await serverConfig.save()
        client.database.servers.serverManager[message.guild.id] = {
            prefix: toChange
        }

        await sleep(2000)
        return messageToReply.edit(`✅ ${message.author}, o prefixo do servidor foi alterado para \`${toChange}\` com sucesso!`)
    }
}