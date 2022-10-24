// Define Packages
const { Client } = require('discord.js');
const SelectedTheme = require('dbd-soft-ui');
const config = require('../../config.json');
let DBD = require('discord-dashboard');

module.exports = {
    name: "ready",

    /**
     * @param {Client} client
     */

async execute(client){

    let Information = []
    let Moderation = []

    const info = client.commands.filter(x => x.category === "Information")
    const mod = client.commands.filter(x => x.category === "Moderation")

    CommandPush(info, Information)
    CommandPush(mod, Moderation)

    await DBD.useLicense(config.dbd.license);
    DBD.Dashboard = DBD.UpdatedClass();

    const Dashboard = new DBD.Dashboard({
        port: config.dbd.port,
        client: {
          id: process.env.client,
          secret: process.env.secret
        },
        redirectUri: `${config.dbd.domain}${config.dbd.redirectUri}`,
        domain: config.dbd.domain,
        ownerIDs: config.dbd.ownerIDs,
        useThemeMaintenance: true,
        useTheme404: true,
        bot: client,
        theme: SelectedTheme({
            customThemeOptions: {
                index: async ({ req, res, config }) => {
                    return {
                        values: [],
                        graph: {},
                        cards: [],
                    }
                },
            },
            websiteName: "BROMO Dashboard",
            colorScheme: "dark",
            supporteMail: "support@msghosting.xyz",
            icons: {
                favicon: 'https://assistantscenter.com/wp-content/uploads/2021/11/cropped-cropped-logov6.png',
                noGuildIcon: "https://pnggrid.com/wp-content/uploads/2021/05/Discord-Logo-Circle-1024x1024.png",
                sidebar: {
                    darkUrl: 'https://assistantscenter.com/img/logo.png',
                    lightUrl: 'https://assistanscenter.com/img/logo.png',
                    hideName: true,
                    borderRadius: false,
                    alignCenter: true
                },
            },
            index: {
                card: {
                    category: "Soft UI",
                    title: "Assistants - The center of everything",
                    description: "Assistants Discord Bot management panel. <b><i>Feel free to use HTML</i></b>",
                    image: "/img/soft-ui.webp",
                    link: {
                        enabled: true,
                        url: "https://google.com"
                    }
                },
                graph: {
                    enabled: true,
                    lineGraph: false,
                    title: 'Memory Usage',
                    tag: 'Memory (MB)',
                    max: 100
                },
            },
            sweetalert: {
                errors: {},
                success: {
                    login: "Successfully logged in.",
                }
            },
            preloader: {
                image: "/img/soft-ui.webp",
                spinner: false,
                text: "Page is loading",
            },    
            admin: {
                pterodactyl: {
                    enabled: false,
                    apiKey: "apiKey",
                    panelLink: "https://panel.website.com",
                    serverUUIDs: []
                }
            },
            commands: [
                {
                    category: 'Information',
                    subTitle: 'Information Commands',
                    alliasesDisabled: false,
                    list: Information
                },
                {
                    category: 'Moderation',
                    subTitle: 'Moderation Commands',
                    alliasesDisabled: false,
                    list: Moderation
                }
            ],
        }),
        settings: []
    });
    Dashboard.init();
   }
}
function CommandPush(filteredArray, CategoryArray) {

    filteredArray.forEach(obj => {
        
        let cmdObject = {
            commandName: obj.name,
            commandUsage: "/" + obj.name,
            commandDescription: obj.description,
            commandAilas: "None"
        }

        CategoryArray.push(cmdObject)
    })
}