module.exports = async (client, message) => {
    if(message.guild.id == '505070509528973313') {
    if(!["771000976806903828", "746018034573115434"].includes(message.channel.id) || message.content.startsWith('>')) return;
    else message.react('<:yes:774225114395967498>').then(message.react('<:no:774225133690159126>'));
    }

    if(message.channel.id == '783011535450669067') {
        await message.delete()
    }
}