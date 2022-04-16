import { LazyServices } from "@root/lib/modules/core/loader/service/LazyServices";

export interface Service<T> {
  createService(services: LazyServices): Promise<T>;
}
