const { MessageEmbed } = require("discord.js");
const emoji = require("../utils/emojis.json")
const blueColor = "2EFEF7"
const traductText = {
    "BAN_MEMBERS": "Banir usuários",
    "KICK_MEMBERS": "Kickar usuários",
    "ADMINISTRATOR": "Administrador",
    "CREATE_INSTANT_INVITE": "Criar convites",
    "MANAGE_CHANNELS": "Gerenciar canais",
    "MANAGE_GUILD": "Gerenciar servidor",
    "ADD_REACTIONS": "Adicionar reações",
    "VIEW_AUDIT_LOG": "Ver o registro de auditoria",
    "SEND_MESSAGES": "Enviar mensagens",
    "MANAGE_MESSAGES": "Gerenciar mensagens",
    "MENTION_EVERYONE": "Mencionar everyone",
    "MANAGE_ROLES": "Gerenciar cargos"
}
module.exports.BotMentions = class botMentions extends MessageEmbed {
    constructor(membro, bot, prefix){
        super();
        this.setAuthor(`Hey, ${membro.username}!`, membro.displayAvatarURL())
        this.setDescription(`Meu nome é \`\`${bot.user.username}\`\` e meu prefixo nesse servidor é \`\`${prefix}\`\``)
        this.addField(`${emoji.discord} Me conheça mais`, `Escreva \`\`${prefix}help\`\` para ver meus comandos!`)
        this.setColor(blueColor)
        this.setTimestamp()
    }
}

module.exports.MissingPermissions = class MissingPermissions extends MessageEmbed {
    constructor(permissions) { 
        super();
        this.setAuthor(`Sem permissão!`, 'https://i.imgur.com/dEKr7rK.png')
        this.setDescription(`Você precisa ter a permissão de \`\`${traductText[permissions] || permissions}\`\` para prosseguir com o comando!`)
        this.setColor("RED")
        this.setTimestamp()
    }
}

module.exports.botMissingPermissions = class botMissingPermissions extends MessageEmbed {
    constructor(permissions) {
        super();
        this.setAuthor(`Eu não tenho permissão! :sob:`, "https://i.imgur.com/dEKr7rK.png")
        this.setDescription(`Eu preciso ter a permissão de ${traductText[permissions] || permissions} para prosseguir com o comando!`)
        this.setColor("RED")
        this.setTimestamp()
    }
}

module.exports.SimpleEmbed = class SimpleEmbed extends MessageEmbed {
    constructor(description) {
        super(); 
        this.setDescription(description)
        this.setColor(blueColor)
        this.setTimestamp()
    }
}

module.exports.MissArguments = class MissArguments extends MessageEmbed {
    constructor(command) {
        super();
        this.setTitle(`${emoji.discord} ${command.name.slice(0, 1).toUpperCase()}${command.name.slice(1).toLowerCase()} Command`)
        this.setColor(blueColor)
        this.setTimestamp()
        this.setDescription(`**Descrição:** ${command.description}\n**Usage:** ${command.usage}\n**Permissões necessárias:** ${traductText[command.needPermissions] || command.needPermissions || "Nenhuma"}\n**Aliases:** ${(command.aliases.length > 0) ? command.aliases.join(", ") : "Nenhuma"} ${(command.onlyOwner) ? "\n\n\`\`Esse comando é destinado apenas para o desenvolvedor!\`\`" : ""}`)
    }
}

module.exports.EmbedError = class EmbedError extends MessageEmbed {
    constructor(error) {
        super();
        this.setTitle(`Erro!`)
        this.setDescription(`\`\`\`js\n${error}\`\`\``)
        this.setFooter("Algo de errado aconteceu 😭", "https://i.imgur.com/dEKr7rK.png")
        this.setColor("RED")
        this.setTimestamp()
    }
}

module.exports.PunishmentLogs = class PunishmentLogs extends MessageEmbed {
    constructor(punishment = "I don't know", admin = "Divine forces", member = "Invalid Member", reason = "Unknown reason") {
        super();
        this.setFooter("Punishment Log", "https://i.imgur.com/zCqxg82.png")
        this.setTimestamp()
        this.setColor("RED")
        this.setTitle(`${member.username || member.user.username} | ${punishment}`)
        this.setDescription(`O usuário foi ${punishment.toLowerCase()} por quebrar as regras do servidor. Isso que dá infringir regras por aí! 😡`)
        this.addField(`Tag do usuário`, `\`\`${member.tag || member.user.tag}\`\``, true)
        this.addField(`ID do usuário`, `\`\`${member.id}\`\``, true)
        this.addField(`Quem puniu`, `\`\`${admin.author.tag || "Não sei :thinking:"}\`\``, true)
        this.addField(`Motivo`, `\`\`${reason}\`\``, false)
        this.setThumbnail(member.user.displayAvatarURL() || member.displayAvatarURL())
    }
}