const { Comando } = require("../../utils/command.js");
const emoji = require("../../utils/emojis.json");
const { MessageEmbed } = require("discord.js");
const fs = require("fs");

function getNumberCommands(client, dir) { 
    let numberToRemove = 0;
    dir.filter(x => x.startsWith('noReply')).forEach(directories => {
        fs.readdirSync(`./commands/${directories}/`).forEach(() => numberToRemove++)    
    })

    return client.commands.size - numberToRemove
}

module.exports = class Help extends Comando {
    constructor(client) {
        super(client, {
            name: "help",
            aliases: ["ajuda"],
            description: "Veja todos os meus comandos!"
        });
    } // Automatic Help Command

    async run(client, message, args) {
        const prefix = (await client.database.servers.findServer(message.guild.id)).prefix || client.commandHandler.prefix
        const helpMessage = new MessageEmbed()
        .setThumbnail("https://i.imgur.com/mDMZRz4.png")
        .setFooter(`Possuo ${getNumberCommands(client, fs.readdirSync('./commands/'))} comandos atualmente!`, client.user.displayAvatarURL())
        .setColor("2EFEF7")
        .setTimestamp()

        function findCommand(command) {
            return client.commands.get(command) || client.commands.get(client.aliases.get(command))
        }

        if(!findCommand(args[0])) {
            helpMessage.setTitle(`${emoji.discord} Comandos`)
            helpMessage.addField(`⚙️ Modo de uso`, `\`\`${prefix}help [comando]\`\``, false)

            fs.readdirSync('./commands/').filter(x => !x.startsWith("noReply")).forEach(directories => {
                const commands = fs.readdirSync(`./commands/${directories}/`)
                helpMessage.addField(`▫️ ${directories} [${commands.length}]`, commands.map(x => `\`\`${x.replace(".js", "")}\`\``).join(" "))
                })

            return message.channel.send(message.author, helpMessage)
        }

        else {
            const command = findCommand(args[0])

            helpMessage.setDescription(`**Descrição:** ${command.description}\n**Usage:** ${command.usage}\n**Permissões necessárias:** ${command.needPermissions || "Nenhuma"}\n**Aliases:** ${(command.aliases.length > 0) ? command.aliases.join(", ") : "Nenhuma"}`)
            helpMessage.setTitle(`${emoji.discord} ${command.name.slice(0, 1).toUpperCase()}${command.name.slice(1).toLowerCase()} Command`)
            
            return message.channel.send(message.author, helpMessage)
        }
    }
}
