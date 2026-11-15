// Do not include this file in ./index.d.ts
//
// Types for the globals that `bun test` defines when bunfig.toml has `globals = "vitest"`. Use it instead of
// "vitest/globals" once the `vitest` package is uninstalled. It also loads ./vitest.d.ts.
//
// Developers load this file with the following triple-slash directive:
//
// ```ts
// /// <reference types="bun-types/vitest-globals" />
// ```
/// <reference path="./vitest.d.ts" />