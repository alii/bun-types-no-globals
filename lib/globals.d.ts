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

    /**
     * The Node.js-flavored members of the global `Event`. The global interface
     * picks them up only when lib.dom.d.ts is not loaded: lib.dom declares
     * `composedPath(): EventTarget[]`, which is incompatible with the tuple
     * type below, so when lib.dom is loaded its declarations win.
     */
    interface BunEvent {
      /** This is not used in Node.js and is provided purely for completeness. */
      readonly bubbles: boolean;
      /** Alias for event.stopPropagation(). This is not used in Node.js and is provided purely for completeness. */
      cancelBubble: boolean;
      /** True if the event was created with the cancelable option */
      readonly cancelable: boolean;
      /** This is not used in Node.js and is provided purely for completeness. */
      readonly composed: boolean;
      /** Returns an array containing the current EventTarget as the only entry or empty if the event is not being dispatched. This is not used in Node.js and is provided purely for completeness. */
      composedPath(): [EventTarget?];
      /** Alias for event.target. */
      readonly currentTarget: EventTarget | null;
      /** `true` if `cancelable` is `true` and `event.preventDefault()` has been called. */
      readonly defaultPrevented: boolean;
      /** This is not used in Node.js and is provided purely for completeness. */
      readonly eventPhase: number;
      /** The `AbortSignal` "abort" event is emitted with `isTrusted` set to `true`. The value is `false` in all other cases. */
      readonly isTrusted: boolean;
      /** Sets the `defaultPrevented` property to `true` if `cancelable` is `true`. */
      preventDefault(): void;
      /** This is not used in Node.js and is provided purely for completeness. */
      returnValue: boolean;
      /** Alias for event.target. */
      readonly srcElement: EventTarget | null;
      /** Stops the invocation of event listeners after the current one completes. */
      stopImmediatePropagation(): void;
      /** This is not used in Node.js and is provided purely for completeness. */
      stopPropagation(): void;
      /** The `EventTarget` dispatching the event */
      readonly target: EventTarget | null;
      /** The millisecond timestamp when the Event object was created. */
      readonly timeStamp: number;
      /** The type of event, for example "click", "hashchange", or "submit". */
      readonly type: string;
    }

    type LibEmptyOrBunEvent = LibDomIsLoaded extends true ? {} : BunEvent;

    /**
     * The Node.js-flavored members of the global `EventTarget`, used only when
     * lib.dom.d.ts is not loaded, same as {@link BunEvent}.
     */
    interface BunEventTarget {
      /**
       * Adds a new handler for the `type` event. Any given `listener` is added only once per `type` and per `capture` option value.
       *
       * If the `once` option is true, the `listener` is removed after the next time a `type` event is dispatched.
       *
       * The `capture` option is not used by Node.js in any functional way other than tracking registered event listeners per the `EventTarget` specification.
       * Specifically, the `capture` option is used as part of the key when registering a `listener`.
       * Any individual `listener` may be added once with `capture = false`, and once with `capture = true`.
       */
      addEventListener(
        type: string,
        listener: Bun.EventListener | Bun.EventListenerObject,
        options?: Bun.AddEventListenerOptions | boolean,
      ): void;
      /** Dispatches a synthetic event `event` to target and returns true if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise. */
      dispatchEvent(event: Event): boolean;
      /** Removes the event listener in target's event listener list with the same type, callback, and options. */
      removeEventListener(
        type: string,
        listener: Bun.EventListener | Bun.EventListenerObject,
        options?: Bun.EventListenerOptions | boolean,
      ): void;
    }

    type LibEmptyOrBunEventTarget = LibDomIsLoaded extends true ? {} : BunEventTarget;
  }
}