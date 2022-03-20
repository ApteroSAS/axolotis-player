import { getWebpackClassName } from "@root/lib/generated/webpack/module/ClassNameConverter";

export async function instanciateLocalAsyncModule<T>(
  moduleName: string,
  classname: string,
  localModules: { [id: string]: () => Promise<any> } = {}
): Promise<T> {
  const module = await localModules[moduleName]();
  for (const key in module) {
    const sub = module[key];
    if (sub.prototype && sub.prototype.constructor.name === classname) {
      //identifiying the module
      return new sub();
    }
  }
  throw new Error("invalid factory " + moduleName + " - " + classname);
}
