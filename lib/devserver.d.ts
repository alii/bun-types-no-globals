declare module "bun" {
  type HMREventNames =
    | "beforeUpdate"
    | "afterUpdate"
    | "beforeFullReload"
    | "beforePrune"
    | "invalidate"
    | "error"
    | "ws:disconnect"
    | "ws:connect";

  /**
   * Event names accepted by `import.meta.hot.on()` and `import.meta.hot.off()`
   */
  type HMREvent = `bun:${HMREventNames}` | (string & {});
}