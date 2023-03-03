/**
 * @param conditions
 *
 * @example
 * ```ts
 * import { L, N } from "flurp";
 * const f = L.allPass(
 *   N.isPositive,
 *   N.isEven,
 *   (x: number) => x % 3 === 0
 * );
 * f(6);   // true
 * f(3);   // false
 * ```
 */

export function allPass<T>(...conditions: Array<(x: T) => boolean>) {
  return (a: T) => conditions.every((f) => f(a));
}

/**
 * @param conditions
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 *
 * const f L.allFail(
 *   N.isNegative,
 *   N.isEven,
 *   (x: number) => x % 3 === 0
 * );
 * f(5);    // true;
 * f(4);    // false;
 * ```
 */
export function allFail<T>(...conditions: Array<(x: T) => boolean>) {
  return (a: T) => conditions.every((f) => !f(a));
}

/**
 * Returns the same value regardless of the input
 *
 * @param val
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 *
 * const five = L.always(5);
 * five("weasel");   // 5
 * ```
 */
export function always<T>(val: T) {
  return (_: unknown) => val;
}

/**
 * @param conditions
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 * import * as N from "flurp/number";
 *
 * const f = L.anyFail(
 *   N.isPositive,
 *   N.isLt(10),
 *   (x: number) => x % 3 === 0
 * );
 * f(5);   // true;
 * f(6);   // false;
 * ```
 */
export function anyFail<T>(...conditions: Array<(x: T) => boolean>) {
  return (a: T) => conditions.some((f) => !f(a));
}

/**
 * @param conditions
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 *
 * const f = L.anyPass(
 *   N.isPositive,
 *   N.isEven,
 *   (x: number) => x % 3 === 0
 * );
 * f(1);  // true;
 * f(-5);  // false;
 * ```
 */
export function anyPass<T>(...conditions: Array<(x: T) => boolean>) {
  return (a: T) => conditions.some((f) => f(a));
}

/**
 * @param condition1
 * @param condition2
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 *
 * const f = L.both(
 *   N.isPositive,
 *   N.isLt(10)
 * );
 * f(3);     // true;
 * f(-3);    // false;
 * ```
 */
export function both<T>(
  condition1: (x: T) => boolean,
  condition2: (x: T) => boolean
) {
  return (a: T) => condition1(a) && condition2(a);
}

/**
 * Applies the transform corresponding to the first matching condition, or the `fallback`
 * transform if no predicate from `conditions` matches.
 *
 * @param conditions
 * @param fallback
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 *
 * const f = L.branch([
 *   [N.isGt(100), N.multiply(0.9)],
 *   [N.isGt(50), N.subtract(5)],
 *   [N.isGt(0), L.identity],
 * ], L.always(0));
 *
 * f(500);     // 450
 * f(100);     // 95
 * f(30);      // 30
 * f(-10)      // 0
 * ```
 */
export function branch<T, U>(
  conditions: Array<[(x: T) => boolean, (x: T) => U]>,
  fallback: (x: T) => U
) {
  return function (x: T) {
    let i = 0;
    const len = conditions.length;

    while (i < len) {
      const [cond, f] = conditions[i];
      if (cond(x)) {
        return f(x);
      }
      i++;
    }

    return fallback(x);
  };
}

/**
 * @param condition1
 * @param condition2
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 * import * as N from "flurp/number";
 *
 * const f = L.either(
 *   N.isPositive,
 *   N.isEven,
 * );
 * f(5);   // true;
 * f(-3);  // false;
 * ```
 */
export function either<T>(
  condition1: (x: T) => boolean,
  condition2: (x: T) => boolean
) {
  return (a: T) => condition1(a) || condition2(a);
}

/**
 * @param val
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 *
 * const isZero = L.equals(0);
 * isZero(0);       // true;
 * isZero(1);       // false;
 * isZero(false);   // false;
 * ```
 */
export function equals<T>(val: T) {
  return (a: T) => a === val;
}

