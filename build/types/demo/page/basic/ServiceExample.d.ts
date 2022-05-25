import { Service } from "../../../lib/modules/core/loader/service/Service";
import { IService, IServices } from "../../../lib";
export declare class ServiceExample implements IService {
    constructor();
    addTextToElement(text: string): void;
    getType(): string;
}
export declare class Factory implements Service<ServiceExample> {
    createService(services: IServices): Promise<ServiceExample>;
}
