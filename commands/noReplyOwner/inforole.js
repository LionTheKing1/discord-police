const { Comando } = require("../../utils/command.js");
const { findMember } = require("../../functions.js")
module.exports = class infoRole extends Comando {
    constructor(client) {
        super(client, {
            name: "inforole",
            onlyOwner: true,
            needArguments: true,
            description: "Veja as informações de um cargo temporário!",
            usage: "<user>"
        })
    }
    async run(client, message, args) {
        const memberToView = findMember(message, args[0]);
        if(!memberToView) return message.reply("você precisa mencionar alguém!");

        const Config = require("../../database/models/temprole.js")
        const serverConfig =  await Config.findOne({serverID: message.guild.id, userID: memberToView.id})
        if(!serverConfig) return message.reply("status: não encontrado");
        else return message.reply(serverConfig.expiredAt < Date.now())
        
    }
} 