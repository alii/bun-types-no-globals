import { S3FileOptions } from "bun";
import type {
	TextDecoder as NodeTextDecoder,
	TextEncoder as NodeTextEncoder,
} from "util";
import type { MessagePort } from "worker_threads";
import type { WebSocket as _WebSocket } from "ws";