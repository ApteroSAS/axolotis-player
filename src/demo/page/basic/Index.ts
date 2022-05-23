import {registerLocalModule, initHtml} from "../../../lib";

registerLocalModule("@local/ServiceExample", async () => {
    const module = await import("./ServiceExample");
    return {module, classname: module.ServiceExample.name}
});

registerLocalModule("@local/ComponentExample", async () => {
    const module = await import("./ComponentExample");
    return {module, classname: module.ComponentExample.name}
});

initHtml({
    onProgress: (progress, total) => {
        console.log("[" + progress + "/" + total + "]");
        const progressbar: any = document.getElementById("progress");
        progressbar.style.width = `${(progress / total) * 100}%`;
    },
    onLoaded: () => {
        console.log("loading complete");
        (document.getElementById("progresscontainer") as any).className += "load";
    }
});
