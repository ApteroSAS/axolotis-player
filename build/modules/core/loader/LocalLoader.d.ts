import { WorldEntity } from "../ecs/WorldEntity";
export declare type ModulePromise = (() => Promise<LongModule>) | (() => Promise<ShortModule>);
export declare type LongModule = {
    module: any;
    classname: string;
};
export declare type ShortModule = {
    default: {
        name: string;
    };
};
export interface LocalModules {
    [id: string]: ModulePromise;
}
export declare function registerLocalModule(name: string, module: ModulePromise, moduleStorage?: LocalModules): void;
export declare function instantiateLocalAsyncModule<T>(fqcn: string, localModules: LocalModules, world: WorldEntity, config?: any): Promise<T>;
