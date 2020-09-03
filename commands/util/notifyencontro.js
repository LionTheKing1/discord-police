const { Comando } = require("../../utils/command.js");
const { Message } = require("discord.js");

module.exports = class notifyEncontro extends Comando {
    constructor(client) {
        super(client, {
            name: "notificar",
            aliases: ["notify"],
            description: "Seja notificado do encontro!"
        })
    }
    async run(client, message, args) {
        await message.member.roles.add("748997196367790242");
        message.react("✅");
    }
}