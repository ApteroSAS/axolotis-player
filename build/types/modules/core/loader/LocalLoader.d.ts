import { LocalModules } from "./JsLoader";
export declare function instanciateLocalAsyncModule<T>(fqcn: string, localModules?: LocalModules): Promise<T>;
