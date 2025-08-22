export {};
import type { MessagePort } from "worker_threads";
import type {
	TextEncoder as NodeTextEncoder,
	TextDecoder as NodeTextDecoder,
} from "util";
import type { WebSocket as _WebSocket } from "ws";
declare module "*.txt" {
	var text: string;
	export = text;
}
declare module "*.toml" {
	var contents: any;
	export = contents;
}