import {createWorld, getService, getServiceSync, Services} from "..";
import Entity from "../modules/core/ecs/Entity";
import {Factory} from "../../demo/page/lazy/ComponentExample";
import {ServiceExample} from "../../demo/page/basic/ServiceExample";


it('service static', async () => {
  const world = await createWorld();
  const entity = new Entity();

  world.getFirstComponentByType<Services>(Services.name).setService("@local/ServiceExample", new ServiceExample());
  let factory = new Factory();
  let comp = await factory.createComponent(world, {text: "hello"});
  entity.addComponent(comp);
  world.addComponent(entity);
});

it('service static', async () => {
  const world = await createWorld();
  const entity = new Entity();

  world.getFirstComponentByType<Services>(Services.name).setService("@local/ServiceExample", new ServiceExample());
  getServiceSync<ServiceExample>("@local/ServiceExample", world).addTextToElement("test1");
  (await getService<ServiceExample>("@local/ServiceExample", world)).addTextToElement("test2");
});