const { Comando } = require("../../utils/command.js");
const { MessageEmbed } = require("discord.js");
const { PunishmentLogs } = require("../../utils/embeds.js");
const serverDatabase = require("../../database/models/serverconfig.js");
const { findMember } = require("../../functions.js");

function DirectMessage(message, member, guild, reason) {
    const messageToSend = new MessageEmbed()
    .setAuthor(`${member.tag || member.user.tag}`, member.user.displayAvatarURL() || member.displayAvatarURL())
    .setTitle("🚫| Kickado!")
    .setDescription(`Você foi kickado do servidor **${guild.name}**`)
    .addField(":police_officer: Punido por:", `${message.author.tag} (${message.author.id})`)
    .addField(":pencil: Motivo", `\`${reason}\``, false)
    .setTimestamp()
    .setColor("RED")
    .setThumbnail(guild.iconURL() || "https://i.imgur.com/zCqxg82.png")
    .setFooter("Espero que não faça isso novamente!", 'https://i.imgur.com/KQG4tao.png')

    return messageToSend;
}

module.exports = class Banir extends Comando {
    constructor(client) {
        super(client, {
            name: "kikar",
            aliases: ["kick", "kickar"],
            needPermissions: ["KICK_MEMBERS"],
            botNeedPermissions: ["KICK_MEMBERS"],
            needArguments: true,
            enable: false,
            usage: "<user> <motivo>"
        })
    }

    async run(client, message, args) { // ban usage: <user> <reason>
        const userToKick = await findMember(message, args[0])
        const reason = args.slice(1).join(" ") || "Não especificado."

        if(userToKick) { 
            if(userToKick.id == message.author.id || userToKick.id == client.user.id) return message.reply("eu me recuso a fazer isso :sob:")
            if(!userToKick.kickable) return message.reply("eu não tenho permissão para kickar esse usuário!");
            if(userToKick.roles.highest.rawPosition >= message.member.roles.highest.rawPosition && message.guild.ownerID !== message.author.id) return message.reply("você não tem permissão de kickar esse usuário!");
            if(!userToKick.user.bot) try {
                await userToKick.send(DirectMessage(message, userToKick, message.guild, reason))
            } catch(error) {}
        } 
        else return message.reply(`procurei por \`${args[0]}\` e não achei! Certeza que é um usuário válido? :thinking:`);

        const serverConfig = await client.database.servers.findServer(message.guild.id)
        if(await serverConfig.punishmentLogs.enabled) { // em breve isso daqui irá virar uma função
            const punishmentChannel = message.guild.channels.cache.get(serverConfig.punishmentLogs.channelID);
            
            if(!punishmentChannel) {
                const changeConfig = await serverDatabase.find({ "serverID": message.guild.id });
                const toChange = changeConfig.punishmentLogs = {
                    enabled: false,
                    channelID: ""
                }

                await toChange.save()
               
                client.database.servers.serverManager[message.guild.id].punishmentLogs = {
                    enabled: false,
                    channelID: ""
                }
                
            }
            else {
                punishmentChannel.send(new PunishmentLogs('Kickado', message, userToKick.user, reason));
            }
        }
            await userToKick.kick([`Kickado por ${message.author.tag}, motivo: \"${reason}\"`]);
            return message.reply(`usuário punido com sucesso!`);

        

    }
}