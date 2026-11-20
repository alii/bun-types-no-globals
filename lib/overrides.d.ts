export {};
declare module "stream/web" {
  interface ReadableStream extends BunConsumerConvenienceMethods {
    /**
     * Consume as a Blob
     */
    blob(): Promise<Blob>;
  }
}
declare module "buffer" {
  interface Blob extends BunConsumerConvenienceMethods {
    // We have to specify bytes again even though it comes from
    // BunConsumerConvenienceMethods, because inheritance in TypeScript is
    // slightly different from just "copying in the methods" (the difference is
    // related to how type parameters are resolved)
    bytes(): Promise<Uint8Array<ArrayBuffer>>;

    /**
     * Consume the blob as a FormData instance
     */
    formData(): Promise<FormData>;

    /**
     * Consume the blob as an ArrayBuffer
     */
    arrayBuffer(): Promise<ArrayBuffer>;

    /**
     * Wrap this blob in a {@link Bun.Image} pipeline.
     * Equivalent to `new Bun.Image(this, options)`.
     */
    image(options?: Bun.Image.ConstructorOptions): Bun.Image;

    /**
     * Returns a readable stream of the blob's contents
     */
    stream(): ReadableStream<Uint8Array<ArrayBuffer>>;
  }
}
declare module "url" {
  interface URLSearchParams {
    toJSON(): Record<string, string>;
  }
}
declare module "node:fs/promises" {
  function exists(path: Bun.PathLike): Promise<boolean>;
}
declare module "node:tls" {
  interface BunConnectionOptions extends Omit<ConnectionOptions, "key" | "ca" | "tls" | "cert"> {
    /**
     * Override the trusted CA certificates. The default is the list of
     * well-known CAs curated by Mozilla; setting this option replaces
     * that list entirely.
     */
    ca?: string | Buffer | NodeJS.TypedArray | Bun.BunFile | Array<string | Buffer | Bun.BunFile> | undefined;
    /**
     * Cert chains in PEM format. Provide one cert chain per private key.
     * Each chain consists of the PEM certificate for its private key,
     * followed by the PEM intermediate certificates (if any) in order,
     * not including the root CA (the root CA must be pre-known to the
     * peer, see `ca`). Multiple cert chains do not have to be in the
     * same order as their private keys in `key`. Without the
     * intermediate certificates, the peer cannot validate the
     * certificate and the handshake fails.
     */
    cert?:
      | string
      | Buffer
      | NodeJS.TypedArray
      | Bun.BunFile
      | Array<string | Buffer | NodeJS.TypedArray | Bun.BunFile>
      | undefined;
    /**
     * Private keys in PEM format. PEM keys may be encrypted. Multiple
     * keys using different algorithms can be provided either as an array
     * of unencrypted key strings or buffers, or as an array of objects in
     * the form `{pem: <string|buffer>[, passphrase: <string>]}`. The
     * object form can only occur in an array, and `object.passphrase` is
     * optional. Encrypted keys are decrypted with `object.passphrase` if
     * provided, otherwise with `options.passphrase`.
     */
    key?:
      | string
      | Buffer
      | Bun.BunFile
      | NodeJS.TypedArray
      | Array<string | Buffer | Bun.BunFile | NodeJS.TypedArray | KeyObject>
      | undefined;
  }

  function connect(options: BunConnectionOptions, secureConnectListener?: () => void): TLSSocket;
}
declare module "console" {
  interface Console {
    /**
     * Asynchronously reads lines from standard input (fd 0)
     *
     * @example
     * ```ts
     * for await (const line of console) {
     *   console.log(line);
     * }
     * ```
     */
    [Symbol.asyncIterator](): AsyncIterableIterator<string>;
  }
}