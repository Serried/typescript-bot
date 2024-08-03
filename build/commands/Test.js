"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../base/classes/Command"));
const Category_1 = __importDefault(require("../base/enums/Category"));
class Test extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'test',
            description: 'My test command',
            category: Category_1.default.Utilities,
            default_member_permissions: discord_js_1.PermissionFlagsBits.SendMessages,
            dm_permissions: false,
            cooldown: 3,
            options: [],
            dev: false
        });
    }
    Execute(interaction) {
        interaction.reply({ content: 'Hello world!', ephemeral: true });
    }
}
exports.default = Test;
