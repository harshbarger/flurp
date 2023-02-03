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
