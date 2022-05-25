import { IServices } from "./IServices";
import { IService } from "@root/lib";

export interface Service<T extends IService> {
  createService(services: IServices): Promise<T>;
}
