const { Comando } = require("../../utils/command.js");
const { SimpleEmbed, EmbedError } = require("../../utils/embeds.js")
const fs = require("fs");
const moment = require("moment");

module.exports = class Eval extends Comando { 
    constructor(client) {
        super(client, {
            name: "eval",
            onlyOwner: true,
            needArguments: true,
            description: "Use algum comando personalizado criado por você mesmo! (Em Javascript)",
            usage: "<code>"
        })
    }
    async run(client, message, args) {
        const evalCommand = args.join(" ")

        try { 
            var evaledMessage = await eval(evalCommand) 
        }
        catch(error) { 
            return message.channel.send(new EmbedError(error))
         }

        if(evaledMessage instanceof Object) return;
        else return message.channel.send(new SimpleEmbed("```js\n" + evaledMessage + "```"))
    }
}