const { Schema, model } = require("mongoose");

const configSchema = new Schema({
    serverID: {
        type: String,
        required: true,
        default: "---"
    },

    deleteCommand: {
        type: Boolean,
        default: false
    },
    
    prefix: {
        type: String,
        default: "."
    },

    punishmentLogs: {
        enabled: {
            type: Boolean,
            default: false
        },
        channelID: {
            type: String,
            default: ""
        }
    },

    welcome: {
        join: {
            enabled: {
                type: Boolean,
                default: false
            },
            channelID: {
                type: String,
                default: ""
            }
        },
        leave: {
            enabled: {
                type: Boolean,
                default: false
            },
            channelID: {
                type: String,
                default: ""
            }
        }
    },

    autorole: {
        enabled: {
            type: Boolean,
            default: false
        },
        roles: {
            type: Array,
            default: []
        }
    }

})

module.exports = model('Servers', configSchema);