import { LocalModules } from "./LocalLoader";
import { WorldEntity } from "../ecs/WorldEntity";
export declare function instantiateAsyncModule<T>(moduleName: string, moduleStorage: LocalModules, world?: WorldEntity, config?: any): Promise<T>;
