import {registerLocalModule, initHtml, WorldEntity, LazyEntity} from "../../../lib";

registerLocalModule("@local/ServiceExample", async () => {
    const module = await import("./ServiceExample");
    return {module, classname: module.ServiceExample.name} // return {module, classname: module.ServiceExample.name}
});

registerLocalModule("@local/ComponentExample", async () => {
    const module = await import("./ComponentExample");
    return {module, classname: module.Factory.name}
});

registerLocalModule("@local/LazyServiceExample", async () => {
    const module = await import("./LazyServiceExample");
    return {module, classname: module.Factory.name}
});

registerLocalModule("@local/LazyComponentExample", async () => {
    const module = await import("./LazyComponentExample");
    return {module, classname: module.LazyComponentExample.name}
});

let globalWorld:WorldEntity = null;

initHtml({
    onProgress: (progress, total) => {
        console.log("[" + progress + "/" + total + "]");
        const progressbar: any = document.getElementById("progress");
        progressbar.style.width = `${(progress / total) * 100}%`;
    },
    onLoaded: (world:WorldEntity) => {
        globalWorld = world;
        console.log("loading complete");
        (document.getElementById("progresscontainer") as any).className += "load";
    }
});

declare const window;
window.loadMore = async ()=>{
    let entity = new LazyEntity(globalWorld);
    //@ts-ignore
    globalWorld.addComponent(entity);
    await entity.addComponentAsync("@local/LazyComponentExample", {text: "deferred load 1"});
    await entity.addComponentAsync("@local/LazyComponentExample", {text: "deferred load 2"});
}
