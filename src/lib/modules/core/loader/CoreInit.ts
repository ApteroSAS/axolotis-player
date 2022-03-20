import {CodeLoaderComponent} from "@root/lib/modules/core/loader/CodeLoaderComponent";
import {ServiceEntity} from "@root/lib/modules/core/service/ServiceEntity";
import {WorldEntity} from "@root/lib/modules/core/ecs/WorldEntity";

export const BUILD_VERSION = require("../../../../../package.json").version;
console.log(BUILD_VERSION);

const domReady = (callBack: () => void) => {
    if (document.readyState === "loading") {
        document.addEventListener('DOMContentLoaded', callBack);
    } else {
        callBack();
    }
};

const windowReady = (callBack: () => void) => {
    if (document.readyState === 'complete') {
        callBack();
    } else {
        window.addEventListener('load', callBack);
    }
};

export function initHtml() {
    let serviceEntity = new ServiceEntity();
    let world = new WorldEntity();
    world.addComponent(serviceEntity);
    let codeLoaderComponent = new CodeLoaderComponent();
    serviceEntity.setService(
        "@root/lib/modules/core/loader/CodeLoaderService",
        codeLoaderComponent
    );
    windowReady(() => {
        let scene: HTMLCollection = window.document.body.getElementsByTagName("ax-scene");//TODO assume only one scene
        codeLoaderComponent.startLoadingJson(world, htmlToJson(scene), (progress, total) => {
            console.log("[" + progress + "/" + total + "]");
            const progressbar: any = document.getElementById("progress");
            progressbar.style.width = `${(progress / total) * 100}%`;
        }).then(() => {
            console.log("loading complete");
            (document.getElementById("progresscontainer") as any).className +=
                "load";
        });
    });
}

function htmlToJson(scene: HTMLCollection): {
    version: string,
    entities: { components: { module: string, config: any,classname: string|undefined }[] }[],
    services: { module: string }[]
} {
    let sceneEl = scene[0];
    const ret= {
        version: "2.0",
        entities:[],
        services: []
    };
    // @ts-ignore
    for (const entity of sceneEl.getElementsByTagName("ax-entity")) {
        //§§§ ICI sdhdfhdfshdf
        let entityRet = {components:[]};

        for (const componentEl of entity.getElementsByTagName("ax-component")) {
            //convert relaxed json to proper json
            let correctJson = componentEl.getAttribute("config").replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
            let component = {
                module:componentEl.getAttribute("module"),
                config:JSON.parse(correctJson)
            };
            entityRet.components.push(component);
        }
        ret.entities.push(entityRet)
    }
    // @ts-ignore
    for (const service of sceneEl.getElementsByTagName("ax-service")) {
        ret.services.push({module:service.getAttribute("module")});
    }
    return ret;
}

export function initJson() {
    let serviceEntity = new ServiceEntity();
    let world = new WorldEntity();
    world.addComponent(serviceEntity);
    let codeLoaderComponent = new CodeLoaderComponent();
    serviceEntity.setService(
        "@root/lib/modules/core/loader/CodeLoaderService",
        codeLoaderComponent
    );
    codeLoaderComponent.searchRoomDefinitionFile().then((json) => {
        codeLoaderComponent
            .startLoadingJson(world, json.entities, (progress, total) => {
                console.log("[" + progress + "/" + total + "]");
                const progressbar: any = document.getElementById("progress");
                progressbar.style.width = `${(progress / total) * 100}%`;
            })
            .then(() => {
                console.log("loading complete");
                (document.getElementById("progresscontainer") as any).className +=
                    "load";
            });
    });
}
