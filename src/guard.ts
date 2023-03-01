import { POJO } from "./pojo";

/**
 * Applies `arrayTransform` if the argument is an array,
 * and `otherTransform` if it is not.
 *
 * @param arrayTransform
 * @param otherTransform
 *
 * @example
 * ```ts
 * import * as G from "flurp/guard";
 * import * as A from "flurp/array";
 * import * as L from "flurp/logic";
 *
 * const lengthOrZero = G.ifIsArray(A.length, L.always(0));
 * lengthOrZero([3]);            // 1
 * lengthOrZero(3);              // 0
 * ```
 */
export function ifIsArray<T, U>(
  arrayTransform: (x: Array<unknown>) => U,
  otherTransform: (x: T) => U
) {
  return function (x: T | Array<unknown>) {
    if (Array.isArray(x)) {
      return arrayTransform(x);
    }

    return otherTransform(x);
  };
}

/**
 * Transforms `null` to `nullValue`, and applies `otherTransform` to all
 * other values.
 *
 * @param nullValue
 * @param otherTransform
 *
 * @example
 * ```ts
 * import * as G from "flurp/guard";
 * import * as L from "flurp/logic";
 *
 * const nullToEmpty = G.ifIsNull([], L.identity);
 * nullToEmpty(null);          // []
 * nullToEmpty([3, 4, 5]);     // [3, 4, 5]
 * ```
 */
export function ifIsNull<T, U>(nullValue: U, otherTransform: (x: T) => U) {
  return function (x: T | null) {
    if (x === null) {
      return nullValue;
    }

    return otherTransform(x);
  };
}

/**
 * Applies `nullishTransform` if the argument is nullish, i.e., `null` or `undefined`,
 * and `otherTransform` if it is not.
 *
 * @param nullishValue
 * @param otherTransform
 *
 * @example
 * ```ts
 * import * as G from "flurp/guard";
 * import * as L from "flurp/logic";
 *
 * const nullishToEmpty = G.ifIsNullish([], L.identity);
 * nullishToEmpty(null);               // []
 * nullishToEmpty(undefined);          // []
 * nullishToEmpty([3, 4, 5]);          // [3, 4, 5]
 * ```
 */
export function ifIsNullish<T, U>(
  nullishValue: U,
  otherTransform: (x: T) => U
) {
  return function (x: T | null | undefined) {
    if (x === null || x === undefined) {
      return nullishValue;
    }

    return otherTransform(x);
  };
}

/**
 * Applies `numberTransform` if the argument is a number,
 * and `otherTransform` if it is not.
 *
 * @param numberTransform
 * @param otherTransform
 *
 * @example
 * ```ts
 * import * as G from "flurp/guard";
 * import * as N from "flurp/number";
 * import * as L from "flurp/logic";
 *
 * const doubleOrUndefined = G.ifIsNumber(N.multiply(2), L.always(undefined);
 * doubleOrUndefined(3);       // 6
 * doubleOrUndefined("3");     // undefined
 * ```
 */
export function ifIsNumber<T, U>(
  numberTransform: (x: number) => U,
  otherTransform: (x: T) => U
) {
  return function (x: T | number) {
    if (typeof x === "number") {
      return numberTransform(x);
    }

    return otherTransform(x);
  };
}

/**
 * Applies `pojoTransform` if the argument is a "Plain Old JavaScript Object",
 * and `otherTransform` if it is not.
 *
 * @remarks
 * A "Plain Old JavaScript Object) is not anything that broadly derives
 * from the Object type. It excludes arrays, null, and other entities
 * not of the "curly brace" type.
 *
 * @param pojoTransform
 * @param otherTransform
 *
 * @example
 * ```ts
 * import * as G from "flurp/guard";
 * import * as P from "flurp/pojo";
 * import * as L from "flurp/logic";
 *
 * const xOrFalse = G.ifIsPOJO(P.getOr("x"), L.FALSE);
 * xOrFalse({x: 5});           // 5
 * xOrFalse([5]);              // false
 *
 * ```
 */
export function ifIsPOJO<T, U>(
  pojoTransform: (x: POJO<unknown>) => U,
  otherTransform: (x: T) => U
) {
  return function (x: T | POJO<unknown>) {
    if (isPOJO(x)) {
      return pojoTransform(x);
    }

    return otherTransform(x);
  };
}

