import { IServices } from "./IServices";
import { IService } from "../../../..";
export interface Service<T extends IService> {
    createService(services: IServices): Promise<T>;
}
