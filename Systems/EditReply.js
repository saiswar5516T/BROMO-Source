const { EmbedBuilder } = require("discord.js")

function EditReply(interaction, emoji, description, type) {

    interaction.editReply({
        embeds: [
            new EmbedBuilder()
                .setColor("Blue")
                .setDescription(`${emoji} | ${description}`)
                .setFooter({ text: "Bot by MSG Studios" })
        ],
    })
}

module.exports = EditReply