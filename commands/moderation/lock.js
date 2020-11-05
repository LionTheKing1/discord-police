const { Comando } = require("../../utils/command.js");

module.exports = class Lock extends Comando {
    constructor(client) {
        super(client, {
            name: "lock",
            aliases: ["travar"],
            description: "Eu tirarei a permissão de **everyone** para mandar mensagens em seu canal.",
            botNeedPermissions: ["MANAGE_CHANNELS"],
            needPermissions: ["MANAGE_CHANNELS"],
        })
    }
    async run(client, message) {

        message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
            });
            
        message.reply(`canal bloqueado com sucesso! Utilize o comando \`${client.prefix}unlock\` para desbloquear.`);
        return;
    }
}