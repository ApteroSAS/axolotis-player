export declare function registerLocalModule(name: string, module: () => Promise<any>): void;
export declare function instanciateJsAsyncModule<T>(moduleName: string, classname: string): Promise<T>;
