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
            cooldownType: "channel",
            cooldownTime: 4000
  
        })
    }
    async run(client, message, args) {
        console.log(await client.database.temproles.roles[message.author.id+'-'+'773422714505527336'])
    }
}