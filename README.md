# bun-types-no-globals

Publishes the Bun types with no globals, useful for library authors that need to consume parts of Bun's APIs with versions of @types/bun, but without loading the globals which can cause conflicts

### Requiring these

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
