const { Comando } = require('../../utils/command.js');
const { EmbedError } = require('../../utils/embeds.js');
const moment = require('moment');
const timeModel = require('../../database/models/temprole.js')
const emoji = require('../../utils/emojis.json');
const ms = require("milliseconds-parser")();

function userAuthCheck(message, userID) {
    if(!message || !message.guild) {
        message.channel.send(message.author, new EmbedError('message isn\'t found in userAuthCheck function'));
        return false;
    }
        else if(!userID || !message.guild.members.cache.get(userID)) {
            message.channel.send(`${emoji.interruption} **|** ${message.author}, você deve inserir um usuário válido!`);
            return false;
        }
            else return true;
}

function roleAuthCheck(message, roleID) {
    if(!message || !message.guild) {
        message.channel.send(message.author, new EmbedError('message isn\'t found in roleAuthCheck function'));
        return false;
    }
        else if(!roleID || !message.guild.roles.cache.get(roleID)) {
            message.channel.send(`${emoji.interruption} **|** ${message.author}, você deve inserir um cargo válido!`);
            return false;
        }
            else return true;
}

module.exports = class Increase extends Comando {
    constructor(client) {
        super(client, {
            name: 'adicionartempo',
            aliases: ['increasetime', 'increase'],
            description: 'Adicione um tempo desejado de um cargo temporário já definido!',
            usage: '<user> <role> <tempo pra adicionar>',
            needPermissions: ['MANAGE_ROLES'],
            botNeedPermissions: ['MANAGE_ROLES'],
            needArguments: true
        })
    }

    async run(client, message, args) {
        const userArgument = args[0] ? args[0].replace(/<|@|!|>/g, '') : undefined;
        const roleArgument = args[1] ? args[1].replace(/<|@|&|>/g, '') : undefined;
        const timeArgument = args.slice(2).join(' ') ? ms.parse(args.slice(2).join(' ')) : undefined;
        const timeDefined = await client.database.temproles.roles[userArgument + '-' + roleArgument]

        if(!userAuthCheck(message, userArgument)) return;
            else if(!roleAuthCheck(message, roleArgument)) return;
                else if(!timeArgument) return message.channel.send(`${emoji.interruption} **|** Você deve inserir um tempo válido!`);
                    else if(!timeDefined) return message.channel.send(`${emoji.interruption} **|** ${message.author}, o usuário não possui esse cargo temporário! Para definir, utilize o comando \`temprole\`.`);
                        else {
                            timeDefined.expiredAt = Number(timeArgument) + Number(timeDefined.expiredAt);
                            await (await timeModel.findByIdAndUpdate(timeDefined._id, { expiredAt: timeDefined.expiredAt })).save();
                            return message.channel.send(`${emoji.successful} **|** ${message.author}, tempo definido com sucesso! O cargo irá se expirar em: \`${moment(new Date(timeDefined.expiredAt)).format('DD/MM/YYYY HH:mm:ss')}\``)
                        } 
        
    }
}