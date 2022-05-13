import { WorldEntity } from "../../..";
import { LocalModules } from "./LocalLoader";
import { WorldDefinition } from "./WorldDefinition";
export declare function createWorld(initialScene?: WorldDefinition, loadedCallBack?: (progress: number, total: number) => void, moduleStorage?: LocalModules, world?: WorldEntity): Promise<WorldEntity>;
