const { Comando } = require("../../utils/command.js");
const emoji = require("../../utils/emojis.json");
const { findBestMatch } = require("string-similarity");
const { SimpleEmbed } = require("../../utils/embeds.js");

var colors = { 
    "verde lima": "660565736569176065",
    "vermelho": "657386776205459473",
    "dourado": "657386775768989717",
    "roxo violeta": "679458730533978137",
    "roxo claro": "679431011850780683",
    "roxo escuro": "679430980221534217",
    "roxo meia noite": "679431096064147489",
    "azul claro": "657386778524647435",
    "azul escuro": "657386777958416395",
    "amarelo": "657386779774681109",
    "vermelho escuro": "657386779732869130",
    "verde claro": "657386779648720926",
    "verde escuro": "657391307290968076",
    "rosa claro": "657391308758843427",
    "rosa escuro": "657391308096274477",
    "rosa choque": "657391309539246080"
}

function similarityColor(argument = "Unknown argument") {
    const toCompare = findBestMatch(argument, Object.keys(colors));   
    if(toCompare.bestMatch.rating < 0.6) return "";
    else return `Você quis dizer: \`${toCompare.bestMatch.target}\``
}

async function removeAllColors(message) {
    for(const color in colors) {
        if(message.member.roles.cache.has(colors[color])) await message.member.roles.remove(colors[color])
    }
}
module.exports = class Cor extends Comando { 
    constructor(client) {
        super(client, {
            name: "cor",
            aliases: ["cores"],
            description: "Escolha uma cor para seu nome no servidor!",
            botNeedPermissions: ["MANAGE_ROLES"]
        })
    }
    async run(client, message, args) {
        if(message.guild.id == '505070509528973313') {
            var whitelist = ["776061906401755137","705935660036391097", "708094667312332840", "642480977637277718", "554369669524357131", "718949107380650076", "657032404413710356", "773869134999584768"];
        }
        else if(message.guild.id == '760646087215677441') {
            colors = {
                'preto': '778990014973214740',
                'branco': '778963672500404277',
                'amarelo': '778964039547879464',
                'laranja': '778964499587530763',
                'roxo': '778736037890752564',
                'rosa suave': '778963574633791568',
                'azul escuro': '778963681798651924',
                'verde escuro': '778963688681373736',
                'verde lima': '778253898372743189',
                'dourado': '778737937562992661',
                'vermelho': '778963395339878410',
                'ciano': '779334115962781706'
          }
          
           whitelist = ['760647711417696256', '768265291221565440','760647712575455245','760647713691402251','761070956344508448','760647717411356733','765720932546773024','769759353216434187','769776730663550988','769758575135424523','769785412054679573', '769776050116755486','769788053064908834'];
        } else return;

        const colorSelected = args.join(" ").toLowerCase()
        let hasRoles = 0;

        whitelist.forEach(roleID => {
            if(message.member.roles.cache.has(roleID)) hasRoles++;
        });

        if(hasRoles < 1 && !message.member.hasPermission("MANAGE_ROLES")) return message.reply("você não pode utilizar esse comando.");
        if(!colors[colorSelected] && colorSelected) return message.channel.send(`${emoji.interruption} **|** ${message.author} você não especificou uma cor válida!\n\n${await similarityColor(colorSelected)}`);
        if(!colors[colorSelected] && !colorSelected) return message.channel.send(message.author, new SimpleEmbed(`Cores disponíveis: \`${Object.keys(colors).join(", ")}\``));
        if(message.member.roles.cache.has(colors[colorSelected])) {
            await message.member.roles.remove(colors[colorSelected]);
            return message.reply("cor removida com sucesso!");
        }

        await removeAllColors(message);
        await message.member.roles.add(colors[colorSelected]);
        return message.reply("cor entregue com sucesso!");
    }
}