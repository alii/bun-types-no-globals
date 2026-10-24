

<img src="https://bun.com/logo.png" height="36" />

# bun-types-no-globals

Definiciones de tipos de TypeScript para las APIs de Bun sin contaminación del espacio de nombres global. Este paquete proporciona tipos de Bun limpios y aislados que no interferirán con otros entornos o sistemas de tipos.

> **Nota:** Este paquete es solo para casos de uso avanzados. Probablemente estés buscando [`@types/bun`](https://www.npmjs.com/package/@types/bun) en su lugar.

## ¿Por qué existe esto?

Al crear herramientas o bibliotecas universales que admiten múltiples entornos de ejecución (Node.js, Bun, navegadores, etc.), importar `@types/bun` causa problemas:

- **Contaminación de tipos globales**: Los tipos estándar de Bun modifican interfaces globales y agregan variables globales que entran en conflicto con los tipos de Node.js o del navegador
- **Fuga transitiva de tipos**: Si tu biblioteca utiliza `@types/bun`, todos los que instalen tu biblioteca también obtendrán los tipos globales de Bun, incluso si no están usando Bun
- **Problemas de compatibilidad con múltiples empaquetadores**: Herramientas como [unplugin](https://github.com/unjs/unplugin) que soportan webpack, Vite, Rollup, esbuild y Bun no pueden usar los tipos estándar de Bun sin imponérselos a todos los usuarios

Este paquete resuelve estos problemas proporcionando las definiciones de tipos de Bun de manera aislada y no global.

## Casos de uso comunes

### 🔧 Bibliotecas para múltiples entornos de ejecución

Las bibliotecas que funcionan en Node.js, Bun y navegadores pueden importar APIs específicas de Bun de forma segura sin romper TypeScript para otros entornos de ejecución:

```ts
import type { BunFile } from 'bun';

export function processFile(file: BunFile | Buffer) {
	// Implementation that works with both Bun and Node.js
}
```

### 🛠️ Complementos para herramientas de compilación

Las herramientas de compilación y complementos de empaquetadores (como unplugin) pueden agregar soporte para Bun sin imponer los tipos de Bun a los usuarios de webpack, Vite o Rollup:

```ts
import type { BunPlugin } from 'bun';

export function createPlugin(): BunPlugin | WebpackPlugin | VitePlugin {
	// Plugin implementation
}
```

### 🛠️ [Re-\]declarando el espacio de nombres de Bun

A veces aún querrás que el espacio de nombres de Bun exista a nivel global; esto es más útil en situaciones donde incluir realmente una importación de tiempo de ejecución desde `bun` es más inconveniente que usar el espacio de nombres de Bun en sí. Puedes informar a TypeScript sobre el espacio de nombres incluyendo este código en algún lugar de tu programa:

```ts
import * as BunModule from 'bun';

declare global {
	export import Bun = BunModule;
}
```

Escribí un poco sobre la sintaxis anterior [en mi blog sobre Declaraciones Ambientales](https://alistair.sh/ambient-declarations).

## Uso

Recomendamos que solicites estos tipos con una referencia de triple barra diagonal en cualquier parte de tu programa

```ts
/// <reference types="bun-types-no-globals/lib/index.d.ts" />
```

La **alternativa** es incluirlo en el array `types` de tu `tsconfig.json`

```jsonc
{
	"compilerOptions": {
		"types": ["bun-types-no-globals"],
	},
}
```
