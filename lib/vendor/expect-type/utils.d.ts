export type Not<T extends boolean> = T extends true ? false : true;
export type Or<Types extends boolean[]> = Types[number] extends false ? false : true;
export type And<Types extends boolean[]> = Types[number] extends true ? true : false;
export type Eq<Left extends boolean, Right extends boolean> = Left extends true ? Right : Not<Right>;
export type Xor<Types extends [boolean, boolean]> = Not<Eq<Types[0], Types[1]>>;
export type IsNever<T> = [T] extends [never] ? true : false;
export type IsAny<T> = [T] extends [Secret] ? Not<IsNever<T>> : false;
export type IsUnknown<T> = [unknown] extends [T] ? Not<IsAny<T>> : false;
export type IsNeverOrAny<T> = Or<[IsNever<T>, IsAny<T>]>;
export type UsefulKeys<T> = T extends any[]
  ? {
      [K in keyof T]: K;
    }[number]
  : keyof T;
export type RequiredKeys<T> = Extract<
  {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
  }[keyof T],
  keyof T
>;
export type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;
export type ReadonlyKeys<T> = Extract<
  {
    [K in keyof T]-?: ReadonlyEquivalent<
      {
        [_K in K]: T[K];
      },
      {
        -readonly [_K in K]: T[K];
      }
    > extends true
      ? never
      : K;
  }[keyof T],
  keyof T
>;
export type Extends<Left, Right> = IsNever<Left> extends true ? IsNever<Right> : [Left] extends [Right] ? true : false;
export type ExtendsExcludingAnyOrNever<Left, Right> = IsAny<Left> extends true ? IsAny<Right> : Extends<Left, Right>;
export type StrictEqualUsingTSInternalIdenticalToOperator<L, R> =
  (<T>() => T extends (L & T) | T ? true : false) extends <T>() => T extends (R & T) | T ? true : false
    ? IsNever<L> extends IsNever<R>
      ? true
      : false
    : false;
export type MutuallyExtends<Left, Right> = And<[Extends<Left, Right>, Extends<Right, Left>]>;
export type AValue =
  | {
      [avalue]?: undefined;
    }
  | string
  | number
  | boolean
  | symbol
  | bigint
  | null
  | undefined
  | void;
export type MismatchArgs<ActualResult extends boolean, ExpectedResult extends boolean> =
  Eq<ActualResult, ExpectedResult> extends true ? [] : [Mismatch];
export interface ExpectTypeOfOptions {
  positive: boolean;
  branded: boolean;
}
export type UnionToIntersection<Union> = (Union extends any ? (distributedUnion: Union) => void : never) extends (
  mergedIntersection: infer Intersection,
) => void
  ? Intersection
  : never;
export type LastOf<Union> =
  UnionToIntersection<Union extends any ? () => Union : never> extends () => infer R ? R : never;
export type TuplifyUnion<Union, LastElement = LastOf<Union>> =
  IsNever<Union> extends true ? [] : [...TuplifyUnion<Exclude<Union, LastElement>>, LastElement];
export type UnionToTuple<Union> = TuplifyUnion<Union>;
export type IsTuple<T> = Or<[Extends<T, []>, Extends<T, [any, ...any[]]>]>;
export type IsUnion<T> = Not<Extends<UnionToTuple<T>["length"], 1>>;
export type DeepPickMatchingProps<Left, Right> =
  Left extends Record<string, unknown>
    ? Pick<
        {
          [K in keyof Left]: K extends keyof Right ? DeepPickMatchingProps<Left[K], Right[K]> : never;
        },
        Extract<keyof Left, keyof Right>
      >
    : Left;
export {};