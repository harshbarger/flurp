/**
 * Tries to execute function `transform`. In case of an exception, it returns
 * `null` instead. Passes through `null` and `undefined` without attempting `transform`.
 *
 * @param transform
 *
 * @example
 * ```ts
 * import { R } from "flurp";
 *
 * const tryMath = R.catchAsNull((s: string) => Math[s](1));
 * tryMath("log");              // 0
 * tryMath("no-such-function")  // null (instead of usual exception)
 * tryMath(undefined);          // undefined
 * tryMath(null);          // null
 * ```
 */
declare function catchAsNull<T, U>(transform: (val: T) => U | undefined | null): (val: T | null | undefined) => T | U | null | undefined;
/**
 * @remarks
 * Identical to {@link guards! isNull} from the {@link guards} module. Use whichever you find
 * more appropriate.
 *
 * @param val
 *
 * @example
 * ```ts
 * import { R } from "flurp";
 *
 * R.isNull(null);            // true
 * R.isNull(undefined);       // false
 * ```
 */
declare function isNull(val: unknown): boolean;
/**
 * @remarks
 * Identical to {@link guards! `isUndefined`} from the {@link guards} module. Use whichever you find
 * more appropriate.
 *
 * @param val
 *
 * @example
 * ```ts
 * import { R } from "flurp";
 *
 * R.isUndefined(undefined);        // true
 * R.isUndefined(null);             // false
 * ```
 */
declare function isUndefined(val: unknown): boolean;
/**
 * Returns `undefined` or `null` unchanged, and applies `transform` to other values.
 *
 * @remarks This isn't exactly a map as the term is used in functional programming, since
 * the value operated on is not wrapped in a container. It is still called `map`, however,
 * because it serves the same essential purpose as a map function in monadic libraries.
 * I.e., it passes `null` or `undefined` untransformed so that the transforming functions need
 * not account for those cases, just as a monadic map passes through None, etc.
 *
 * @param transform
 *
 * @example
 * ```ts
 * import { R, N } from "flurp";
 *
 * const double = R.map(N.multiply(2));
 * double(5);             // 10
 * double(undefined);     // undefined
 * double(null);          // null
 * ```
 */
declare function map<T, U>(transform: (val: T) => U | null | undefined): (val: T | null | undefined) => T | U | null | undefined;
/**
 * Changes `null` to `newVal` and passes others through unchanged.
 *
 * @param newVal
 *
 * @example
 * ```ts
 * import { R } from "flurp";
 *
 * const nullToFive = R.nullTo(5);
 * nullToFive(null);          // 5
 * nullToFive(2);             // 2
 * nullToFive(undefined);     // undefined
 * ```
 */
declare function nullTo<T, U>(newVal: U): (val: T | null | undefined) => U | (T & {}) | undefined;
/**
 * Returns null if a non-nullable value passes `condition`,
 * otherwise returning the value (including `null` and `undefined`) unchanged.
 *
 * @param condition
 *
 * @example
 * ```ts
 * import { R } from "flurp";
 *
 * const emptyToNull = R.map(A.isEmpty);
 * emptyToNull([]);            // null
 * emptyToNull([4, 5, 6]);     // [4, 5, 6])
 * emptyToNull(undefined);     // undefined
 * ```
 */
declare function toNullIf<T>(condition: (val: T) => boolean): (val: T | null | undefined) => T | null | undefined;
/**
 * Returns `undefined` if a non-nullable value passes `condition`,
 * otherwise returning the value (including `null` and `undefined`) unchanged.
 *
 * @param condition
 *
 * @example
 * ```ts
 * import { R } from "flurp";
 *
 * const emptyToUndefined = R.map(A.isEmpty);
 * emptyToUndefined([]);            // undefined
 * emptyToUndefined([4, 5, 6]);     // [4, 5, 6])
 * emptyToUndefined(null);          // null
 * ```
 */
declare function toUndefinedIf<T>(condition: (val: T) => boolean): (val: T | null | undefined) => T | null | undefined;
/**
 * Changes `undefined` to `newVal` and passes others through unchanged.
 *
 * @param newVal
 *
 * @example
 * ```ts
 * import { R } from "flurp";
 *
 * const undefinedToFive = R.undefinedTo(5);
 * undefinedToFive(undefined);     // 5
 * undefinedToFive(2);             // 2
 * undefinedToFive(null);          // null
 * ```
 */
declare function undefinedTo<T, U>(newVal: U): (val: T | null | undefined) => U | (T & {}) | null;

declare const result_catchAsNull: typeof catchAsNull;
declare const result_isNull: typeof isNull;
declare const result_isUndefined: typeof isUndefined;
declare const result_map: typeof map;
declare const result_nullTo: typeof nullTo;
declare const result_toNullIf: typeof toNullIf;
declare const result_toUndefinedIf: typeof toUndefinedIf;
declare const result_undefinedTo: typeof undefinedTo;
declare namespace result {
  export {
    result_catchAsNull as catchAsNull,
    result_isNull as isNull,
    result_isUndefined as isUndefined,
    result_map as map,
    result_nullTo as nullTo,
    result_toNullIf as toNullIf,
    result_toUndefinedIf as toUndefinedIf,
    result_undefinedTo as undefinedTo,
  };
}

export { isUndefined as a, toUndefinedIf as b, catchAsNull as c, isNull as i, map as m, nullTo as n, result as r, toNullIf as t, undefinedTo as u };
