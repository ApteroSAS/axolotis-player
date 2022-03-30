import {registerLocalModule, initHtml} from "@root/lib";

registerLocalModule("@local/ServiceExample", async () => {
    const module = await import("@root/demo/page/ServiceExample");
    return {module, classname: module.Factory.name}
});

registerLocalModule("@local/ComponentExample", async () => {
    const module = await import("@root/demo/page/ComponentExample");
    return {module, classname: module.Factory.name}
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
