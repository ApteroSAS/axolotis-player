export function loadModules(): {
  [id: string]: () => Promise<{ module: any; classname: string }>;
} {
  let ret = {};
  //Autogenerated
  /* Webpack use module name for loading and computing code bundle and split chunk so we cannot introduce variable in the import thus we create this redirecting file*/

  ret["@aptero/axolotis-player/modules/core/WorldService"] = async () => {
    const module = await import("@root/lib/modules/core/WorldService");
    return { module, classname: module.Factory.name };
  };
  ret["@aptero/axolotis-player/modules/FrameLoop"] = async () => {
    const module = await import("@root/lib/modules/FrameLoop");
    return { module, classname: module.Factory.name };
  };
  return ret;
}
