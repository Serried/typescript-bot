"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Event_1 = __importDefault(require("../../base/classes/Event"));
class Ready extends Event_1.default {
    constructor(client) {
        super(client, {
            name: discord_js_1.Events.ClientReady,
            description: 'Ready event',
            once: true
        });
    }
    Execute() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log(`${(_a = this.client.user) === null || _a === void 0 ? void 0 : _a.tag} is ready!`);
            const cliendId = this.client.developementMode ? this.client.config.devDiscordClientId : this.client.config.discordClientId;
            const rest = new discord_js_1.REST().setToken(this.client.config.token);
            if (!this.client.developementMode) {
                const globalCommands = yield rest.put(discord_js_1.Routes.applicationCommands(cliendId), {
                    body: this.GetJson(this.client.commands.filter(command => !command.dev))
                });
                console.log(`Successfully loaded ${globalCommands.length} global commands!`);
            }
            const devCommands = yield rest.put(discord_js_1.Routes.applicationGuildCommands(cliendId, this.client.config.devGuildId), {
                body: this.GetJson(this.client.commands.filter(command => command.dev))
            });
            console.log(`Successfully loaded ${devCommands.length} developer commands!`);
        });
    }
    GetJson(commands) {
        const data = [];
        commands.forEach(command => {
            data.push({
                name: command.name,
                description: command.description,
                category: command.category,
                dm_permissions: command.dm_permissions,
                cooldown: command.cooldown,
                options: command.options
            });
        });
        return data;
    }
}
exports.default = Ready;
