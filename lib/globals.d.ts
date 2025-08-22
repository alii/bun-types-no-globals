declare module "bun" {
  namespace __internal {
    type NodeWorkerThreadsWorker = import("worker_threads").Worker;
    type LibWorkerOrBunWorker = Bun.__internal.UseLibDomIfAvailable<"Worker", Bun.Worker>;

    type NodePerfHooksPerformance = import("perf_hooks").Performance;
    type LibPerformanceOrNodePerfHooksPerformance = Bun.__internal.UseLibDomIfAvailable<
      "Performance",
      NodePerfHooksPerformance
    >;

    type NodeCryptoWebcryptoSubtleCrypto = import("crypto").webcrypto.SubtleCrypto;
    type NodeCryptoWebcryptoCryptoKey = import("crypto").webcrypto.CryptoKey;

    type LibEmptyOrNodeUtilTextEncoder = LibDomIsLoaded extends true ? {} : import("util").TextEncoder;

    type LibEmptyOrNodeUtilTextDecoder = LibDomIsLoaded extends true ? {} : import("util").TextDecoder;

    type LibEmptyOrNodeReadableStream<T> = LibDomIsLoaded extends true ? {} : import("stream/web").ReadableStream<T>;

    type LibEmptyOrNodeWritableStream<T> = LibDomIsLoaded extends true ? {} : import("stream/web").WritableStream<T>;

    type LibEmptyOrNodeTransformStream<I, O> = LibDomIsLoaded extends true
      ? {}
      : import("stream/web").TransformStream<I, O>;

    type LibEmptyOrNodeMessagePort = LibDomIsLoaded extends true ? {} : import("worker_threads").MessagePort;
  }
}