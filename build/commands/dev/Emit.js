"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../base/classes/Command"));
const Category_1 = __importDefault(require("../../base/enums/Category"));
class Emit extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'emit',
            description: 'Emit an event',
            category: Category_1.default.Developer,
            default_member_permissions: discord_js_1.PermissionFlagsBits.Administrator,
            dm_permissions: false,
            cooldown: 1,
            dev: true,
            options: [
                {
                    name: 'event',
                    description: 'The event to emit',
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    choices: [
                        { name: 'GuildCreate', value: discord_js_1.Events.GuildCreate },
                        { name: 'GuildDelete', value: discord_js_1.Events.GuildDelete },
                    ]
                }
            ]
        });
    }
    Execute(interaction) {
        const event = interaction.options.getString('event');
        if (event == discord_js_1.Events.GuildCreate || event == discord_js_1.Events.GuildDelete) {
            this.client.emit(event, interaction.guild);
        }
        interaction.reply({ embeds: [new discord_js_1.EmbedBuilder()
                    .setColor('Green')
                    .setTitle('Event emitted')
                    .setDescription(`Emitted event - \`${event}\``)
            ], ephemeral: true });
    }
}
exports.default = Emit;
