import { EmbedBuilder, Events, Guild } from "discord.js";
import CustomClient from "../../base/classes/CustomClient";
import Event from "../../base/classes/Event";
import GuildConfig from "../../base/schemas/GuildConfig";

export default class GuildDelete extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.GuildCreate,
            description: "Guild leave event",
            once: false
        })
    }
    async Execute(guild: Guild) {
        try{
            if(!await GuildConfig.exists({ guildId: guild.id })) 
                await GuildConfig.create({ guildId: guild.id })
        } catch (err) {
            console.error(err)
        }

        const owner = await guild.fetchOwner();
        owner?.send({embeds: [new EmbedBuilder()
            .setColor('Random')
            .setDescription('Thank you for using our bot! If you have any questions or need help, feel free to join our [support server]()!')
        ]})
        .catch();
    }
}