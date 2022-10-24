const { Client, MessageComponentInteraction, EmbedBuilder, InteractionType } = require("discord.js")
const DB = require("../../Structures/Schemas/Verification")
const EditReply = require("../../Systems/EditReply")

module.exports = {
    name: "interactionCreate",
    
    /**
     * @param {Client} client
     * @param {MessageComponentInteraction} interaction
     */
    async execute(interaction, client) {

        const { guild, customId, member, type } = interaction

        if (type !== InteractionType.MessageComponent) return

        const CustomID = ["verify"]
        if (!CustomID.includes(customId)) return

        await interaction.deferReply({
            ephermal: true
        })

        const Data = await DB.findOne({ Guild: guild.id }).catch(err => { })
        if (!Data) return EditReply(interaction, "Umm", "Could't find my data!")

        const Role = guild.roles.cache.get(Data.Role)

        if (member.roles.cache.has(Role.id)) return EditReply(interaction, "Lol", "You are alerady verified as a member")

        await member.roles.add(Role)

        EditReply(interaction, "Wow!", "You got a role but its not highest :/")
    }
}