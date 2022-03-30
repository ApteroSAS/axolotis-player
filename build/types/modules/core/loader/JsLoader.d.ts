export declare type Module = () => Promise<{
    module: any;
    classname: string;
}>;
export interface LocalModules {
    [id: string]: Module;
}
export declare function registerLocalModule(name: string, module: Module): void;
export declare function registerLocalModuleList(localModulesList: LocalModules): void;
export declare function instanciateJsAsyncModule<T>(moduleName: string): Promise<T>;
