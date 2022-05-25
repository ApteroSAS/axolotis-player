import { WorldEntity } from "../ecs/WorldEntity";
export declare type Module = () => Promise<{
    module: any;
    classname: string;
}>;
export interface LocalModules {
    [id: string]: Module;
}
export declare function registerLocalModule(name: string, module: Module, moduleStorage?: LocalModules): void;
export declare function registerLocalModuleList(localModulesList: LocalModules, verbose?: boolean, moduleStorage?: LocalModules): void;
export declare function instantiateLocalAsyncModule<T>(fqcn: string, localModules: LocalModules, world: WorldEntity, config?: any): Promise<T>;
