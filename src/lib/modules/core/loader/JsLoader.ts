import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
import Component from "@root/lib/modules/core/ecs/Component";
import { instanciateWebpackAsyncModule } from "@root/lib/modules/core/loader/WebpackLoader";
import { instanciateLocalAsyncModule } from "@root/lib/modules/core/loader/LocalLoader";

let localModules: { [id: string]: () => Promise<any> } = {};

export function registerLocalModule(name: string, module: () => Promise<any>) {
  localModules[name] = module;
}

export async function instanciateJsAsyncModule<T>(
  moduleName: string,
  classname: string
): Promise<T> {
  let module = null;
  if (localModules[moduleName]) {
    module = await instanciateLocalAsyncModule<ComponentFactory<Component>>(
      moduleName,
      classname,
      localModules
    );
  } else {
    module = await instanciateWebpackAsyncModule<ComponentFactory<Component>>(
      moduleName,
      classname
    );
  }
  return module;
}
