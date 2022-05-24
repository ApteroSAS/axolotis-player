import { IService, Services, WorldEntity } from "@root/lib";

export function getServiceSync<T extends IService>(world: WorldEntity, serviceName: string): T {
  return world.getFirstComponentByType<Services>(Services.name).getServiceSync<T>(serviceName);
}

export async function getService<T extends IService>(world: WorldEntity, serviceName: string): Promise<T> {
  return world.getFirstComponentByType<Services>(Services.name).getService<T>(serviceName);
}
