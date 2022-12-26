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
export function catchAsNull<T, U>(transform: (val: T) => U | undefined | null) {
  return function (val: T | null | undefined) {
    if (val === null || val === undefined) {
      return val;
    }

    try {
      return transform(val);
    } catch {
      return null;
    }
  };
}

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
export function isNull(val: unknown) {
  return val === null;
}

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
export function isUndefined(val: unknown) {
  return val === undefined;
}

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
export function map<T, U>(transform: (val: T) => U | null | undefined) {
  return (val: T | null | undefined) =>
    val === null || val === undefined ? val : transform(val);
}

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
export function nullTo<T, U>(newVal: U) {
  return (val: T | null | undefined) => (val === null ? newVal : val);
}

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
export function toNullIf<T>(condition: (val: T) => boolean) {
  return function (val: T | null | undefined) {
    if (val === null || val === undefined) {
      return val;
    }

    return condition(val) ? null : val;
  };
}

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
export function toUndefinedIf<T>(condition: (val: T) => boolean) {
  return function (val: T | null | undefined) {
    if (val === null || val === undefined) {
      return val;
    }

    return condition(val) ? undefined : val;
  };
}

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
export function undefinedTo<T, U>(newVal: U) {
  return (val: T | null | undefined) => (val === undefined ? newVal : val);
}
