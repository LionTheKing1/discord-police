module.exports = (client, message) => {
    if(!["771000976806903828", "746018034573115434"].includes(message.channel.id)) return;
    else message.react('<:yes:774225114395967498>').then(message.react('<:no:774225133690159126>'));
}