/**
 * Applies `stringTransform` if the argument is a string,
 * and `otherTransform` if it is not.
 *
 * @param stringTransform
 * @param otherTransform
 *
 * @example
 * ```ts
 * import * as G from "flurp/guard";
 * import * as S from "flurp/string";
 * import * as L from "flurp/logic";
 *
 * const lengthOrZero = G.ifIsString(S.length, L.always(0));
 * lengthOrZero("50");            // 2
 * lengthOrZero(50);              // 0
 * ```
 */
export function ifIsString<T, U>(
  stringTransform: (x: string) => U,
  otherTransform: (x: T) => U
) {
  return function (x: T | string) {
    if (typeof x === "string") {
      return stringTransform(x);
    }

    return otherTransform(x);
  };
}

/**
 * Transforms `undefined` to `undefinedValue`, and applies `otherTransform` to all
 * other values.
 *
 * @param undefinedValue
 * @param otherTransform
 *
 * @example
 * ```ts
 * import * as G from "flurp/guard";
 * import * as L from "flurp/logic";
 *
 * const undefinedToEmpty = G.ifIsUndefined([], L.identity);
 * undefinedToEmpty(undefined);          // []
 * undefinedToEmpty([3, 4, 5]);          // [3, 4, 5]
 * ```
 */
export function ifIsUndefined<T, U>(
  undefinedValue: U,
  otherTransform: (x: T) => U
) {
  return function (x: T | undefined) {
    if (x === undefined) {
      return undefinedValue;
    }

    return otherTransform(x);
  };
}

/**
 * @param x
 *
 * @example
 * ```ts
 * import * as G from "flurp/guard";
 *
 * G.isArray([3, 4]);         // true
 * G.isArray({x: 3, y: 4});   // false
 * ```
 */
export function isArray(x: unknown): x is Array<unknown> {
  return Array.isArray(x);
}

/**
 * Executes a type guard for the `Array<unknown>` type prior to testing a `condition` that requires an
 * input of `Array<unknown>` type, returning `true` only if both the type check and `condition` pass.
 *
 * @remarks
 * This is especially useful in pipelines where the TS type checker would not detect that a type
 * guard had been applied using other alternatives.
 *
 * @param condition
 *
 * @example
 * ```ts
 * import * as G from "flurp/guard";
 * import * as L from "flurp/logic";
 *
 * const goodIsEmpty = G.isArrayAnd(A.isEmpty);
 * goodIsEmpty([]);                // true
 * goodIsEmpty([5]);               // false
 * goodIsEmpty({});                // false
 *
 * const badIsEmpty = L.both(G.isArray, A.isEmpty);
 * badIsEmpty({});         // TS compiler will not recognize G.isArray as a type guard.
 * ```
 */
export function isArrayAnd<T>(condition: (arr: Array<unknown>) => boolean) {
  return function (x: T) {
    if (isArray(x)) {
      return condition(x);
    }

    return false;
  };
}

/**
 * @param x
 *
 * @example
 * ```ts
 * import * as G from "flurp/guard";
 *
 * G.isBoolean(false);    // true
 * G.isBoolean(0);        // false
 * ```
 */
export function isBoolean(x: unknown) {
  return typeof x === "boolean";
}

/**
 * @param x
 *
 * @example
 * ```ts
 * import * as G from "flurp/guard";
 *
 * G.isFunction(x => x + 1);     // true
 * G.isFunction("x => x + 1");   // false
 * ```
 */
export function isFunction(x: unknown) {
  return typeof x === "function";
}

/**
 * Nullish refers to null or undefined.
 *
 * @param x
 *
 * @example
 * ```ts
 * import * as G from "flurp/guard";
 *
 * G.isNotNullish({});           // true
 * G.isNotNullish(null);         // false
 * G.isNullNullish(undefined);   // false
 * ```
 */
export function isNotNullish(x: unknown) {
  return !(x === null || x === undefined);
}

/**
 * @param x
 *
 * @example
 * ```ts
 * import * as G from "flurp/guard";
 *
 * G.isNull(null);        // true
 * G.isNull(undefined);   // false
 * ```
 */
export function isNull(x: unknown) {
  return x === null;
}

