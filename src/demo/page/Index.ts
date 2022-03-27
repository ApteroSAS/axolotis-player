import { registerLocalModule,initHtml } from "@root/lib";

registerLocalModule("ServiceExample", ()=>{return import("@root/demo/page/ServiceExample")});
registerLocalModule("ComponentExample", ()=>{return import("@root/demo/page/ComponentExample")});

initHtml();
