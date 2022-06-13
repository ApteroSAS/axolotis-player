import { WorldEntity } from "../ecs/WorldEntity";
export declare type Module = LongModule | ShortModule;
export declare type LongModule = () => Promise<{
    module: any;
    classname: string;
}>;
export declare type ShortModule = () => Promise<any>;
export interface LocalModules {
    [id: string]: Module;
}
export declare function registerLocalModule(name: string, module: Module, moduleStorage?: LocalModules): void;
export declare function instantiateLocalAsyncModule<T>(fqcn: string, localModules: LocalModules, world: WorldEntity, config?: any): Promise<T>;
