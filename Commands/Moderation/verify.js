const { Client, ChatInputCommandInteraction, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder } = require("discord.js")
const DB = require("../../Structures/Schemas/Verification")
const EditReply = require("../../Systems/EditReply")
const Reply = require("../../Systems/Reply")

module.exports = {
    name: "verify",
    description: "Inbuilt verification system (Temporary)",
    UserPerms: ["ManageGuild"],
    BotPerms: ["ManageGuild"],
    category: "Moderation",
    options:[
        {
            name: 'role',
            description: "Select a role",
            type: 8,
            required: true,
        },
        {
            name: 'channel',
            description: "Select a channel",
            type: 7,
            required: false,
        }
    ],

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {

        await interaction.deferReply({
            ephermal: true
        })

        const { options, guild, channel } = interaction

        const role = options.getRole("role")
        const Channel = options.getChannel("channel") || channel

        let Data = await DB.findOne({
            Guild: guild.id
        }).catch(err => {})

        if (!Data) {

            Data = new DB({
                Guild: guild.id,
                Role: role.id
            })

            await Data.save()

        } else {

            Data.Role = role.id
            await Data.save()

        }

        Channel.send({

            embeds: [
                new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle('Verification')
                    .setDescription("Click the button to verify")
                    .setTimestamp()
            ],
            components: [
                new ActionRowBuilder().addComponents(

                    new ButtonBuilder()
                        .setCustomId("verify")
                        .setLabel("verify")
                        .setStyle(ButtonStyle.Secondary)
                )
            ]
        })

        return EditReply(interaction, "Lol", `Successfully sent verification panel in ${Channel}`)
    }
}