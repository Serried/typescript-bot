"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Handler_1 = __importDefault(require("./Handler"));
const mongoose_1 = require("mongoose");
class CustomClient extends discord_js_1.Client {
    constructor() {
        super({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
        this.config = require(`${process.cwd()}/data/config.json`);
        this.handler = new Handler_1.default(this);
        this.commands = new discord_js_1.Collection();
        this.SubCommands = new discord_js_1.Collection();
        this.Cooldowns = new discord_js_1.Collection();
        this.developementMode = (process.argv.slice(2).includes("--development"));
    }
    init() {
        console.log(`Starting the bot in ${this.developementMode ? "development" : "production"} mode.`);
        this.LoadHanders();
        this.login(this.developementMode ? this.config.devToken : this.config.token)
            .catch((error) => console.error(error));
        (0, mongoose_1.connect)(this.developementMode ? this.config.devMongoUri : this.config.mongoUri)
            .then(() => console.log("Connected to the database!"))
            .catch((error) => console.error(error));
    }
    LoadHanders() {
        this.handler.LoadEvents();
        this.handler.LoadCommands();
    }
}
exports.default = CustomClient;
