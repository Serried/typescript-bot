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
const GuildConfig_1 = __importDefault(require("../../base/schemas/GuildConfig"));
class GuildDelete extends Event_1.default {
    constructor(client) {
        super(client, {
            name: discord_js_1.Events.GuildCreate,
            description: "Guild leave event",
            once: false
        });
    }
    Execute(guild) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(yield GuildConfig_1.default.exists({ guildId: guild.id })))
                    yield GuildConfig_1.default.create({ guildId: guild.id });
            }
            catch (err) {
                console.error(err);
            }
            const owner = yield guild.fetchOwner();
            owner === null || owner === void 0 ? void 0 : owner.send({ embeds: [new discord_js_1.EmbedBuilder()
                        .setColor('Random')
                        .setDescription('Thank you for using our bot! If you have any questions or need help, feel free to join our [support server]()!')
                ] }).catch();
        });
    }
}
exports.default = GuildDelete;
