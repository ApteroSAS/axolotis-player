import { LocalModules } from "./LocalLoader";
import { WorldDefinition } from "./WorldDefinition";
import { WorldEntity } from "../../..";
export declare function createWorldSync(initialScene?: WorldDefinition, loadedCallBack?: (progress: number, total: number) => void, finished?: (world: WorldEntity) => void, moduleStorage?: LocalModules, world?: WorldEntity): WorldEntity;
export declare function createWorld(initialScene?: WorldDefinition, loadedCallBack?: (progress: number, total: number) => void, moduleStorage?: LocalModules, world?: WorldEntity): Promise<WorldEntity>;
