import Component from "@root/lib/modules/core/ecs/Component";
import { LazyServices, Service } from "@root/lib/modules/core/service/LazyServices";
import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
export declare class Factory implements WebpackLazyModule, Service<FrameLoop> {
    createService(services: LazyServices): Promise<FrameLoop>;
}
export declare class FrameLoop implements Component {
    loops: {
        [id: string]: (delta: number) => void;
    };
    private prevTime;
    private monitoringStart;
    private monitoringEnd;
    constructor();
    startAnimationFrameLoop(): void;
    setMonitoringCallback(start: (name: any) => void, end: (name: any) => void): void;
    removeLoop(loopName: string): void;
    addLoop(loopName: string, iterationCallback: (delta: number) => void): void;
    getType(): string;
}
