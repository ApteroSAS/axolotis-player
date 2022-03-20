import { registerLocalModule } from "@root/lib";
import {initHtml} from "../../lib/modules/core/loader/CoreInit";

registerLocalModule("ServiceExample", ()=>{return import("@root/demo/page/ServiceExample")});
registerLocalModule("ComponentExample", ()=>{return import("@root/demo/page/ComponentExample")});

initHtml();
