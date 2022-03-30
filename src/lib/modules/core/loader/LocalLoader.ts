import { LocalModules } from "@root/lib/modules/core/loader/JsLoader";

export async function instanciateLocalAsyncModule<T>(
  fqcn: string,
  localModules: LocalModules = {}
): Promise<T> {
  const localModule = await localModules[fqcn]();
  const module = localModule.module;
  for (const key in module) {
    const sub = module[key];
    if (
      sub.prototype &&
      sub.prototype.constructor.name === localModule.classname
    ) {
      //identifiying the module
      return new sub();
    }
  }
  throw new Error("invalid factory " + fqcn + " - " + localModule.classname);
}
