var axolotis = null;

export function getGlobalStorage<T>(key): T {
  //not axolotis in window => create it
  if (typeof window !== "undefined") {
    if (!(window as any).axolotis) {
      (window as any).axolotis = {};
    }
  }

  //axolotis var not initialized with window
  if (!axolotis && typeof window !== "undefined") {
    axolotis = (window as any).axolotis;
  }

  if (!axolotis) {
    axolotis = {};
  }

  if (!axolotis[key]) {
    axolotis[key] = {};
  }
  return axolotis[key] as T;
}
