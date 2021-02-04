const { Comando } = require('../../utils/command.js');
const moment = require('moment');

function DirectMessage(message, member, guild, reason) {
    const messageToSend = new MessageEmbed()
    .setAuthor(`${member.tag || member.user.tag}`, member.user.displayAvatarURL() || member.displayAvatarURL())
    .setTitle("🚫| Kickado!")
    .setDescription(`Você foi kickado do servidor **${guild.name}**`)
    .addField(":police_officer: Punido por:", `Automoderador`)
    .addField(":pencil: Motivo", `\`${reason}\``, false)
    .setTimestamp()
    .setColor("RED")
    .setThumbnail(guild.iconURL() || "https://i.imgur.com/zCqxg82.png")
    .setFooter("Espero que não faça isso novamente!", 'https://i.imgur.com/KQG4tao.png')

    return messageToSend;
}

module.exports = class verifyUsers extends Comando {
    constructor(client) {
        super(client, {
            name: "checkUsers",
            aliases: ["verifyusers", "verificarusuarios", "checarusuarios"],
            cooldownType: "guild",
            cooldownTime: 120000
        });
    }

    async run(client, message, args) {
        if(!message.guild.id.includes('654073009304240161')) return;

        const MINIMUM_DATE_ACCOUNT = 1_209_600_000
        const NEW_ACCOUNT_USERS = message.guild.members.cache.filter(member => (Date.now() - moment(member.user.createdAt).valueOf()) < MINIMUM_DATE_ACCOUNT);
        let KICKED_MEMBERS = ``;

        await NEW_ACCOUNT_USERS.forEach(async member => {
            if(member.kickable) {
                try {
                    await member.send(DirectMessage(message, member, message.guild, 'Conta com menos de duas semanas (muito nova).'));
                } catch(error) {}
                    KICKED_MEMBERS += `\n \`${member.user.tag} ${member.user.id}\` removido com sucesso!`
                    member.kick("Minimum age account isn't reached.");
            }
        });

        message.channel.send(`🕵🏻‍♂️ **|** Há \`${NEW_ACCOUNT_USERS.size}\` usuários criados há menos de duas semanas no servidor.\n${KICKED_MEMBERS}`);
    }
}