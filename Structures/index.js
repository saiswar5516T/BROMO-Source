const { Client, Partials, Collection } = require("discord.js")
const ms = require("ms")
const { promisify } = require("util")
const { glob } = require("glob")
const PG = promisify(glob)//Not a requirement to install
const Ascii = require("ascii-table")
//Requirements need to be installed
const { Channel, GuildMember, Message, Reaction, User, GuildScheduledEvent } = Partials

const client = new Client({
    intents: 131701,
    partials:[Channel, GuildMember, Message, Reaction, User, GuildScheduledEvent],
    allowedMentions: {
        parse: ["everyone", "roles", "users"]
    },
    rest: {
        timeout: ms("1m")
    }
})

client.color = "Red"
client.events = new Collection()
client.commands = new Collection()

const Handlers = ["Events", "Commands", "Errors"]

Handlers.forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii)
})
module.exports = client

client.login(process.env.token)