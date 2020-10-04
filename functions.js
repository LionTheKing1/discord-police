const { MessageMentions } = require("discord.js")

module.exports = {
    findMember: function(message, args = message.content.split(" ").slice(1)[0]) {
        return message.guild.members.cache.get(args.replace(/<|@|!|>/g, ""))
    },
    findUser: function(client, args) {
        return client.users.cache.get(args.replace(/<|@|!|>/g, ""))
    },
    findChannel: function(client, message, args = message.content.split(" ").slice(1)[0]) {
        return (args.match(MessageMentions.CHANNELS_PATTERN)) ? message.mentions.channels.first() : message.guild.channels.cache.get(args)
    }, 
    findAnimatedEmojis: function(message, emojiContent = message.content.split(" ").slice(1)) {
        let emojisInArgument = [];
        const emojiList = emojiContent.join(" ").match(/(:+[a-zA-Z]+:)+/g);
        if(!emojiList) return emojiContent;

        emojiList.forEach(argument => {
            message.guild.emojis.cache.filter(emoji => emoji.animated && `:${emoji.name}:` == argument).forEach(emoji => 
                emojisInArgument.push({
                    name: emoji.name,
                    mention: `<a:${emoji.name}:${emoji.id}>`
                })
            )
        });
        
        for(let emote of emojisInArgument) {
            emojiContent = emojiContent.map(emoji => 
                emoji.replace(new RegExp(`:${emote.name}:`, "g"), emote.mention)
            );
        }

        return emojiContent;
    },

    msToDate: function(ms) {
        if(!ms) return undefined;
        if(isNaN(ms)) return "Unexpected Letter in parser";

        let dateFormat = [];
        function date() {
        const date = {
            "segundos": ms / 1000,
            "minutos": ms / 1000 / 60,
            "horas": ms / 1000 / 60 / 60,
            "dias": ms / 1000 / 60 / 60 / 24
        }

        return date;
    }
        if(date().dias >= 1) {
            dateFormat.push(`${date().dias.toFixed(0)}${date().dias > 1 ? " dias" : " dia"}`);
            ms = ms % 1000 % 60 % 60 % 24
        }

        if(date().horas >= 1) {
            dateFormat.push(`${date().horas.toFixed(0)}${date().horas > 1 ? " horas" : " hora"}`);
            ms = ms % 1000 % 60 % 60
        }

        if(date().minutos >= 1) {
            dateFormat.push(`${date().minutos.toFixed(0)}${date().minutos > 1 ? " minutos" : " minuto"}`);
            ms = ms % 1000 % 60
        }

        if(date().segundos >= 1) {
            dateFormat.push(`${date().segundos.toFixed(0)}${date().segundos > 1 ? " segundos" : " segundo"}`);
            ms = ms % 1000
        }

        return dateFormat.join(", ")
    }
}
