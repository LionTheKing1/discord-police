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
        const serverConfig = require('../../database/models/serverconfig.js');
        
        console.log(await serverConfig.find({}))
    }
}