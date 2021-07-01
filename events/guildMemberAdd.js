const moment = require('moment');

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

module.exports = async (client, member) => {
    const GUILD_GAMING_SHOP_ID = "654073009304240161";
    const LOG_CHANNEL_ID = "674399261168893952";
    const MINIMUM_AGE_ACCOUNT = 1_209_600_000; // Minimum 2 weeks 
    const MEMBER_ACCOUNT_AGE = moment(member.user.createdAt).valueOf();
    const CALC_FINISHED = Date.now() - MEMBER_ACCOUNT_AGE;

    if(![member.guild.id].includes(GUILD_GAMING_SHOP_ID)) return;
    if(CALC_FINISHED < MINIMUM_AGE_ACCOUNT && member.kickable) {
        console.log(`Kicked ${member.user.username}: ${CALC_FINISHED} ms`)
        await member.send('Poxa, nos desculpe :(\n\n Por questões de segurança do Gaming Shop, sua conta deve ter uma idade mínima de **2 semanas**. Enquanto não chega, te removemos do servidor! \n\nTe esperamos lá em breve 👋🏻').catch(() => {});
        await member.guild.channels.cache.get(LOG_CHANNEL_ID).send(`Hey! I kicked the user **${member.user.tag} (${member.user.id})** because it hasn't reached the minimum age.`);
        await sleep(3_000);
        return member.kick(`Account age isn't reached yet.`);
    }
}