const { Client, Collection } = require("discord.js")
const config = process.env
const commandHandler = require("./handlers/commands.js")
const eventHandler = require("./handlers/events.js")
const initDatabase = require("./database/login/db.js")
const Cooldown = require('./utils/cooldown.js')

require('dotenv').config();

class Police extends Client {
    constructor() {
        super();
        this.prefix = ".",
        this.config = config,
        this.options.fetchAllMembers = true;
        this.init();
    }

    async init() {
        this.commands = new Collection();
        this.aliases = new Collection();
        this.load();
    }
    
    load() {
        this.commandHandler =  new commandHandler(this);
        this.eventHandler =  new eventHandler(this);
        this.database = new initDatabase(this);
        new Cooldown();
        this.log();
    }

    log() {
        console.log(`${this.user.username} conectado com sucesso!`);
    }
}

new Police();

