import { IService, WorldEntity } from "../../../..";
export declare function getServiceSync<T extends IService>(world: WorldEntity, serviceName: string): T;
export declare function getService<T extends IService>(world: WorldEntity, serviceName: string): Promise<T>;
