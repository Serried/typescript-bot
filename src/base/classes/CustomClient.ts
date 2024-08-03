import { Client, Collection, GatewayIntentBits } from "discord.js";
import ICustomClient from "../Interfaces/ICustomClient";
import IConfig from "../Interfaces/IConfig";
import Handler from "./Handler";
import Command from "./Command";
import SubCommand from "./SubCommand";
import { connect } from "mongoose";

export default class CustomClient extends Client implements ICustomClient
{
    handler: Handler;
    config: IConfig;
    commands: Collection<string, Command>;
    SubCommands: Collection<string, SubCommand>;
    Cooldowns: Collection<string, Collection<string, number>>;
    developementMode: boolean;

    constructor()
    {
        super({ intents: [GatewayIntentBits.Guilds] })
        this.config = require(`${process.cwd()}/data/config.json`);
        this.handler = new Handler(this);
        this.commands = new Collection();
        this.SubCommands = new Collection();
        this.Cooldowns = new Collection();
        this.developementMode = (process.argv.slice(2).includes("--development"));
    }
    

    init(): void {
        console.log(`Starting the bot in ${this.developementMode ? "development" : "production"} mode.`)
        this.LoadHanders();
        this.login(this.developementMode ? this.config.devToken : this.config.token)
            .catch((error) => console.error(error));
        connect(this.developementMode ? this.config.devMongoUri : this.config.mongoUri)
            .then(() => console.log("Connected to the database!"))
            .catch((error) => console.error(error));
    }
    LoadHanders(): void {
        this.handler.LoadEvents();
        this.handler.LoadCommands();
    }
}