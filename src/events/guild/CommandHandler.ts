import { ChatInputCommandInteraction, Collection, EmbedBuilder, Events } from "discord.js";
import CustomClient from "../../base/classes/CustomClient";
import Event from "../../base/classes/Event";
import Command from "../../base/classes/Command";

export default class CommandHandler extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.InteractionCreate,
            description: 'Command handler event',
            once: false
        })
    }
    Execute(interaction: ChatInputCommandInteraction) {
        if(!interaction.isChatInputCommand()) return;

        const command: Command = this.client.commands.get(interaction.commandName)!;

        //@ts-ignore
        if(!command) return interaction.reply({ content: 'Command not found', ephemeral: true }) && this.client.commands.delete(interaction.commandName);

        if(command.dev && !this.client.config.developerUserId.includes(interaction.user.id)) 
            return interaction.reply({embeds: [new EmbedBuilder()
                .setTitle('Error')
                .setColor('Red')
                .setDescription('❌ This commmand is only available to developers.')
            ],ephemeral: true});
        const { Cooldowns } = this.client;
        if(!Cooldowns.has(command.name)) Cooldowns.set(command.name, new Collection());

        const now = Date.now();
        const timestamps = Cooldowns.get(command.name)!;
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(interaction.user.id) && (now < (timestamps.get(interaction.user.id) || 0) + cooldownAmount))
            return interaction.reply({embeds: [new EmbedBuilder()
                .setTitle('Cooldown')
                .setColor('Red')
                .setDescription(`❌ Please wait another \`${((((timestamps.get(interaction.user.id) || 0) + cooldownAmount) - now) / 1000).toFixed(1)}\` seconds to run this command again.`)
            ],ephemeral: true});
        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
        
        try {
            const subCommandGroup = interaction.options.getSubcommandGroup(false);
            const subCommand = `${interaction.commandName}${subCommandGroup? `.${subCommandGroup}`: ""}.${interaction.options.getSubcommand(false) || ""}`

            return this.client.SubCommands.get(subCommand)?.Execute(interaction) || command.Execute(interaction)
        } catch (ex){
            console.log(ex);
        }
}}