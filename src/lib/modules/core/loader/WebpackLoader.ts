import { loadModuleAsync } from "@root/lib/generated/webpack/module/WebpackLoader";
import { getWebpackClassName } from "@root/lib/generated/webpack/module/ClassNameConverter";

//TODO separate the concept of of webpack module and world component (see WebpackLoader)
//Add the concept of service that can lazy load - using everywhere with the same name and no parameters
// eg three and ammo are singleton service
// using tuple package + class name like webpack module
// idea add a system entity in the world that list all the services and maintains unicity?
// using or not the world API - World entity have a type but the name is set in the class - a little dirty since i do not want to hardcode the package in the class as a name.
//lazy load entity would be cool tho

export interface WebpackLazyModule {
  /* constructor(); should have a constructor */
}

export async function instanciateWebpackAsyncModule<T>(
  importPath: string,
  classname: string
): Promise<T> {
  const module = await loadModuleAsync(importPath);
  for (const key in module) {
    const sub = module[key];
    if (
      sub.prototype &&
      sub.prototype.constructor.name ===
        (await getWebpackClassName(importPath, classname))
    ) {
      //identifiying the module
      return new sub();
    }
  }
  throw new Error("invalid factory " + importPath + " - " + classname);
}
