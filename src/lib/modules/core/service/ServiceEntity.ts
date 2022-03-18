import Component from "@root/lib/modules/core/ecs/Component";
import { LazyServices } from "@root/lib/modules/core/service/LazyServices";

export class ServiceEntity extends LazyServices implements Component {
  getType(): string {
    return ServiceEntity.name;
  }
}
