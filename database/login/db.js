const { connect } = require("mongoose")
const serverManager = require("./serverManager.js")
const roleManager = require("./roleManager.js");
const Cooldown = require('../../utils/cooldown.js')

module.exports = class loginDatabase {
    constructor(bot) {
        this.client = bot
        this.init()
    }

    async init() {
        await connect(this.client.config.mongooseLogin, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(async () => {
            console.log("Success in DB!");
            await this.client.login(this.client.config.token);
            this.client.on('ready', () => {
                this.temproles = new roleManager(this.client);
                new Cooldown();
                this.servers = new serverManager(this.client);
            })
           
        }).catch(error => console.log(error))
    }
}
