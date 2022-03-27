import Component from "./Component";
import { WorldEntity } from "./WorldEntity";
export interface ComponentFactory<T extends Component> {
    createComponent(world: WorldEntity, params: any): any;
}
