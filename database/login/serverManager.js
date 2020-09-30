const { Collection, RoleManager, Message } = require("discord.js");
const serverConfig = require("../models/serverconfig.js");

module.exports = class serverManager {
    constructor(client) {
        this.client = client;
        this.serverManager = new Collection();
        this.addServer = (db) => { this.serverManager[db.serverID] = new serverInfo(db) }
        this.removeServer = async (db) => { delete await this.serverManager[db.serverID || db] }
        this.findServer = async (db) => { return await this.serverManager[db.serverID || db]  }
        this.init()
    }

    async init() {

    (await serverConfig.find({})).forEach(async db => {
            if(!this.client.guilds.cache.get(db.serverID)) {
                await (await db.remove()).save();
                return;
            }
            
            this.serverManager[db.serverID] = new serverInfo(db)
        })

        this.client.guilds.cache.forEach(async guild => {
            if(this.serverManager[guild.id]) return;
            
            const configServer = new serverConfig({
                "serverID": guild.id
            })

            await configServer.save();
            this.addServer(configServer)
            })
        
    }
}

class serverInfo {
    constructor(db) {
        this.serverID = db.serverID,
        this.deleteCommand = db.deleteCommand,
        this.prefix = db.prefix,
        this.verificate(db)
    }
    verificate(db) {
            this.punishmentLogs = {
                enabled: db.punishmentLogs.enabled,
                channelID: db.punishmentLogs.channelID
            }
        

            const join = db.welcome.join  
            const leave = db.welcome.leave

            this.welcome = {
            join: {
                enabled: join.enabled,
                channelID: join.channelID
            },
                
            leave: {
                enabled: leave.enabled,
                channelID: leave.channelID
            }
        }

            this.autorole = {
                enabled: db.autorole.enabled,
                roles: db.autorole.roles
            }
        }
    }
