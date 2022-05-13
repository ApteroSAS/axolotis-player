import { IServices } from "./IServices";

export interface Service<T> {
  createService(services: IServices): Promise<T>;
}
