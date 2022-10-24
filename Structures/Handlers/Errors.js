const { Client, EmbedBuilder } = require("discord.js")
const client = require("..")
const ChannelID = process.env.LOGS

/**
 * @param {Client} client
 */
module.exports = async (client) => {

    const Embed = new EmbedBuilder()
        .setColor(client.color)
        .setTimestamp()
        .setFooter({text: "Bot by MSG Studios"})
        .setTitle("Error Encounted")

    process.on("unhandledRejection", (reason, p) => {

        console.log(reason, p)

        const Channel = client.channels.cache.get(ChannelID)
        if (!Channel) return

        Channel.send({
            embeds: [
                Embed
                .setDescription("**Unhandled Rejection/Catch: \n\n** ```" + reason + "```** ")
            ]
        })
    })

    process.on("unhandledExpection", (err, origin) => {

        console.log(err, origin)

        const Channel = client.channels.cache.get(ChannelID)
        if (!Channel) return

        Channel.send({
            embeds: [
                Embed
                .setDescription("**Unhandled Expection/Catch: \n\n** ```" + err + "\n\n" + origin.toString() + " ``` ")
            ]
        })
    })

    process.on("unhandledExpectionMonitor", (err, origin) => {

        console.log(err, origin)

        const Channel = client.channels.cache.get(ChannelID)
        if (!Channel) return

        Channel.send({
            embeds: [
                Embed
                .setDescription("**Unhandled Expection/Catch (MONITOR): \n\n** ```" + err + "\n\n" + origin.toString() + "``` ")
            ]
        })
    })
}