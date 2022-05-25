import Component from "../../ecs/Component";
import { LazyServices } from "./LazyServices";
import { IService, IServices } from "../../../..";
export declare class Services extends LazyServices implements Component, IServices {
    getType(): string;
    getServiceSync<T extends IService>(moduleName: string): T;
}
