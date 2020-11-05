const { Comando } = require("../../utils/command.js");

module.exports = class JeioDeOdio extends Comando {
    constructor(client) {
        super(client, {
            name: "jeiodeodio"
        })
    }
    run(client, message, args) {
        return message.channel.send(message.author, {files: ['https://images-ext-1.discordapp.net/external/Z-sBi1rFPAyYDgSuVTr6PLSq5LJ3fnvqt7wfvk6-Hvs/%3Fwidth%3D1194%26height%3D671/https/images-ext-1.discordapp.net/external/0gz_g5YdsF56w-kz7W7dqYsht6cZkylfS3ouxgL82VQ/https/i.imgur.com/clulLUF.png']})
    }
}