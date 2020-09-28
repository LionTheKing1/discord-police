const { Collection } = require("discord.js");

module.exports = class Cooldown {
    constructor() {
        this.collection = new Collection();
        this.addCooldown = (infoCooldown) => { this.collection[infoCooldown.ID] = new ManageCooldown(infoCooldown); }
        this.hasCooldown = async (ID) => { return await this.collection[ID] }
        this.verify()
    }

    verify() {
        setInterval(() => {
            for(const cooldownID in this.collection) {
                if(!cooldownID) continue;

                const cooldown = this.collection[cooldownID]
                if(cooldown.expirado) delete this.collection[cooldownID];

            }
        }, 1000)
    }
}

class ManageCooldown {
    constructor(cooldown = {}) {
        this.type = cooldown.type || undefined;
        this.time = cooldown.time || 0;
        this.ID = cooldown.ID || undefined;
    }

    get expirado() {
        return this.time < Date.now();
    }
}