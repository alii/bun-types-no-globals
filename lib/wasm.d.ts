declare module "bun" {
  namespace WebAssembly {
    type ImportExportKind = "function" | "global" | "memory" | "table";
    type TableKind = "anyfunc" | "externref";
    type ExportValue = Function | Global | WebAssembly.Memory | WebAssembly.Table;
    type Exports = Record<string, ExportValue>;
    type ImportValue = ExportValue | number;
    type Imports = Record<string, ModuleImports>;
    type ModuleImports = Record<string, ImportValue>;

    interface ValueTypeMap {
      anyfunc: Function;
      externref: any;
      f32: number;
      f64: number;
      i32: number;
      i64: bigint;
      v128: never;
    }

    type ValueType = keyof ValueTypeMap;

    interface GlobalDescriptor<T extends ValueType = ValueType> {
      mutable?: boolean;
      value: T;
    }

    interface Global<T extends ValueType = ValueType> {
      // <T extends ValueType = ValueType> {
      /** [MDN Reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Global/value) */
      value: ValueTypeMap[T];
      /** [MDN Reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Global/valueOf) */
      valueOf(): ValueTypeMap[T];
    }

    interface CompileError extends Error {}

    interface LinkError extends Error {}

    interface RuntimeError extends Error {}

    /** [MDN Reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Instance) */
    interface Instance {
      /** [MDN Reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Instance/exports) */
      readonly exports: Exports;
    }

    /** [MDN Reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Memory) */
    interface Memory {
      /** [MDN Reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Memory/buffer) */
      readonly buffer: ArrayBuffer;
      /** [MDN Reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Memory/grow) */
      grow(delta: number): number;
    }

    /** [MDN Reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Module) */
    interface Module {}

    /** [MDN Reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Table) */
    interface Table {
      /** [MDN Reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Table/length) */
      readonly length: number;
      /** [MDN Reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Table/get) */
      get(index: number): any;
      /** [MDN Reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Table/grow) */
      grow(delta: number, value?: any): number;
      /** [MDN Reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Table/set) */
      set(index: number, value?: any): void;
    }

    interface MemoryDescriptor {
      initial: number;
      maximum?: number;
      shared?: boolean;
    }

    interface ModuleExportDescriptor {
      kind: ImportExportKind;
      name: string;
    }

    interface ModuleImportDescriptor {
      kind: ImportExportKind;
      module: string;
      name: string;
    }

    interface TableDescriptor {
      element: TableKind;
      initial: number;
      maximum?: number;
    }

    interface WebAssemblyInstantiatedSource {
      instance: Instance;
      module: Module;
    }
  }
}