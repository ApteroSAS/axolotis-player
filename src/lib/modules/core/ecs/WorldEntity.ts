import Entity from "@root/lib/modules/core/ecs/Entity";
import { registerNewWorld } from "@root/lib/modules/core/WorldService";

export class WorldEntity extends Entity {
  constructor() {
    super("world");
    registerNewWorld(this);
  }
}
