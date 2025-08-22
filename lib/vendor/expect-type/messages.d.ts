import type { StrictEqualUsingBranding } from "./branding";
import type { And, Extends, ExtendsExcludingAnyOrNever, IsAny, IsNever, IsUnknown, Not, UsefulKeys } from "./utils";
export type PrintType<T> =
  IsUnknown<T> extends true
    ? "unknown"
    : IsNever<T> extends true
      ? "never"
      : IsAny<T> extends true
        ? never
        : boolean extends T
          ? "boolean"
          : T extends boolean
            ? `literal boolean: ${T}`
            : string extends T
              ? "string"
              : T extends string
                ? `literal string: ${T}`
                : number extends T
                  ? "number"
                  : T extends number
                    ? `literal number: ${T}`
                    : bigint extends T
                      ? "bigint"
                      : T extends bigint
                        ? `literal bigint: ${T}`
                        : T extends null
                          ? "null"
                          : T extends undefined
                            ? "undefined"
                            : T extends (...args: any[]) => any
                              ? "function"
                              : "...";
export type MismatchInfo<Actual, Expected> =
  And<[Extends<PrintType<Actual>, "...">, Not<IsAny<Actual>>]> extends true
    ? And<[Extends<any[], Actual>, Extends<any[], Expected>]> extends true
      ? Array<MismatchInfo<Extract<Actual, any[]>[number], Extract<Expected, any[]>[number]>>
      : {
          [K in UsefulKeys<Actual> | UsefulKeys<Expected>]: MismatchInfo<
            K extends keyof Actual ? Actual[K] : never,
            K extends keyof Expected ? Expected[K] : never
          >;
        }
    : StrictEqualUsingBranding<Actual, Expected> extends true
      ? Actual
      : `Expected: ${PrintType<Expected>}, Actual: ${PrintType<Exclude<Actual, Expected>>}`;
export type ExpectNull<T> = {
  [expectNull]: T;
  result: ExtendsExcludingAnyOrNever<T, null>;
};
export type ExpectUndefined<T> = {
  [expectUndefined]: T;
  result: ExtendsExcludingAnyOrNever<T, undefined>;
};
export type ExpectNumber<T> = {
  [expectNumber]: T;
  result: ExtendsExcludingAnyOrNever<T, number>;
};
export type ExpectString<T> = {
  [expectString]: T;
  result: ExtendsExcludingAnyOrNever<T, string>;
};
export type ExpectBoolean<T> = {
  [expectBoolean]: T;
  result: ExtendsExcludingAnyOrNever<T, boolean>;
};
export type ExpectVoid<T> = {
  [expectVoid]: T;
  result: ExtendsExcludingAnyOrNever<T, void>;
};
export type ExpectFunction<T> = {
  [expectFunction]: T;
  result: ExtendsExcludingAnyOrNever<T, (...args: any[]) => any>;
};
export type ExpectObject<T> = {
  [expectObject]: T;
  result: ExtendsExcludingAnyOrNever<T, object>;
};
export type ExpectArray<T> = {
  [expectArray]: T;
  result: ExtendsExcludingAnyOrNever<T, any[]>;
};
export type ExpectSymbol<T> = {
  [expectSymbol]: T;
  result: ExtendsExcludingAnyOrNever<T, symbol>;
};
export type ExpectAny<T> = {
  [expectAny]: T;
  result: IsAny<T>;
};
export type ExpectUnknown<T> = {
  [expectUnknown]: T;
  result: IsUnknown<T>;
};
export type ExpectNever<T> = {
  [expectNever]: T;
  result: IsNever<T>;
};
export type ExpectNullable<T> = {
  [expectNullable]: T;
  result: Not<StrictEqualUsingBranding<T, NonNullable<T>>>;
};
export type ExpectBigInt<T> = {
  [expectBigInt]: T;
  result: ExtendsExcludingAnyOrNever<T, bigint>;
};
export type Scolder<
  Expecter extends {
    result: boolean;
  },
  Options extends {
    positive: boolean;
  },
> = Expecter["result"] extends Options["positive"]
  ? () => true
  : Options["positive"] extends true
    ? Expecter
    : Inverted<Expecter>;
export {};