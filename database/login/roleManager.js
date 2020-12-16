const serverConfig = require("../models/temprole.js");
const { Collection } = require("discord.js");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
module.exports = class tempRole {
    constructor(client) {
        this.client = client;
        this.roles = new Collection();
        this.client.addTempRole = (role) => this.roles[role.userID + '-' + role.roleID] = new TempRole(role);
        this.init();

    }

    async init() {
    const allTempRoles = await serverConfig.find({})
        allTempRoles.forEach(x => {
            this.roles[x.userID + '-' + x.roleID] = new TempRole(x);
        })

        setInterval(() => { this.ready() }, 1_000)
    }

   async ready() {
        for(const role in this.roles) {
            const toVerify = this.roles[role];
            const guild = this.client.guilds.cache.get(toVerify.serverID);
            const member = guild.members.cache.get(toVerify.userID);
            if (!toVerify.expirado && member.roles.cache.has(toVerify.roleID)) continue;

            delete this.roles[toVerify.userID + '-' + toVerify.roleID];
            await serverConfig.findOneAndDelete(role._id);
 
            if(member.roles.cache.has(toVerify.roleID)) {
                member.roles.remove(toVerify.roleID);
                await sleep(500)
            }
        }
    }
}

class TempRole {
    constructor(role) {
        this._id = role._id,
        this.serverID = role.serverID,
        this.roleID = role.roleID,
        this.createdAt = role.createdAt,
        this.expiredAt = role.expiredAt,
        this.userID = role.userID
    }

    get expirado() {
        return this.expiredAt < Date.now()
    }
}

