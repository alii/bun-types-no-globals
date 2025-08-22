<img src="https://bun.com/logo.png" height="36" />

# bun-types-no-globals

TypeScript type definitions for Bun's APIs without global namespace pollution. This package provides clean, isolated Bun types that won't interfere with other environments or type systems.

> **Note:** This package is for advanced use cases only. You are probably looking for [`@types/bun`](https://www.npmjs.com/package/@types/bun) instead.

## Why does this exist?

When building universal tools or libraries that support multiple runtimes (Node.js, Bun, browsers, etc.), importing `@types/bun` causes problems:

- **Global type pollution**: Regular Bun types modify global interfaces and add global variables that conflict with Node.js or browser types
- **Transitive type leakage**: If your library uses `@types/bun`, everyone who installs your library gets Bun's global types too - even if they're not using Bun
- **Multi-bundler compatibility issues**: Tools like [unplugin](https://github.com/unjs/unplugin) that support webpack, Vite, Rollup, esbuild, AND Bun can't use regular Bun types without forcing them on all users

This package solves these issues by providing Bun's type definitions in an isolated, non-global way.

## Common Use Cases

### 🔧 Multi-Runtime Libraries

Libraries that work across Node.js, Bun, and browsers can safely import Bun-specific APIs without breaking TypeScript for other runtimes:

```ts
import type { BunFile } from 'bun';

export function processFile(file: BunFile | Buffer) {
	// Implementation that works with both Bun and Node.js
}
```

### 🛠️ Build Tool Plugins

Build tools and bundler plugins (like unplugin) can add Bun support without forcing Bun types on webpack, Vite, or Rollup users:

```ts
import type { BunPlugin } from 'bun';

export function createPlugin(): BunPlugin | WebpackPlugin | VitePlugin {
	// Plugin implementation
}
```

## Usage

We recommend you require these types with a triple slash reference anywhere in your program

```ts
/// <reference path="path/to/node_modules/bun-types-no-globals/index.d.ts">
```

The **alternative** is to include it in your tsconfig.json types array

```jsonc
{
	"compilerOptions": {
		"types": ["bun-types-no-globals"],
	},
}
```
