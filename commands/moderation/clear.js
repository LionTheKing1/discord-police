const { Comando } = require("../../utils/command.js");
const { MissArguments } = require("../../utils/embeds.js");
const emoji = require('../../utils/emojis.json');

module.exports = class Clear extends Comando {
    constructor(client) {
        super(client, {
            name: "clear",
            aliases: ["limpar"],
            needPermissions: ["MANAGE_MESSAGES"],
            botNeedPermissions: ["MANAGE_MESSAGES"],
            description: "Limparei o número \`x\` de mensagens no canal! x >= 2 || x =< 100",
            usage: "<amount>",
            missArguments: true,
            cooldownType: 'channel',
            cooldownTime: 30000
        })
    }

    async run(client, message, args) {
        const numberSelected = Number(args[0]).toFixed(0); 
        if(isNaN(numberSelected)) return message.channel.send(`${emoji.interruption} **|** ${message.author}, você deve inserir um número válido!`);
        if(numberSelected < 2 || numberSelected > 100) return message.channel.send(`${emoji.interruption} **|** ${message.author}, você deve inserir um número de 2 até 100!`);

        const messageToSay = await message.channel.send(`${emoji.waiting} **|** Apagando mensagens...`)
        const fetchedMessages = await message.channel.messages.fetch({ limit: numberSelected });
        const pinnedMessages = fetchedMessages.filter(msg => msg.pinned)

        return message.channel.bulkDelete(fetchedMessages.filter(msg => !msg.pinned && msg !== messageToSay), { filterOld: true }).then(async messages => {
            const oldMessages = {
                length: numberSelected - pinnedMessages.size - messages.size - 1
            }
            await messageToSay.edit(`${emoji.successful} **|** ${message.author}, \`${messages.size}\` mensagens apagadas com sucesso!${pinnedMessages.size > 0 ? `\n📌 **|** \`${pinnedMessages.size}\` mensagens não foram apagadas por serem fixadas` : ''}${oldMessages.length > 0 ? `\n⏲️ **|** \`${oldMessages.length}\` mensagens não foram apagadas por terem mais de 14 dias` : ''}`);
        });
    }
}