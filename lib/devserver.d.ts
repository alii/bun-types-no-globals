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
   * The event names for the dev server
   */
  type HMREvent = `bun:${HMREventNames}` | (string & {});
}