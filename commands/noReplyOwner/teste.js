const { Comando } = require("../../utils/command.js");
const blockedUsers = new Set();

/* 
*   If use find Function, verification is necessary.
*   findUser(client, message, args[0]).user.username
*   findMember(client, message, args[0]).user.username
*/

module.exports = class Teste extends Comando {
    constructor(client) {
        super(client, {
            name: "teste",
            aliases: ["test"],
            onlyOwner: true,
            description: "Comando destinado para testes, de diversas categorias.",
  
        })
    }
    async run(client, message, args) {
        
        const messageToAnalyse = await message.channel.messages.fetch("750830030422147082");
        const reactions = await messageToAnalyse.reactions

        console.log(reactions.users)
    }
}