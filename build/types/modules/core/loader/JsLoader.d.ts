import { LocalModules } from "./LocalLoader";
export declare function instantiateAsyncModule<T>(moduleName: string, moduleStorage: LocalModules): Promise<T>;
