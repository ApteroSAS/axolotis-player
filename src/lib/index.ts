import { init } from "@root/lib/modules/core/loader/CoreInit";

class MyLibrary {
  constructor() {
    console.log("Library constructor loaded 2");
  }

  myMethod = (): boolean => {
    console.log("Library method fired 2");
    init();
    return true;
  };
}

export default MyLibrary;