/**
 * Nullish refers to null or undefined.
 *
 * @param x
 *
 * @example
 * ```ts
 * import * as G from "flurp/guard";
 *
 * G.isNullish(null);         // true
 * G.islNullish(undefined);   // true
 * G.isNullish({});           // false
 * ```
 */
export function isNullish(x: unknown) {
  return x === null || x === undefined;
}

/**
 * @param x
 *
 * @example
 * ```ts
 * import * as G from "flurp/guard";
 * G.isNumber(42);    // true
 * G.isNumber("42");  // false
 * ```
 */
export function isNumber(x: unknown) {
  return typeof x === "number";
}

/**
 * Executes a type guard for the `number` type prior to testing a `condition` that requires an
 * input of `number` type, returning `true` only if both the type check and `condition` pass.
 *
 * @remarks
 * This is especially useful in pipelines where the TS type checker would not detect that a type
 * guard had been applied using other alternatives.
 *
 * @param condition
 *
 * @example
 * ```ts
 * import * as G from "flurp/guard";
 * import * as L from "flurp/logic";
 *
 * // isFinite is a JS built-in. While vanilla JS is tolerant,
 * // TS requires its parameter to be numeric.
 *
 * const goodIsFinite = G.isNumberAnd(isFinite);
 * goodIsFinite(5);                // true
 * goodIsFinite(5/0);              // false
 * goodIsFinite("5");              // false
 *
 * const badIsFinite = L.both(G.isNumber, isFinite);
 * badIsFinite("5");         // TS compiler will not recognize G.isNumber as a type guard.
 * ```
 */
export function isNumberAnd<T>(condition: (x: number) => boolean) {
  return function (x: T) {
    if (typeof x === "number") {
      return condition(x);
    }

    return false;
  };
}

/**
 * This is named isPOJO ("Plain Old JavaScript Object)
 * rather than isObject to emphasize that it does not test for
 * anything that broadly derives from the Object type.
 * It is instead intended to exclude arrays, null, and other entities
 * not of the "curly brace" type.
 *
 * @param x
 *
 * @example
 * ```ts
 * import * as G from "flurp/guard";
 *
 * G.isPOJO({x: 3});         // true
 * G.isPOJO({});             // true
 * G.isPOJO([]);             // false
 * G.isPOJO(null);           // false
 * G.isPOJO(undefined);      // false
 * G.isPOJO(Number(5));      // false
 * ```
 */
export function isPOJO(x: unknown): x is POJO<unknown> {
  return x?.constructor === Object;
}

export function isPOJOAnd<T>(condition: (x: POJO<unknown>) => boolean) {
  return function (x: T) {
    if (isPOJO(x)) {
      return condition(x);
    }

    return false;
  };
}

/**
 * @param x
 *
 * @example
 * ```ts
 * import * as G from "flurp/guard";
 *
 * G.isString("42");    // true
 * G.isString(42);      // false
 * ```
 */
export function isString(x: unknown) {
  return typeof x === "string";
}

/**
 * Executes a type guard for the `string` type prior to testing a `condition` that requires an
 * input of `string` type, returning `true` only if both the type check and `condition` pass.
 *
 * @remarks
 * This is especially useful in pipelines where the TS type checker would not detect that a type
 * guard had been applied using other alternatives.
 *
 * @param condition
 *
 * @example
 * ```ts
 * import * as G from "flurp/guard";
 * import * as L from "flurp/logic";
 * import * as S from "flurp/string";
 *
 * const goodStartW = G.isStringAnd(S.startsWith("w"));
 * goodStartW("weasel");                // true
 * goodStartW("a weasel");              // false
 * goodStartW(/a weasel/);              // false
 *
 * const badStartW = L.both(G.isString, S.startsWith("w"));
 * badStartW(/a weasel/);         // TS compiler will not recognize G.isString as a type guard.
 * ```
 */
export function isStringAnd<T>(condition: (x: string) => boolean) {
  return function (x: T) {
    if (typeof x === "string") {
      return condition(x);
    }

    return false;
  };
}

/**
 * @param x
 *
 * @example
 * ```ts
 * import * as G from "flurp/guard";
 *
 * G.isUndefined(undefined);    // true
 * G.isUndefined(null);         // false
 * ```
 */
export function isUndefined(x: unknown) {
  return x === undefined;
}
