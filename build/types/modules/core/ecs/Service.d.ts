import { LazyServices } from "../../..";
export interface Service<T> {
    createService(services: LazyServices): Promise<T>;
}
