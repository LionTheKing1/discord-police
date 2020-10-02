const fs = require("fs")
const { BotMentions, MissingPermissions, botMissingPermissions, MissArguments} = require("../utils/embeds.js")
const emoji = require("../utils/emojis.json")
const stringSimilarity = require('string-similarity');

module.exports = class commandHandler {
    constructor(client, local = './commands/') {
        this.client = client;
        this.local = local;
        this.prefix = client.prefix;
        this.init();
    }

    init() {
        fs.readdirSync('./commands/').forEach(directory => {
            const commandFile = fs.readdirSync(`./commands/${directory}/`).filter(file => file.endsWith(".js"))
        
            for (const file of commandFile) {
                const comando = require(`../commands/${directory}/${file}`);
                const command = new (comando)
                if (command.name) this.client.commands.set(command.name.toLowerCase(), command);
                else console.log(`Error in command ${file}: Name is not defined!`);

                if (command.aliases) command.aliases.forEach(aliase => this.client.aliases.set(aliase, command.name.toLowerCase()))
            }
        })

        this.ready();
    }

    async ready() {
        this.client.on('message', async message => {
            if (message.channel.type == "dm") return;
            if (message.author.bot) return;

            const serverConfig = await this.client.database.servers.findServer(message.guild.id);
            if (message.content == (`<@!${this.client.user.id}>`)) return message.channel.send(message.author, new BotMentions(message.author, this.client, serverConfig ? serverConfig.prefix : this.prefix))
            if (!message.content.startsWith(serverConfig ? serverConfig.prefix : this.prefix)) return;
            
            const commandName = message.content.split(" ").shift().slice(serverConfig ? serverConfig.prefix.length : this.prefix.length).toLowerCase();
            const command = this.client.commands.get(commandName) || this.client.commands.get(this.client.aliases.get(commandName))
            const args = message.content.split(" ").slice(1)
            if (!command && commandName.length < 2 || commandName.match(/[a-z]/i) == null) return
            if (!command && serverConfig.blockedChannels && serverConfig.blockedChannels.includes(message.channel.id) && !message.member.hasPermission("MANAGE_MESSAGES") && !message.channel.permissionsFor(message.author).has("MANAGE_MESSAGES")) {
                let messageToSay = [`Comando não encontrado!`]
                let elementsToCompare = [...this.client.commands.map(cmd => cmd.name)];
                this.client.aliases.forEach(aliase => elementsToCompare.push(...aliase))

                const similaridade = stringSimilarity.findBestMatch(commandName, elementsToCompare)
                if (similaridade.bestMatch.rating > 0.5)
                    messageToSay.push(`Você quis dizer: \`\`${similaridade.bestMatch.target}\`\``)

                return message.channel.send(`${emoji.interruption} **|** ${message.author} ${messageToSay.join("\n\n")}`)
            }

            if(serverConfig && (serverConfig.blockedChannels).includes(message.channel.id) && !message.member.hasPermission("MANAGE_MESSAGES") && !message.channel.permissionsFor(message.author).has("MANAGE_MESSAGES")) return message.react("739628740493181000");
            console.log(serverConfig)
            console.log(`[LOGS] Command ${commandName} used in ${message.guild.id}`)
            
                    if (command.exclusiveCommand(message))
                        if (command.enabled(message))
                            if((command.missArguments(args) && command.missArguments(args) > 0) || command.missArguments(args) == undefined) 
                                if (command.botHasPermission(message))
                                    if (command.hasPermission(message))   
                                        if (await (await command.cooldownPass(message))[0]){                 
                                            command.run(this.client, message, args) 
                                            command.cooldown(message)   } 
                                        else return message.channel.send(`${emoji.interruption} **|** ${message.author}, você precisa esperar **${await (await command.cooldownPass(message))[1]}** segundos para usar esse comando!`)
                                    else return message.channel.send(message.author, new MissingPermissions(command.needPermissions || "Houve um bug comigo :o"))
                                else return message.channel.send(message.author, new botMissingPermissions(command.needPermissions || "Houve um bug comigo :o"))
                            else return message.channel.send(message.author, new MissArguments(command, ))
                        else return message.reply("esse comando está desativado temporariamente!")
                    else return message.channel.send(`${emoji.interruption} ${message.author} **|** Esse comando é exclusivo para desenvolvedores!`)
                
        })
    }
} 