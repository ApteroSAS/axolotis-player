import Component from "@root/lib/modules/core/ecs/Component";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";

export interface ComponentFactory<T extends Component> {
  createComponent(world: WorldEntity, params: any);
}
