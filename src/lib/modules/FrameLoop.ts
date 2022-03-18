import Component from "@root/lib/modules/core/ecs/Component";

import { CodeLoaderComponent } from "@root/lib/modules/core/loader/CodeLoaderComponent";
import {
  LazyServices,
  Service,
} from "@root/lib/modules/core/service/LazyServices";
import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";

export class Factory implements WebpackLazyModule, Service<FrameLoop> {
  async create(services: LazyServices): Promise<FrameLoop> {
    let codeLoader = await services.getService<CodeLoaderComponent>(
      "@root/lib/modules/core/loader/CodeLoaderService"
    );
    let module = new FrameLoop();
    codeLoader.awaitInitialLoading().then(() => {
      module.startAnimationFrameLoop();
    });
    return module;
  }
}

export class FrameLoop implements Component {
  //TODO frame loop
  // setInterval Frameloop
  // animationFrame
  // Physic update
  // low workload adaptative loop? Like when FPS is green we execute code once evry Frame when it is not we execute once every seconde.
  // worker loop?
  // stats for all those loop (stats.js)
  // API to add task consumer?
  //callbacks:((delta:number)=>void)[] = [];
  loops: { [id: string]: (delta: number) => void } = {};
  private prevTime: number = 0;
  private monitoringStart: (name) => void = () => {};
  private monitoringEnd: (name) => void = () => {};
  constructor() {}

  startAnimationFrameLoop() {
    const animate = (t) => {
      this.monitoringStart(FrameLoop.name);
      const delta = t - this.prevTime;
      this.prevTime = t;
      requestAnimationFrame(animate);
      for (const callback in this.loops) {
        this.monitoringStart(callback);
        this.loops[callback](delta);
        this.monitoringEnd(callback);
      }
      this.monitoringEnd(FrameLoop.name);
    };
    requestAnimationFrame(animate);
  }

  setMonitoringCallback(start: (name) => void, end: (name) => void) {
    this.monitoringStart = start;
    this.monitoringEnd = end;
  }

  removeLoop(loopName: string) {
    delete this.loops[loopName];
    this.monitoringStart(loopName); //set this loop to 0 fix
    this.monitoringEnd(loopName);
  }

  addLoop(loopName: string, iterationCallback: (delta: number) => void) {
    if (this.loops[loopName]) {
      throw new Error();
    }
    this.loops[loopName] = iterationCallback;
  }

  getType(): string {
    return FrameLoop.name;
  }
}
