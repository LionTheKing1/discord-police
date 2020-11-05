const { Schema, model } = require('mongoose');

const configSchema = new Schema({
    userID: {
        required: true,
        type: String
    },

    number: {
            required: true,
            type: String,
            default: '+00 (00)0000-0000'
    }
})

module.exports = model('ZumansInfoUser', configSchema)