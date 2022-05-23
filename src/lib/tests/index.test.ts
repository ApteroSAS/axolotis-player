import {createWorld, registerLocalModule} from "..";
import Entity from "../modules/core/ecs/Entity";
import {ComponentExample} from "../../demo/page/basic/ComponentExample";
import {ServiceExample} from "../../demo/page/basic/ServiceExample";
import {LazyEntity} from "../modules/core/loader/entity/LazyEntity";

it('createWorld', async () => {
  const world = await createWorld();
});

it('createWorld from json', async () => {
  let localModuleStorage = {};
  registerLocalModule("@local/ServiceExample", async () => {
    const module = await import("../../demo/page/basic/ServiceExample");
    return {module, classname: module.ServiceExample.name}
  },localModuleStorage);

  registerLocalModule("@local/ComponentExample", async () => {
    const module = await import("../../demo/page/basic/ComponentExample");
    return {module, classname: module.ComponentExample.name}
  },localModuleStorage);
  await createWorld({
    version:"2.0",
    entities:[
      {components:[
          {module:"@local/ComponentExample",config:{text:"hello 1"}},
          {module:"@local/ComponentExample",config:{text:"hello 2"}}
          ]}
    ]
  },()=>{},localModuleStorage);
});

it('createWorld and add modules static', async () => {
  const world = await createWorld();
  const entity = new Entity();
  entity.addComponent(new ComponentExample(new ServiceExample(),{text:"hello"}));
  world.addComponent(entity);
});

it('createWorld 2', async () => {
  let localModuleStorage = {};
  registerLocalModule("@local/ServiceExample", async () => {
    const module = await import("../../demo/page/basic/ServiceExample");
    return {module, classname: module.ServiceExample.name}
  },localModuleStorage);

  registerLocalModule("@local/ComponentExample", async () => {
    const module = await import("../../demo/page/basic/ComponentExample");
    return {module, classname: module.ComponentExample.name}
  },localModuleStorage);
  let worldEntity = await createWorld({
    version:"2.0",
    entities:[
      {components:[
          {module:"@local/ComponentExample",config:{text:"hello 1"}},
          {module:"@local/ComponentExample",config:{text:"hello 2"}}
        ]}
    ]
  },()=>{},localModuleStorage);
  let entity = new LazyEntity(worldEntity);
  worldEntity.addComponent(entity);
  await entity.addComponentAsync("@local/ComponentExample", {text: "hello"});
  await entity.addComponentAsync("@local/ComponentExample", {text: "hello2"});
});


it('createWorld 2 with factories', async () => {
  let localModuleStorage = {};
  registerLocalModule("@local/ServiceExample", async () => {
    const module = await import("../../demo/page/basic/ServiceExample");
    return {module, classname: module.Factory.name}
  },localModuleStorage);

  registerLocalModule("@local/ComponentExample", async () => {
    const module = await import("../../demo/page/basic/ComponentExample");
    return {module, classname: module.Factory.name}
  },localModuleStorage);
  let worldEntity = await createWorld({
    version:"2.0",
    entities:[
      {components:[
          {module:"@local/ComponentExample",config:{text:"hello 1"}},
          {module:"@local/ComponentExample",config:{text:"hello 2"}}
        ]}
    ]
  },()=>{},localModuleStorage);
  let entity = new LazyEntity(worldEntity);
  worldEntity.addComponent(entity);
  await entity.addComponentAsync("@local/ComponentExample", {text: "hello"});
  await entity.addComponentAsync("@local/ComponentExample", {text: "hello2"});
});