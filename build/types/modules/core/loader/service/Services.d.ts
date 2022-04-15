import Component from "../../ecs/Component";
import { LazyServices } from "./LazyServices";
export declare class Services extends LazyServices implements Component {
    getType(): string;
}
