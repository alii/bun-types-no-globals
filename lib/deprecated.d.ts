declare module "bun" {
	/**
	 * @deprecated Renamed to `ErrorLike`
	 */
	type Errorlike = ErrorLike;
	interface TLSOptions {
		/**
		 * File path to a TLS key
		 *
		 * To enable TLS, this option is required.
		 *
		 * @deprecated since v0.6.3 - Use `key: Bun.file(path)` instead.
		 */
		keyFile?: string;
		/**
		 * File path to a TLS certificate
		 *
		 * To enable TLS, this option is required.
		 *
		 * @deprecated since v0.6.3 - Use `cert: Bun.file(path)` instead.
		 */
		certFile?: string;
		/**
		 *  File path to a .pem file for a custom root CA
		 *
		 * @deprecated since v0.6.3 - Use `ca: Bun.file(path)` instead.
		 */
		caFile?: string;
	}
}