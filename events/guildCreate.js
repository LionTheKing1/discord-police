const modelConfig = require("../database/models/serverconfig.js")

module.exports = async (client, guild) => {
        if(!await modelConfig.findOne({
            "serverID": guild.id
        })) {
    
        const serverConfig = new modelConfig({
            "serverID": guild.id
        })

        await serverConfig.save();
        await this.servers.addServer(serverConfig);
        console.table(`[LOGGER] A guild ${guild.name} (${guild.id}) successful created.`)
        }
}