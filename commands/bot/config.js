const { Comando } = require("../../utils/command.js");
const emoji = require("../../utils/emojis.json");
const serverModel = require("../../database/models/serverconfig.js");
const { MessageEmbed } = require("discord.js");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = class Config extends Comando {
    constructor(client) {
        super(client, {
            name: "configurar",
            aliases: ["configurarbot", "botconfig", "config"],
            needPermissions: ["MANAGE_GUILD"],
            botNeedPermissions: ["MANAGE_CHANNELS"],
            cooldownType: 'guild',
            cooldownTime: 10000
        })
    }

    async run(client, message, args) {
        const argument = args[0] ? args[0].toLowerCase() : "";
        const toChange = args[1]
        const serverConfigDB = await serverModel.findOne({ serverID: message.guild.id });
        const serverConfig = await client.database.servers.findServer(message.guild.id);
        const interruption = `${emoji.interruption} **|** ${message.author}, `
        const waiting = `${emoji.waiting} **|** ${message.author}, `


        if(argument == 'prefix' || argument == 'prefixo') {
            const defaultPrefix = serverConfig.prefix

            if(toChange == defaultPrefix) return message.channel.send(interruption + 'esse prefixo já está definido!')
            if(!toChange || toChange.length < 1) return message.channel.send(interruption + 'você precisa inserir um prefixo válido!');
            if(toChange.length > 4) return message.channel.send(interruption + 'você precisa inserir um prefixo com 4 ou menos caracteres!');

            const messageToReply = await message.channel.send(waiting + `alterando o prefixo para \`${toChange}\``);

            serverConfigDB.prefix = toChange;

            await serverConfigDB.save()
            client.database.servers.serverManager[message.guild.id] = {
                prefix: toChange
            }

            await sleep(2000);
            return messageToReply.edit(`✅ ${message.author}, o prefixo do servidor foi alterado para \`${toChange}\` com sucesso!`)
        }

        else if(argument == 'punições' || argument == 'puniçoes' || argument == 'punicoes' || argument == 'punicões') {
            const channelToChange = toChange ? toChange.replace(/<|#|>/g, "") : "";
            const channelToManage = message.guild.channels.cache.get(channelToChange);

            if(channelToChange == 'limpar' || channelToChange == 'clear') {
                serverConfigDB.punishmentLogs = {
                    enabled: false,
                    channelID: ""
                }

                await serverConfigDB.save()
                client.database.servers.serverManager[message.guild.id].punishmentLogs = {
                    enabled: false,
                    channelID: ""
                }

                return message.reply('canal de punições resetado com sucesso!')
            }

            if(!channelToChange || !channelToManage) return message.channel.send(interruption + 'você precisa inserir um canal válido!');
            if(!channelToManage.permissionsFor(message.guild.me).has(['SEND_MESSAGES'])) return message.channel.send(interruption + 'eu preciso da permissão de `Enviar Mensagens` no canal escolhido!');

            const messageToReply = await message.channel.send(`${emoji.waiting} **|** Adicionando o canal ${toChange}...`);

            serverConfigDB.punishmentLogs = {
                enabled: true,
                channelID: channelToChange
            }

            await serverConfigDB.save()

            client.database.servers.serverManager[message.guild.id].punishmentLogs = {
                enabled: true,
                channelID: channelToChange
            }

            await sleep(2000)
            return messageToReply.edit(`✅ Canal ${toChange} adicionado com sucesso!`);
        }

        else if(argument == 'bloquear' || argument == 'bloquearcanal') {
            const repliedChannel = message.mentions.channels.keys() || toChange ? [toChange.replace(/<|#|>/g, "")] : [""];
            const channelsToAdd = repliedChannel.filter(channelID => message.guild.channels.cache.get(channelID));

            if(toChange == 'limpar' || toChange == 'clear') {
                serverConfigDB.blockedChannels = [];
                await serverConfigDB.save();
                client.database.servers.serverManager[message.guild.id].blockedChannels = [];
                return message.reply("canais limpos com sucesso!");
            }

            if(channelsToAdd.length < 1) return message.channel.send(interruption + 'você precisa adicionar um canal válido!');
            
            serverConfigDB.blockedChannels.push(...channelsToAdd);
            await serverConfigDB.save();
            client.database.servers.serverManager[message.guild.id].blockedChannels.push(...channelsToAdd);
            
            return message.reply("adicionado com sucesso!");
        }

        else {
            const embedConfig = new MessageEmbed()
            .setAuthor('Configurando o servidor', 'https://i.imgur.com/CfJV7P0.png')
            .setColor('ORANGE')
            .setDescription('Aqui você verá todas as funções configuráveis e personalizáveis para você!')
            .addField('🔧 Prefixo do servidor:', `Para alterar meu prefixo neste servidor, utilize o comando \`${serverConfig.prefix}configurar prefixo <novoPrefixo>\``)
            .addField('🔧 Canal de punições:', `Para definir um canal no qual irei informar as punições que apliquei nos usuários do servidor, utilize \`${serverConfig.prefix}configurar punições <Canal>\`\n\n${emoji.trash} **Para limpar a definição, utilize o comando \`${serverConfig.prefix}configurar punições limpar\`**`)
            .addField('🔧 Canais bloqueados:', `Para adicionar um canal na lista de bloqueados (não responderei comandos de pessoas que não possuem a permissão de \`Gerenciar Mensagens\`), utilize \`${serverConfig.prefix}configurar bloquear <canal>\``)
            .setFooter(message.guild.name, message.guild.iconURL() || "https://i.imgur.com/zCqxg82.png")
            .setTimestamp()

            return message.channel.send(message.author, embedConfig)
        }
    }
}