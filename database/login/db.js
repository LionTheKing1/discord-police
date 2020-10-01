const { connect } = require("mongoose")
const modelConfig = require("../models/serverconfig.js")
const serverManager = require("./serverManager.js")
const roleManager = require("./roleManager.js");

module.exports = class loginDatabase {
    constructor(bot) {
        this.client = bot
        this.init()
    }

    async init() {
        await connect(this.client.config.mongooseLogin, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log("Success in DB!");
            await this.client.login(this.config.token);
            this.client.on('ready', () => {
                new roleManager(this.client);
                this.servers = new serverManager(this.client);
                this.ready()
            })
           
        }).catch(error => console.log(error))
    }

        
    ready() {
        this.client.on('guildDelete', async guild => {
            await modelConfig.findOneAndDelete({"serverID": guild.id})
            this.servers.deleteServer(guild.id)
        })

        this.client.on('guildCreate', async guild => {
            if(!await modelConfig.findOne({
                "serverID": guild.id
            })) {
        
            const serverConfig = new modelConfig({
                "serverID": guild.id
            })

            await serverConfig.save();
            this.servers.addServer(serverConfig);

            }
        })
    }
}
