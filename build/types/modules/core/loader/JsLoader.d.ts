export declare function addLocalModule(localModulesAdded: {
    [id: string]: () => Promise<any>;
}): void;
export declare function instanciateJsAsyncModule<T>(moduleName: string, classname: string): Promise<T>;
