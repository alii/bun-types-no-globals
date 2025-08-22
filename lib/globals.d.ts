declare module "bun" {
  namespace __internal {
    type NodeWorkerThreadsWorker = import("worker_threads").Worker;
    type LibWorkerOrNodeWorkerThreadsWorker = Bun.__internal.UseLibDomIfAvailable<"Worker", NodeWorkerThreadsWorker>;

    type NodePerfHooksPerformance = import("perf_hooks").Performance;
    type LibPerformanceOrNodePerfHooksPerformance = Bun.__internal.UseLibDomIfAvailable<
      "Performance",
      NodePerfHooksPerformance
    >;

    type NodeCryptoWebcryptoSubtleCrypto = import("crypto").webcrypto.SubtleCrypto;
    type NodeCryptoWebcryptoCryptoKey = import("crypto").webcrypto.CryptoKey;
    type NodeUtilTextEncoder = import("util").TextEncoder;
    type NodeUtilTextDecoder = import("util").TextDecoder;

    type LibEmptyOrNodeReadableStream<T = any> = LibDomIsLoaded extends true
      ? {}
      : import("stream/web").ReadableStream<T>;

    type LibEmptyOrNodeWritableStream<T = any> = LibDomIsLoaded extends true
      ? {}
      : import("stream/web").WritableStream<T>;

    type LibEmptyOrNodeTransformStream<I = any, O = any> = LibDomIsLoaded extends true
      ? {}
      : import("stream/web").TransformStream<I, O>;
  }
}