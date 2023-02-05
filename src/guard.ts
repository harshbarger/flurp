import { POJO } from "../src/pojo";

/**
 * Applies `arrayTransform` if the argument is a number,
 * and an optional different transform otherwise.
 *
 * @param arrayTransform
 * @param otherTransform
 *
 * @example
 * ```ts
 * import * as G from "flurp/guard";
 * import * as N from "flurp/guard";
 * import * as L from "flurp/logic";
 *
 * const lengthOrUnchanged = G.ifIsArray(A.length);
 * lengthOrUnchanged([3]);       // 1
 * lengthOrUnchanged(3);         // 3
 *
 * const lengthOrZero = G.ifIsArray(A.length, L.always(0));
 * lengthOrZero([3]);            // 1
 * lengthOrZero(3);              // 0
 * ```
 */
export function ifIsArray<T, U>(
  arrayTransform: (x: Array<unknown>) => U,
  otherTransform?: (x: T) => U
) {
  if (otherTransform === undefined) {
    return function (x: T) {
      if (Array.isArray(x)) {
        return arrayTransform(x);
      }

      return x;
    };
  }

  return function (x: T) {
    if (Array.isArray(x)) {
      return arrayTransform(x);
    }

    return otherTransform(x);
  };
}

/**
 * Applies `numberTransform` if the argument is a number,
 * and an optional different transform otherwise.
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
 * const doubleOrUnchanged = G.ifIsNumber(N.multiply(2));
 * doubleOrUnchanged(3);       // 6
 * doubleOrUnchanged("3");     // "3"
 *
 * const doubleOrUndefined = G.ifIsNumber(N.multiply(2), L.always(undefined);
 * doubleOrUndefined(3);       // 6
 * doubleOrUndefined("3");     // undefined
 * ```
 */
export function ifIsNumber<T, U>(
  numberTransform: (x: number) => U,
  otherTransform?: (x: T) => U
) {
  if (otherTransform === undefined) {
    return function (x: T) {
      if (typeof x === "number") {
        return numberTransform(x);
      }

      return x;
    };
  }

  return function (x: T) {
    if (typeof x === "number") {
      return numberTransform(x);
    }

    return otherTransform(x);
  };
}

/**
 * Applies `pojoTransform` if the argument is a "Plain Old JavaScript Object",
 * and an optional different transform otherwise.
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
 * const xOrUnchanged = G.ifIsPOJO(P.getOr("x"));
 * xOrUnchanged({x: 5});       // 5
 * xOrUnchanged([5]);          // [5]
 *
 * const xOrFalse = G.ifIsPOJO(P.getOr("x"), L.FALSE);
 * xOrFalse({x: 5});           // 5
 * xOrFalse([5]);              // false
 *
 * ```
 */
export function ifIsPOJO<T, U>(
  pojoTransform: (x: POJO<unknown>) => U,
  otherTransform?: (x: T) => U
) {
  if (otherTransform === undefined) {
    return function (x: T) {
      if (x?.constructor === Object) {
        return pojoTransform(x);
      }

      return x;
    };
  }

  return function (x: T) {
    if (x?.constructor === Object) {
      return pojoTransform(x);
    }

    return otherTransform(x);
  };
}

/**
 * Applies `numberTransform` if the argument is a number,
 * and an optional different transform otherwise.
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
 * const lengthOrUnchanged = G.ifIsString(S.length);
 * lengthOrUnchanged("50");       // 2
 * lengthOrUnchanged(50);         // 50
 *
 * const lengthOrZero = G.ifIsString(S.length, L.always(0));
 * lengthOrZero("50");            // 2
 * lengthOrZero(50);              // 0
 * ```
 */
export function ifIsString<T, U>(
  stringTransform: (x: string) => U,
  otherTransform?: (x: T) => U
) {
  if (otherTransform === undefined) {
    return function (x: T) {
      if (typeof x === "string") {
        return stringTransform(x);
      }

      return x;
    };
  }

  return function (x: T) {
    if (typeof x === "string") {
      return stringTransform(x);
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
export function isArray(x: unknown) {
  return Array.isArray(x);
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
export function isPOJO(x: unknown) {
  return x?.constructor === Object;
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
