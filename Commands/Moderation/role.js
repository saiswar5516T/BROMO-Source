const { Client, ChatInputCommandInteraction } = require("discord.js")
const EditReply = require("../../Systems/EditReply")

module.exports = {
    name: "role",
    description: "Add/Removes role from a member or everyone",
    UserPerms: ["ManageRoles"],
    BotPerms: ["ManageRoles"],
    category: "Moderation",
    options: [
        {
            name: "options",
            description: "Select a option",
            type: 3,
            required: true,
            choises: [
                {
                    name: "Give",
                    value: "give"
                },
                {
                    name: "Remove",
                    value: "remove"
                },
                {
                    name: "Give All",
                    value: "give-all"
                },
                {
                    name: "Remove All",
                    value: "remove-all"
                }
            ]
        },
        {
            name: "role",
            description: "Select the role to be managed",
            type: 8,
            required: true
        },
        {
            name: "user",
            description: "Select the role to be managed",
            type: 6,
            required: false
        }

    ],

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {

        await interaction.deferReply({ empheral: true })

        const { options, guild, member } = interaction
        const Options = options.getString("options")
        const Role = options.getRole("role")
        const Target = options.getMember("user") || member

        if (guild.members.me.roles.highest.position <= Role.position) return EditReply(interaction, "Owh", `The role you are trying to manage for a member is higher than me!`)

        switch (Options) {

            case "give": {

                if (guild.members.me.roles.highest.position <= Target.roles.highest.position) return EditReply(interaction, "Owh", `The member you are trying to manage is higher than me!`)
                if (Target.roles.cache.find(r => r.id === Role.id)) return EditReply(interaction, "Owh", `${Target} already has the role`)

                await Target.roles.add(Role)

                EditReply(interaction, "Wow!", `The user got a new role, **${Role.name}**`)
            }
                break;
            
                case "remove": {

                    if (guild.members.me.roles.highest.position <= Target.roles.highest.position) return EditReply(interaction, "Owh", `The member you are trying to manage is higher than me!`)
                    if (Target.roles.cache.find(r => r.id === Role.id)) return EditReply(interaction, "Owh", `${Target} dont have the role`)
    
                    await Target.roles.remove(Role)
    
                    EditReply(interaction, "Owh!", `He got lost a role, **${Role.name}**`)
                }
                    break;

                    case "give-all": {

                        const Members = guild.members.cache.filter(m => !m.user.bot)
        
                        EditReply(interaction, "Wow!", `Everyone got a new role, **${Role.name}**`)

                        await Members.forEach(m => m.roles.add(Role))
                    }
                        break;

                        case "remove-all": {

                            const Members = guild.members.cache.filter(m => !m.user.bot)
            
                            EditReply(interaction, "Owh!", `Everyone lost a role, **${Role.name}**`)
    
                            await Members.forEach(m => m.roles.remove(Role))
                        }
                            break;
        }
    }
}