const userinfo = require('../database/models/addPrivilegiatedRoles');

module.exports = (client, oldMember, newMember) => {    
    if(oldMember.guild.id !== "505070509528973313") return;

    function removeAllRoles(member, roles) {
        if(!roles instanceof Object) return;
        roles.forEach(role => {
            if(member.roles.cache.has(role)) member.roles.remove(role);
        })
    }

    async function logger({str, channelID, roleID}) {
        const channel = client.channels.cache.get(channelID);
        const role = client.guilds.cache.get(newMember.guild.id).roles.cache.get(roleID);
        const numberUser = await userinfo.findOne({userID: newMember.id});

        await channel.send(`<a:DiscordLogoAGif:773883191987273738> **LOGGER |** ${newMember.user.tag} **(${newMember.id})** ${str} ${role ? role.name : 'bugou aquikk'} \n\n**Telefone Number:** \`${numberUser ? numberUser.number : 'não especificado'}\``)
    }

    const colors = ["660565736569176065","657386776205459473","657386775768989717","679458730533978137","679431011850780683","679430980221534217","679431096064147489","657386778524647435","657386777958416395","657386779774681109","657386779732869130","657386779648720926","657391307290968076","657391308758843427","657391308096274477","657391309539246080", "660516816740679681"];
    const toVerify = ["776061906401755137", '721433478607929424', '642480977637277718', '554369669524357131','705935660036391097', '708094667312332840', '773869134999584768'];
    let permission = 1;

        toVerify.forEach(async toVerify => {
            if(oldMember.roles.cache.has(toVerify) && !newMember.roles.cache.has(toVerify)) {
                logger({ str: 'perdeu seu cargo de', channelID: '773963391399493684', roleID: toVerify});
                permission -= 1;
            }
            if(!oldMember.roles.cache.has(toVerify) && newMember.roles.cache.has(toVerify)) {
                logger({str: 'ganhou seu cargo de', channelID: '773963391399493684', roleID: toVerify});

            }
            if(newMember.roles.cache.has(toVerify)) permission += 1;
        })

    if(permission >= 1) return;
    else return removeAllRoles(newMember, colors);
}