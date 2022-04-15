import Component from "@root/lib/modules/core/ecs/Component";
import { LazyServices } from "@root/lib/modules/core/loader/service/LazyServices";

export class Services extends LazyServices implements Component {
  getType(): string {
    return Services.name;
  }
}
