declare module "bun" {
  namespace __internal {
    type NodeCryptoWebcryptoCryptoKey = import("crypto").webcrypto.CryptoKey;
    type NodeCryptoWebcryptoCryptoKeyPair = import("crypto").webcrypto.CryptoKeyPair;

    type LibEmptyOrNodeCryptoWebcryptoSubtleCrypto = LibDomIsLoaded extends true
      ? {}
      : import("crypto").webcrypto.SubtleCrypto;

    type LibWorkerOrBunWorker = LibDomIsLoaded extends true ? {} : Bun.Worker;
    type LibEmptyOrBunWebSocket = LibDomIsLoaded extends true ? {} : Bun.WebSocket;

    type LibEmptyOrNodeStreamWebCompressionStream = LibDomIsLoaded extends true
      ? {}
      : import("node:stream/web").CompressionStream;
    type LibEmptyOrNodeStreamWebDecompressionStream = LibDomIsLoaded extends true
      ? {}
      : import("node:stream/web").DecompressionStream;

    type LibPerformanceOrNodePerfHooksPerformance = LibDomIsLoaded extends true
      ? {}
      : import("node:perf_hooks").Performance;
    type LibEmptyOrPerformanceEntry = LibDomIsLoaded extends true ? {} : import("node:perf_hooks").PerformanceEntry;
    type LibEmptyOrPerformanceMark = LibDomIsLoaded extends true ? {} : import("node:perf_hooks").PerformanceMark;
    type LibEmptyOrPerformanceMeasure = LibDomIsLoaded extends true ? {} : import("node:perf_hooks").PerformanceMeasure;
    type LibEmptyOrPerformanceObserver = LibDomIsLoaded extends true
      ? {}
      : import("node:perf_hooks").PerformanceObserver;
    type LibEmptyOrPerformanceObserverEntryList = LibDomIsLoaded extends true
      ? {}
      : import("node:perf_hooks").PerformanceObserverEntryList;
    type LibEmptyOrPerformanceResourceTiming = LibDomIsLoaded extends true
      ? {}
      : import("node:perf_hooks").PerformanceResourceTiming;

    type LibEmptyOrNodeUtilTextEncoder = LibDomIsLoaded extends true ? {} : import("node:util").TextEncoder;
    type LibEmptyOrNodeStreamWebTextEncoderStream = LibDomIsLoaded extends true
      ? {}
      : import("node:stream/web").TextEncoderStream;

    type LibEmptyOrNodeUtilTextDecoder = LibDomIsLoaded extends true ? {} : import("node:util").TextDecoder;
    type LibEmptyOrNodeStreamWebTextDecoderStream = LibDomIsLoaded extends true
      ? {}
      : import("node:stream/web").TextDecoderStream;

    type LibEmptyOrNodeReadableStream<T> = LibDomIsLoaded extends true
      ? {}
      : import("node:stream/web").ReadableStream<T>;

    type LibEmptyOrNodeWritableStream<T> = LibDomIsLoaded extends true
      ? {}
      : import("node:stream/web").WritableStream<T>;

    type LibEmptyOrNodeMessagePort = LibDomIsLoaded extends true ? {} : import("node:worker_threads").MessagePort;
    type LibEmptyOrBroadcastChannel = LibDomIsLoaded extends true ? {} : import("node:worker_threads").BroadcastChannel;
    type LibEmptyOrEventSource = LibDomIsLoaded extends true ? {} : import("undici-types").EventSource;

    type LibEmptyOrReadableByteStreamController = LibDomIsLoaded extends true
      ? {}
      : import("node:stream/web").ReadableByteStreamController;

    type LibEmptyOrReadableStreamBYOBReader = LibDomIsLoaded extends true
      ? {}
      : import("node:stream/web").ReadableStreamBYOBReader;

    type LibEmptyOrReadableStreamBYOBRequest = LibDomIsLoaded extends true
      ? {}
      : import("node:stream/web").ReadableStreamBYOBRequest;
  }
}