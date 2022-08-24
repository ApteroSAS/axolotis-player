import Entity from "@root/lib/modules/core/ecs/Entity";

export class WorldEntity extends Entity {
  constructor() {
    super();
  }
  public getType(): string {
    return "WorldEntity";
  }
}
