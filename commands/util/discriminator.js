const { Comando } = require('../../utils/command.js');
const { SimpleEmbed } = require('../../utils/embeds.js');
const emoji = require('../../utils/emojis.json');

module.exports = class Discriminator extends Comando {
    constructor(client) {
        super(client, {
            name: "discriminator",
            aliases: ['discrim', 'tag'],
            description: "Veja quem possui o mesmo discriminator que você!",
        })
    }
    run(client, message, args) {
        const toSearch = args[0] ? args[0] : message.author.discriminator;
        const searchDiscrim = client.users.cache.filter(user => user.discriminator == toSearch && user !== message.author).map(user => user.tag);
        let discrimToReply = '';

        if(searchDiscrim.length < 1) {
            return message.channel.send(`${emoji.interruption} **|** ${message.author}, não encontrei nenhuma pessoa com o discriminator \`#${toSearch}\`. \n**OBS:** Eu preciso estar em um servidor em comum para encontrar tal usuário.`);
        }

            for(const userDiscrim of searchDiscrim) {
                if(discrimToReply.length + userDiscrim.length >= 2000) continue;
                else discrimToReply += ` \`${userDiscrim}\``;
        }

        return message.channel.send(message.author, new SimpleEmbed(`Usuários com o discriminator \`#${toSearch}\`:\n\n${discrimToReply}`));
    }
}