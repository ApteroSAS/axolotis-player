export declare const GLOBAL_WORLDS_ENTITY = "worlds";
export declare const GLOBAL_STATIC_SERVICES = "staticServices";
export declare const GLOBAL_LOCAL_MODULE = "localModules";
export declare function getGlobalStorage(): any;
export declare function setGlobalStorageValue(key: any, value: any): void;
export declare function getGlobalStorageValue<T>(key: any, auto?: boolean): T;
