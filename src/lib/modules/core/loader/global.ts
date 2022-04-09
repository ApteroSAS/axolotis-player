declare const window: any;

if (window) {
  if (!window.axolotis) {
    window.axolotis = {};
  }
}
var axolotis = window.axolotis;

export function getGlobalStorage<T>(key): T {
  if (!axolotis[key]) {
    axolotis[key] = {};
  }
  return axolotis[key] as T;
}
