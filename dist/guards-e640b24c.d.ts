/**
 * @param x
 *
 * @example
 * ```ts
 * import * as G from "flurp/guards";
 * G.isArray([3, 4]);         // true
 * G.isArray({x: 3, y: 4});   // false
 * ```
 */
declare function isArray(x: unknown): boolean;
/**
 * @param x
 *
 * @example
 * ```ts
 * import * as G from "flurp/guards";
 * G.isBoolean(false);    // true
 * G.isBoolean(0);        // false
 * ```
 */
declare function isBoolean(x: unknown): boolean;
/**
 * @param x
 *
 * @example
 * ```ts
 * import * as G from "flurp/guards";
 * G.isFunction(x => x + 1);     // true
 * G.isFunction("x => x + 1");   // false
 * ```
 */
declare function isFunction(x: unknown): boolean;
/**
 * Nullish refers to null or undefined.
 *
 * @param x
 *
 * @example
 * ```ts
 * import * as G from "flurp/guards";
 * G.isNotNullish({});           // true
 * G.isNotNullish(null);         // false
 * G.isNullNullish(undefined);   // false
 * ```
 */
declare function isNotNullish(x: unknown): boolean;
/**
 * @param x
 *
 * @example
 * ```ts
 * import * as G from "flurp/guards";
 * G.isNull(null);        // true
 * G.isNull(undefined);   // false
 * ```
 */
declare function isNull(x: unknown): boolean;
/**
 * Nullish refers to null or undefined.
 *
 * @param x
 *
 * @example
 * ```ts
 * import * as G from "flurp/guards";
 * G.isNullish(null);         // true
 * G.islNullish(undefined);   // true
 * G.isNullish({});           // false
 * ```
 */
declare function isNullish(x: unknown): boolean;
/**
 * @param x
 *
 * @example
 * ```ts
 * import * as G from "flurp/guards";
 * G.isNumber(42);    // true
 * G.isNumber("42");  // false
 * ```
 */
declare function isNumber(x: unknown): boolean;
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
 * import * as G from "flurp/guards";
 * G.isPOJO({x: 3});         // true
 * G.isPOJO({});             // true
 * G.isPOJO([]);             // false
 * G.isPOJO(null);           // false
 * G.isPOJO(undefined);      // false
 * G.isPOJO(Number(5));      // false
 * ```
 */
declare function isPOJO(x: unknown): boolean;
/**
 * @param x
 *
 * @example
 * ```ts
 * import * as G from "flurp/guards";
 * G.isString("42");    // true
 * G.isString(42);      // false
 * ```
 */
declare function isString(x: unknown): boolean;
/**
 * @param x
 *
 * @example
 * ```ts
 * import * as G from "flurp/guards";
 * G.isUndefined(undefined);    // true
 * G.isUndefined(null);         // false
 * ```
 */
declare function isUndefined(x: unknown): boolean;

declare const guards_isArray: typeof isArray;
declare const guards_isBoolean: typeof isBoolean;
declare const guards_isFunction: typeof isFunction;
declare const guards_isNotNullish: typeof isNotNullish;
declare const guards_isNull: typeof isNull;
declare const guards_isNullish: typeof isNullish;
declare const guards_isNumber: typeof isNumber;
declare const guards_isPOJO: typeof isPOJO;
declare const guards_isString: typeof isString;
declare const guards_isUndefined: typeof isUndefined;
declare namespace guards {
  export {
    guards_isArray as isArray,
    guards_isBoolean as isBoolean,
    guards_isFunction as isFunction,
    guards_isNotNullish as isNotNullish,
    guards_isNull as isNull,
    guards_isNullish as isNullish,
    guards_isNumber as isNumber,
    guards_isPOJO as isPOJO,
    guards_isString as isString,
    guards_isUndefined as isUndefined,
  };
}

export { isBoolean as a, isFunction as b, isNotNullish as c, isNull as d, isNullish as e, isNumber as f, guards as g, isPOJO as h, isArray as i, isString as j, isUndefined as k };
