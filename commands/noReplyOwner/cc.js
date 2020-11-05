const { Comando } = require('../../utils/command.js');

module.exports = class cc extends Comando {
    constructor(client) {
        super(client, {
            name: 'cc'
        })
    }
    run(client, message, args) {
        return message.channel.send(message.author, {files: ['https://images-ext-2.discordapp.net/external/DHbjlxkZ0U3eBfK5cVYYWuNl7qV7YURQqcpVJi508yA/https/i.imgur.com/cGSkS4n.png']})
    }
}