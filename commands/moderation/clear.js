const { Comando } = require("../../utils/command.js");
const { MissArguments } = require("../../utils/embeds.js");

module.exports = class Clear extends Comando {
    constructor(client) {
        super(client, {
            name: "clear",
            aliases: ["limpar"],
            needPermissions: ["MANAGE_MESSAGES"],
            botNeedPermissions: ["MANAGE_MESSAGES"],
            description: "Limparei o número \`x\` de mensagens no canal! x >= 2 || x =< 100",
            usage: "<amount>",
            missArguments: true
        })
    }

    async run(client, message, args) {
        const numberToClear = Number(args[0]).toFixed(0)
        if(isNaN(numberToClear) || numberToClear < 2 || numberToClear > 100) return message.channel.send(message.author, new MissArguments(client.commands.get("clear")));
        const messagesToClear = await message.channel.messages.fetch({ limit: numberToClear }).then(msg => msg.filter(x => !x.pinned && x.id !== message.id));
        const botMessage = await message.channel.send(`Limpando \`${numberToClear}\` mensagens...`);
        await message.channel.bulkDelete(messagesToClear, { filterOld: true}).then(async msg => {
            const clearedMessages = msg.size,
             oldMessages = messagesToClear.size - clearedMessages,
              pinnedMessages = numberToClear - messagesToClear.size,
               finalMessage = [`\`${clearedMessages}\` mensagens excluídas com sucesso!`];

               if(oldMessages > 0) finalMessage.push(`\n*Foram encontradas \`${oldMessages}\` mensagens com mais de duas semanas.*`);
               if(pinnedMessages > 0) finalMessage.push(`\n*Foram mantidas \`${pinnedMessages}\` mensagens por serem fixadas.*`);
               if(clearedMessages == 0) return await botMessage.edit("Eu não encontrei nenhuma mensagem para apagar!");
               
              return await botMessage.edit(finalMessage.join(" "));
        })
    }
}