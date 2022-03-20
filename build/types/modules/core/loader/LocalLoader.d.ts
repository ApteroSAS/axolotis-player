export declare function instanciateLocalAsyncModule<T>(moduleName: string, classname: string, localModules?: {
    [id: string]: () => Promise<any>;
}): Promise<T>;