/**
 * @remarks
 * This function functions equivalently to (and is implemented with) the built-in
 * `Array.includes`. It is included in Flurp partly for its expressive semantics,
 * because mostly because `equalsOneOf` can use a more concise type annotation when
 * the type of possible inputs is wider than the elements of the array.
 *
 * @param arr
 *
 * ```ts
 * import * as L from "flurp/logic";
 *
 * const isVowel = L.equals<string | number>(["a", "e", "i", 'o", "u"]);
 * isVowel("a");       // true;
 * isVowel("b");       // false;
 * isVowel(5);         // false;
 * ```
 */
export function equalsOneOf<T>(arr: Array<T>) {
  return (x: T) => arr.includes(x);
}

/**
 * Always returns false
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 *
 * L.FALSE("weasel");       // false
 * ```
 */
export function FALSE(_: unknown) {
  return false;
}

/**
 * Passes the input through unchanged
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 *
 * L.identity(5);   // 5
 * ```
 */
export function identity<T>(a: T) {
  return a;
}

/**
 * @param condition
 * @param transformIfTrue
 * @param transformIfFalse
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 *
 * const f = L.ifElse(
 *   N.isNegative,
 *   x => `${x} is negative.`,
 *   x => `${x} is non-negative.`
 * );
 * f(-4);   // '-4 is negative.'
 * f(4);    // '4 is non-negative.'
 * ```
 */
export function ifElse<T, U>(
  condition: (x: T) => boolean,
  transformIfTrue: (x: T) => U,
  transformIfFalse: (x: T) => U
) {
  return (a: T) => (condition(a) ? transformIfTrue(a) : transformIfFalse(a));
}

/**
 * @param arr
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 *
 * const isVowel = L.isOneOf(["a", "e", "i", "o", "u"]);
 * isVowel("i");      // true
 * isVowel("m");      // false
 * ```
 */
export function isIncludedIn<T>(arr: ReadonlyArray<T>) {
  return (x: T) => arr.includes(x);
}

/**
 * @param condition1
 * @param condition2
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 *
 * const f = L.neither(
 *   N.isPositive,
 *   N.isEven
 * );
 * f(-5);   // true
 * f(5);    // false
 * ```
 */
export function neither<T>(
  condition1: (x: T) => boolean,
  condition2: (x: T) => boolean
) {
  return (a: T) => !condition1(a) && !condition2(a);
}

/**
 * @remarks
 * Note that this does not act on a boolean value. Rather, it
 * wraps a function with a boolean return value so that it returns
 * the complement of what the wrapped function would.
 *
 * @param f  must return a boolean
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 *
 * const notFive = L.not(L.equals(5));
 * notFive(5);    // false
 * notFive(4);    // true
 * ```
 */
export function not<T extends (...args: Array<never>) => boolean>(f: T) {
  return (...args: Parameters<typeof f>) => !f(...args);
}

/**
 * Turn nullish (null or undefined) values into the specified value.
 *
 * @param val
 *
 * @example
 *  ```ts
 * import * as L from "flurp/logic";
 *
 * const f = L.nullishTo(3);
 * f(undefined);   // 3
 * f(null);        // 3;
 * f("weasel");    // "weasel"
 */
export function nullishTo<T, U>(val: U) {
  return (a: T) => (a === null || a === undefined ? val : a);
}

/**
 * Always returns true
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 *
 * L.TRUE("weasel");       // true
 * ```
 */
export function TRUE(_: unknown) {
  return true;
}

/**
 * Applies a transformation if and only if the condition is false
 *
 * @param condition
 * @param f
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 *
 * const f = L.unless(
 *   N.isPositive,
 *   N.multiply(2)
 * );
 * f(5);   // 5;
 * f(-5);  // -10;
 * ```
 */
export function unless<T>(condition: (x: T) => boolean, f: (x: T) => T) {
  return (a: T) => (condition(a) ? a : f(a));
}

/**
 * Applies a transformation if and only if the condition is true
 *
 * @param condition
 * @param f
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 *
 * const f = L.when(
 *   N.isPositive,
 *   N.multiply(2)
 * );
 * f(5);    // 10;
 * f(-5);   // -5;
 * ```
 */
export function when<T>(condition: (x: T) => boolean, f: (x: T) => T) {
  return (a: T) => (condition(a) ? f(a) : a);
}
