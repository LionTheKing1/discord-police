const { Comando } = require("../../utils/command.js");
const { MessageEmbed } = require("discord.js")
module.exports = class Equipe extends Comando { 
    constructor(client) {
        super(client, {
            name: "equipe",
            description: "Show administrator team in Estúdio Raiz!",
            needPermissions: "ADMINISTRATOR",
            botNeedPermissions: "EMBED_LINKS"
        })
    }
    async run(client, message, args) {
        if(message.guild.id !== "505070509528973313") return message.reply("esse comando não pode ser usado nesse servidor!");
        const adminRoles = ["743089921065091173", "744985049169920183", "744984894874320998", "745293845490827324", "745293848506531901", "745293843058000007"];
        const embedAdmin = new MessageEmbed()
        .setColor("0eff0e")
        .setFooter(message.guild.name, message.guild.iconURL())
        .setTimestamp()
        .setTitle("👮 Equipe")

        for(const role of adminRoles) {
            const adminMembers = message.guild.members.cache.filter(x => x.roles.cache.has(role) && !x.user.bot)
            if(adminMembers.size < 1) continue;
            embedAdmin.addField(message.guild.roles.cache.get(role).name, adminMembers.map(x => x).join("\n"), false)
        }
        
        message.channel.send(embedAdmin)
        message.channel.send(new MessageEmbed()
        .setColor("00FFFF")
        .setDescription("Ainda não precisamos de Administradores, os que estão aqui, inativos ou não, ainda conseguem dar conta do recado. Caso nós precisarmos, iremos chamar aquelas pessoas dominantes da língua portuguesa, conhece sobre o servidor e é ativa nele. Então, podemos criar um formulário ou escolher a dedo livremente.\n\n Pedir o cargo e ter uma má conduta só atrapalhará sua ingressão a equipe.")
        .setTitle("Ingressar a Equipe")
        .setFooter("Divirta-se! © Moderação" , 'https://i.imgur.com/XDg1PQJ.png'))

        return;
    }
}