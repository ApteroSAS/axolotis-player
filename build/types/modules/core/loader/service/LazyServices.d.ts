import { WorldEntity } from "../../../..";
import { IService } from "./IService";
export declare class LazyServices {
    private world;
    constructor(world: WorldEntity);
    serviceAsync: {
        [id: string]: Promise<IService> | undefined;
    };
    service: {
        [id: string]: IService;
    };
    getWorld(): WorldEntity;
    setService(moduleName: string, service: IService): void;
    getService<T extends IService>(moduleName: string): Promise<T>;
}
