import { LazyServices } from "./LazyServices";
export interface Service<T> {
    createService(services: LazyServices): Promise<T>;
}
