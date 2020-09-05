const { Comando } = require("../../utils/command.js");
const { MessageEmbed } = require("discord.js");
const { PunishmentLogs } = require("../../utils/embeds.js");
const serverDatabase = require("../../database/models/serverconfig.js");
const { findMember } = require("../../functions.js");

function DirectMessage(message, member, guild, reason) {
    const messageToSend = new MessageEmbed()
    .setAuthor(`${member.tag || member.user.tag}`, member.user.displayAvatarURL() || member.displayAvatarURL())
    .setTitle("🚫| Banido!")
    .setDescription(`Você foi banido do servidor **${guild.name}**`)
    .addField(":police_officer: Punido por:", `${message.author.tag} (${message.author.id})`)
    .addField(":pencil: Motivo", `\`${reason}\``, false)
    .setTimestamp()
    .setColor("RED")
    .setThumbnail(guild.iconURL() || "https://i.imgur.com/zCqxg82.png")
    .setFooter("Achou injusto? Contate-nos!", 'https://i.imgur.com/KQG4tao.png')

    return messageToSend;
}

module.exports = class Banir extends Comando {
    constructor(client) {
        super(client, {
            name: "banir",
            aliases: ["ban"],
            needPermissions: ["BAN_MEMBERS"],
            botNeedPermissions: ["BAN_MEMBERS"],
            needArguments: true,
            enable: false,
            usage: "<user> <motivo>"
        })
    }

    async run(client, message, args) { // ban usage: <user> <reason>
        const userToBan = await findMember(message, args[0])
        const reason = args.slice(1).join(" ") || "Não especificado."

        if(!userToBan && !client.users.cache.get(args[0])) return message.reply(`procurei por \`${args[0]}\` e não achei! Certeza que é um usuário válido? :thinking:`)
        if(userToBan) { 
            if(userToBan.id == message.author.id || userToBan.id == client.user.id) return message.reply("eu me recuso a fazer isso :sob:")
            if(!userToBan.bannable) return message.reply("eu não tenho permissão para banir esse usuário!");
            if(userToBan.roles.highest.rawPosition >= message.member.roles.highest.rawPosition && message.guild.ownerID !== message.author.id) return message.reply("você não tem permissão de banir esse usuário!");
            if(!userToBan.user.bot) await userToBan.send(DirectMessage(message, userToBan, message.guild, reason))
        }

        const serverConfig = await (await client.database.servers).findServer(message.guild.id)
        if(await serverConfig.punishmentLogs.enabled && (userToBan || client.users.cache.get(args[0]))) { // em breve isso daqui irá virar uma função
            const punishmentChannel = message.guild.channels.cache.get(serverConfig.punishmentLogs.channelID);

            if(!punishmentChannel) {
                const changeConfig = await serverDatabase.find({ "serverID": message.guild.id });
                const toChange = changeConfig.punishmentLogs = {
                    enabled: false,
                    channelID: ""
                }

                await toChange.save()
                await (await client.database.servers).deleteServer(message.guild.id)
                await (await client.database.servers).addServer(toChange)
                
            }
            else {
                punishmentChannel.send(new PunishmentLogs('Banido', message, userToBan || client.users.cache.get(args[0]), reason));
            }

            await message.guild.members.ban(userToBan || args[0], { reason: `Banido por ${message.author.tag}, motivo: \"${reason}\"`});
            return message.reply(`usuário punido com sucesso!`);

        }

    }
}