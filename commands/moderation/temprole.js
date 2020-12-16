const { Comando } = require("../../utils/command.js");
const { findMember } = require("../../functions.js");
const { MissArguments } = require("../../utils/embeds.js");
const serverConfig = require("../../database/models/temprole.js");
const emoji = require('../../utils/emojis.json');
const moment = require('moment');
const ms = require("milliseconds-parser")();

module.exports = class tempRole extends Comando {
    constructor(client) {
        super(client, {
            name: "temprole",
            needPermissions: ["MANAGE_ROLES"],
            botNeedPermissions: ["MANAGE_ROLES"],
            description: "Eu darei um cargo temporário para o usuário definido!",
            usage: "<user> <role|roleID> <tempo>",
            needArguments: true,
        })
    }

    async run(client, message, args) {
        const memberToAddRole = findMember(message, args[0]);
        if(!memberToAddRole) return message.channel.send(message.author, new MissArguments(client.commands.get("temprole")));

        const roleToAdd = message.guild.roles.cache.get(args[1].replace(/<|@|&|>/g, ""));
        if(!roleToAdd) return message.reply("você precisa adicionar um cargo válido!");
        if(memberToAddRole.roles.cache.has(roleToAdd.id)) return message.reply("o usuário já possui esse cargo!");
        if(message.member.roles.highest.rawPosition <= roleToAdd.rawPosition) return message.reply("você não pode adicionar cargos maiores/igual ao seu!");
        if(!roleToAdd.editable) return message.reply("eu não consigo entregar o cargo, é maior que o meu :sob:")


        const time = ms.parse(args.slice(2).join(" "));
        if(!time || time < 60000) return message.reply("você precisa adicionar um tempo válido. Duração mínima: 1 minuto");

        const temprole = new serverConfig ({
            serverID: message.guild.id,
            roleID: roleToAdd.id,
            userID: memberToAddRole.id,
            createdAt: Date.now(),
            expiredAt: Date.now() + time
        })
        
        await temprole.save();
        await client.addTempRole(temprole);
        await memberToAddRole.roles.add(roleToAdd.id);
        return message.channel.send(`${emoji.successful} **|** ${message.author}, cargo temporário adicionado com sucesso! Irá se expirar em: \`${moment(Date.now() + time).format('DD/MM/YYYY HH:mm:ss')}\`.`);
    }
}