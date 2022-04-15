import {LazyServices} from "@root/lib";

export interface Service<T> {
    createService(services: LazyServices): Promise<T>;
}
