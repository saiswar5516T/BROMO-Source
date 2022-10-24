const { Client, Messsage, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } =  require ("discord.js")
const ms = require("ms")

module.exports = {
    name: "messageCreate",

    /**
     * @param {Message} messageCreate
     * @param {Client} client
     */
    async execute(message, client) {

        const { author, guid, context } = message
        const { user } = client

        if (!guild || author.bot) return
        if (content.includes("@here") || content.includes("@everyone")) return
        if (!context.includes(user.id)) return

        return message.reply({

            embeds: [
                new EmbedBuilder()
                .setColor(client.color)
                .setAuthor({ name: user.username, iconURL:user.displayAvatarURL() })
                .setDescription("Hey you called me my bro? What's the mater. Type \'/\' & click on my logo to see my commands so i can help you\n\n*Sorry i am busy right now so please select anyone before \'10 seconds\'*")
                .setThumbnail(user.displayAvatarURL())
                .setFooter({ text: "Bot by MSG Studios" })
                .setTimestamp()
            ],

            components: [
                new ActionRowBuilder().addComponents(

                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setURL("https://bromo.msghosting.xyz/invite")
                        .setLabel('Invite Me'),

                        new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setURL("https://bromo.msghosting.xyz/")
                        .setLabel('Dashboard (BETA)'),
                )
            ]
        }).then(() => {

            msg.delete().catch(err => {

                if (err.code !== 10008) return console.log(err)
            })
        }, ms("10s"))
    }
}