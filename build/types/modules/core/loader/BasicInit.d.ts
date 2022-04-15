import { WorldEntity } from "../../..";
import { LocalModules } from "./LocalLoader";
export interface WorldDefinitionV2 {
    version: "2.0";
    entities: {
        components: {
            module: string;
            config: any;
        }[];
    }[];
}
export interface WorldDefinitionV1 {
    version?: "1.0";
}
export declare type WorldDefinition = WorldDefinitionV1 | WorldDefinitionV2;
export declare const CODE_LOADER_MODULE_NAME = "@aptero/axolotis-player/core/loader/InitialComponentLoader";
export declare function createWorld(initialScene?: WorldDefinition, loadedCallBack?: (progress: number, total: number) => void, moduleStorage?: LocalModules): Promise<WorldEntity>;
