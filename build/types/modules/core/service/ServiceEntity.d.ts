import Component from "../ecs/Component";
import { LazyServices } from "./LazyServices";
export declare class ServiceEntity extends LazyServices implements Component {
    getType(): string;
}
