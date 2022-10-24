const { Perms } = require("../Validation/Permissions")
const { Client } = require("discord.js")
const config = require("../../config.json")
const ms = require("ms")


/**
 * @param { Client }
 */
module.exports = async (client, PG, Ascii) => {
    
    const Table = new Ascii("Commands Loaded")

    let CommandsArray = []

    const CommandFiles = await PG(`${process.cwd()}/Commands/*/*.js`)

    CommandFiles.map(async (file) => {
        const command = require(file)

        if (!command.name) return Table.addRow(file.split("/")[7], "FAILED", "Missing a name")
        if (!command.context && !command.description) return Table.addRow(command.name, "FAILED", "Missing a Description")
        if (command.UserPerms)
            if (command.UserPerms.every(perms => Perms.includes(perms))) command.default_member_permissions = false
            else return Table.addRow(command.name, "FAILED", "User permission is invalid")

        client.commands.set(command.name, command)
        CommandsArray.push(command)
        
        await Table.addRow(command.aname, "SUCCESFUL")
    })

    console.log(Table.toString())

    client.on("ready", () => {
        setInterval( () => {
            client.guilds.cache.forEach(guild => {

                guild.commands.set(CommandsArray)
                
            })
        }, ms("5s"))
    })
}