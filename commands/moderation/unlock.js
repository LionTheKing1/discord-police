const { Comando } = require("../../utils/command.js");

module.exports = class Unlock extends Comando {
    constructor(client) {
        super(client, {
            name: "unlock",
            aliases: ["destravar"],
            description: "Eu deixarei a permissão de **everyone** neutra para todos poderem seguir com as suas falas normalmente, caso tenha permissão.",
            needPermissions: ["MANAGE_CHANNELS"],
            botNeedPermissions: ["MANAGE_CHANNELS"]
        })
    }
    run(client, message) { 
        message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: null
            });
            
        message.reply(`canal desbloqueado com sucesso! Utilize o comando \`${client.prefix}lock\` para bloquear.`);
        return;
    }
}