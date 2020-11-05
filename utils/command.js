const ownerID = process.env.ownerID
const Cooldown = require('./cooldown.js');
const { addCooldown, hasCooldown } = new Cooldown();

module.exports.Comando = class Comando {
    constructor(client, cmd = {}) {
        this.client = client;
        this.name = cmd.name || "Inválido"
        this.aliases = cmd.aliases || []
        this.description = cmd.description || "Nenhuma"
        this.usage = (cmd.usage) ? cmd.name + " " + cmd.usage : cmd.name
        this.needPermissions = cmd.needPermissions || false
        this.botPermissions = cmd.botPermissions || false
        this.onlyOwner = cmd.ownlyOwner || false
        this.enable = cmd.enabled || false
        this.needArguments = cmd.needArguments || false
        this.cooldownType = cmd.cooldownType || "default"
        this.cooldownTime = cmd.cooldownTime || 4000
    }

    hasPermission(message) { 
        if(this.needPermissions) return message.channel.permissionsFor(message.member).has(this.needPermissions) || message.member.hasPermission(this.needPermissions)
        return true
    }

    botHasPermission(message) {
        if(this.botPermissions) return message.guild.me.hasPermission(this.botPermissions) || message.channel.permissionsFor(message.guild.me).has(this.botPermissions)
        return true
    }

    exclusiveCommand(message) {
        if(this.onlyOwner) return ownerID.includes(message.author.id)
        return true
    }

    enabled(message) {
        if(this.enable) return ownerID.includes(message.author.id)
        return true
    }

    missArguments(args) {
        if(this.needArguments) return args.length
        return 
        
    }

    async cooldownPass(message) {
        const cooldownTypes = {
            'default': message.author.id,
            'guild': message.guild.id,
            'channel': message.channel.id
        }
        const manageCooldown = cooldownTypes[this.cooldownType];
        const enabledCooldown = await hasCooldown(manageCooldown)
        if(enabledCooldown) {
            return [false, Math.abs((enabledCooldown.time - Date.now()) / 1000).toFixed(0)];
        }
        else return [true];
        
        
    }

    cooldown(message) {
        const cooldownTypes = {
            'default': message.author.id,
            'guild': message.guild.id,
            'channel': message.channel.id
        }

        if(cooldownTypes[this.cooldownType]) {
            var CooldownID = cooldownTypes[this.cooldownType]
       }

        else return console.log(new Error(`A command cooldown to "${this.name}" ocorred an error: cooldownType has not defined.`));
        addCooldown({
            ID: CooldownID,
            type: this.cooldownType,
            time: Date.now() + this.cooldownTime
        });
    }
}