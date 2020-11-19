const modelConfig = require("../models/serverconfig.js")

module.exports = async (client, guild) => {
    await modelConfig.findOneAndDelete({"serverID": guild.id})
    await this.servers.removeServer(guild.id)
    console.table(`[LOGGER] A guild ${guild.name} (${guild.id}) successful deleted.`)

}