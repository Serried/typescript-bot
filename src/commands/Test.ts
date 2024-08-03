import { ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";
import Command from "../base/classes/Command";
import CustomClient from "../base/classes/CustomClient";
import Category from "../base/enums/Category";

export default class Test extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'test',
            description: 'My test command',
            category: Category.Utilities,
            default_member_permissions: PermissionFlagsBits.SendMessages,
            dm_permissions: false,
            cooldown: 3,
            options: [],
            dev: false
        });
    }

    Execute(interaction: ChatInputCommandInteraction) {
        interaction.reply({ content: 'Hello world!', ephemeral: true });
    }
}