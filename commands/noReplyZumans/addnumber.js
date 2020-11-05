const { Comando } = require('../../utils/command.js');
const adcNumber = require('../../database/models/addPrivilegiatedRoles');

module.exports = class addNumber extends Comando {
    constructor(client) {
    super(client, {
            name: 'numero',
            aliases: ['number'],
            needPermissions: ['MANAGE_SERVER'],
            needArguments: true,
            description: 'Registre o número de algum usuário para receber as vantagens',
            usage: '<user> <numero>'
        })
    }

    async run(client, message, args) {
        const userID = args[0].replace(/<|@|!|>/g, '');
        const number = args.slice(1).join(' ')

        if(!userID || !message.guild.members.cache.get(userID)) return message.reply('você precisa inserir um usuário válido!');

        const userHasNumber = await adcNumber.findOne({userID: userID});
        
        if(userHasNumber) return message.reply(`esse usuário já está registrado com o número de \`${userHasNumber.number}\`!`);
        if(!number || number.length < 1) return message.reply('você precisa inserir um número para o usuário!');
        if(number == 'apagar' || number == 'delete') {
            await adcNumber.findOneAndDelete({ userID: userID })
            return message.reply('successful deleted!')
        }


        await (new adcNumber({
            userID: userID,
            number: number
        })).save();

        return message.reply('user successful added in database!');
    }
}