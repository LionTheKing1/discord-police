const { Schema, model } = require("mongoose");

const tempRole = new Schema({
    serverID: {
        type: String,
        required: true
    },

    userID: {
        type: String,
        required: true
    },

    roleID: {
        type: String,
        required: true
    },

    createdAt: {
        type: String,
        required: true
    },
    
    expiredAt: {
        type: String,
        required: true
    }
})

module.exports = model('Temprole', tempRole)