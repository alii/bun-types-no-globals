export function invariant<T>(t: T | null | undefined, message: string): T {
	if (t === undefined || t === null) {
		throw new Error(message);
	}

	return t;
}

export function assert(condition: boolean, message: string): asserts condition {
	if (!condition) throw new Error(message);
}

export function nonEmpty<T>(iterable: Array<T> | undefined, message: string): [T, ...T[]] {
	if (!iterable) {
		throw new Error(message);
	}

	for (const _ of iterable) {
		return iterable as [T, ...T[]];
	}

	throw new Error(message);
}

export function firstInIterable<T>(t: Iterable<T> | undefined, message: string): T {
	if (!t) {
		throw new Error(message);
	}

	for (const item of t) {
		return item;
	}

	throw new Error(message);
}
