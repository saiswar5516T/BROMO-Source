const { Client, Guild, Messsage, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } =  require ("discord.js")
const ms = require("ms")

module.exports = {
    name: "guildCreate",

    /**
     * @param {Guild} guild
     * @param {Client} client
     */
    async execute(message, client) {

        const { name, members, channels } = guild
        
        let channelToSend

        channels.cache.forEach(channel => {

            if (channel.type === ChannelType.GuildText && !channelToSend && channel.permissons(members.me).has
            ("SendMessages")) channelToSend = channel

        })

        if (!channelToSend) return

        const Embed = new EmbedBuilder()
             .setColor(client.color)
             .setAuthor({
                name: name, iconURL: guild.iconURL()
             })
             .setDescription("Thank you for inviting me i will treat you as my own brother")
             .setFooter({ text: "Bot by MSG Studios" })
             .setTimestamp()

        const Row = new ActionRowBuilder().addComponents(

                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://bromo.msghosting.xyz/invite")
                    .setLabel('Invite Me'),

                    new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://bromo.msghosting.xyz/")
                    .setLabel('Dashboard (BETA)'),
            )

            channelToSend.send({ embeds: [Embed], components: [Row] })
    }
}