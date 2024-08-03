import { Collection, Events, REST, Routes } from 'discord.js'
import CustomClient from '../../base/classes/CustomClient'
import Event from '../../base/classes/Event'
import Command from '../../base/classes/Command';
export default class Ready extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.ClientReady,
            description: 'Ready event',
            once: true
        })
    }

    async Execute() {
        console.log(`${this.client.user?.tag} is ready!`);

        const cliendId = this.client.developementMode ? this.client.config.devDiscordClientId : this.client.config.discordClientId;
        const rest = new REST().setToken(this.client.config.token);
        if(!this.client.developementMode) {
            const globalCommands: any = await rest.put(Routes.applicationCommands(cliendId), {
            body: this.GetJson(this.client.commands.filter(command => !command.dev))});
            console.log(`Successfully loaded ${globalCommands.length} global commands!`)
        }
        const devCommands: any = await rest.put(Routes.applicationGuildCommands(cliendId, this.client.config.devGuildId), {
            body: this.GetJson(this.client.commands.filter(command => command.dev))});
            console.log(`Successfully loaded ${devCommands.length} developer commands!`)
    }
    private GetJson(commands: Collection<string, Command>): object[] {
        const data: object[] = [];
        
        commands.forEach(command => {
            data.push({
                name: command.name,
                description: command.description,
                category: command.category,
                dm_permissions: command.dm_permissions,
                cooldown: command.cooldown,
                options: command.options
            })
        });
        return data;
        
    }
}