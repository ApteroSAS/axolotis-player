import Component from "@root/lib/modules/core/ecs/Component";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
export interface ComponentFactory<T extends Component> {
    create(world: WorldEntity, params: any): any;
}
