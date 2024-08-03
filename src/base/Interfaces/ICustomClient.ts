import IConfig from "./IConfig";
import { Collection } from "discord.js";
import Command from "../classes/Command";
import SubCommand from "../classes/SubCommand";

export default interface ICustomClient {
    config: IConfig;
    commands: Collection<string, Command>;
    SubCommands: Collection<string, SubCommand>;
    Cooldowns: Collection<string, Collection<string, number>>;
    developementMode: boolean;

    init(): void;
    LoadHanders(): void;
}
