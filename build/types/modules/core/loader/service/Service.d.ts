import { Iservices } from "./IServices";
export interface Service<T> {
    createService(services: Iservices): Promise<T>;
}
