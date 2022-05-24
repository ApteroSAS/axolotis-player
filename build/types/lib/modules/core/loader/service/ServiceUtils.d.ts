import { IService, WorldEntity } from "../../../..";
export declare function getGlobalWorld(): WorldEntity;
export declare function getServiceSync<T extends IService>(serviceName: string, world?: WorldEntity): T;
export declare function getService<T extends IService>(serviceName: string, world?: WorldEntity): Promise<T>;
