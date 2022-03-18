import { BUILD_VERSION, init } from "@root/lib/modules/core/loader/CoreInit";

class AxolotisPlayer {
  constructor() {
    console.log("player initialized");
    init();
  }

  version() {
    return BUILD_VERSION;
  }
}

export default AxolotisPlayer;
