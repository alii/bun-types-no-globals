declare module "bun" {
  namespace __internal {
    type NodeWorkerThreadsWorker = import("node:worker_threads").Worker;
    type LibWorkerOrBunWorker = Bun.__internal.UseLibDomIfAvailable<"Worker", Bun.Worker>;

    type LibPerformanceOrNodePerfHooksPerformance = Bun.__internal.UseLibDomIfAvailable<
      "Performance",
      import("perf_hooks").Performance
    >;

    type NodeCryptoWebcryptoSubtleCrypto = import("crypto").webcrypto.SubtleCrypto;
    type NodeCryptoWebcryptoCryptoKey = import("crypto").webcrypto.CryptoKey;
    type NodeCryptoWebcryptoCryptoKeyPair = import("crypto").webcrypto.CryptoKeyPair;

    type LibEmptyOrBunWebSocket = LibDomIsLoaded extends true ? {} : Bun.WebSocket;

    type LibEmptyOrNodeUtilTextEncoder = LibDomIsLoaded extends true ? {} : import("node:util").TextEncoder;

    type LibEmptyOrNodeUtilTextDecoder = LibDomIsLoaded extends true ? {} : import("node:util").TextDecoder;

    type LibEmptyOrNodeReadableStream<T> = LibDomIsLoaded extends true
      ? {}
      : import("node:stream/web").ReadableStream<T>;

    type LibEmptyOrNodeWritableStream<T> = LibDomIsLoaded extends true
      ? {}
      : import("node:stream/web").WritableStream<T>;

    type LibEmptyOrNodeMessagePort = LibDomIsLoaded extends true ? {} : import("node:worker_threads").MessagePort;
  }
}