const { Client, ChatInputCommandInteraction, ApplicationCommandOptionType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js")
const EditReply = require("../../Systems/EditReply")
const ms = require("ms")

module.exports = {
    name: "unban",
    description: "Unbans the innocent one.",
    UserReply: ["BanMembers"],
    BotPerms: ["BanMembers"],
    category: "Moderation",
    options: [
        {
            name: 'user-id',
            description: "Please the id of that inncocent user",
            type: 3,
            required: true,
        },
    ],

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {

        await interaction.deferReply({ ephemeral: true })

        const { options, user, guild } = interaction

        const id  = options.getString("user-id")
        if (isNaN(id)) return EditReply(interaction, "lel", "Please provide a valid ID in numbers!")

        const bannedMembers = await guild.bans.fetch()
        if (!bannedMembers.find(x => x.user.id === id)) return EditReply(interaction, "lel", "This user is not banned yet!")

        const Embed = new EmbedBuilder()
            .setColor(client.color)

        const row = new ActionRowBuilder().addComponents(

            new ButtonBuilder()
                .setStyle(ButtonStyle.Danger)
                .setCustomId("unban-yes")
                .setLabel("Yes"),

                new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setCustomId("unban-No")
                .setLabel("No")
        )

        const Page = await interaction.editReply({

            embeds: [
                   Embed.setDescription('**Do you really want to unban this member?**')
            ],
            components: [row]
        })

        const col = await Page.createMessageComponentCollector({
            componentType: ComponentType.button,
            time: ms("15s")
        })

        col.on("collect", i => {

            if (i.user.id !== user.id) return

            switch(i.customId){

                case "unban-yes": {

                    guild.members.unban(id)

                    interaction.editReply({
                        embeds: [
                            Embed.setDescription('Owh! User got unbanned')
                        ],
                        components: []
                    })

                    member.send({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color)
                                .setDescription(`Hey, You have been unbanned from **${guild.name}**`)
                        ]
                    })
                }
                   break;

                case "unban-no": {

                    interaction.editReply({
                        embeds: [
                            Embed.setDescription('Owh! I feel bad for him')
                        ],
                        components: []
                    })
                }
                break;
            }
        })

        col.on("end", (collected) => {

            if (collected.size > 0) return

            interaction.editReply({
                embeds: [
                    Embed.setDescription("Looks like you are late.")
                ],
                components: []
            })
        })
    }
}