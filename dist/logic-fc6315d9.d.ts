/**
 * @param conditions
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 * const f = L.allPass(
 *   x => x > 0,
 *   x => x % 2 === 0,
 *   (x: number) => x % 3 === 0
 * );
 * f(6);   // true
 * f(3);   // false
 * ```
 */
declare function allPass<T>(...conditions: Array<(x: T) => boolean>): (a: T) => boolean;
/**
 * @param conditions
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 * const f = L.allFail(
 *   x => x < 0,
 *   x => x % 2 === 0,
 *   (x: number) => x % 3 === 0
 * );
 * f(5);    // true;
 * f(4);    // false;
 * ```
 */
declare function allFail<T>(...conditions: Array<(x: T) => boolean>): (a: T) => boolean;
/**
 * Returns the same value regardless of the input
 *
 * @param val
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 * const f = L.always(5);
 * f("weasel");   // 5
 * ```
 */
declare function always<T>(val: T): (_: unknown) => T;
/**
 * @param conditions
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 * const f = L.anyFail(
 *   x => x > 0,
 *   x => x < 10,
 *   (x: number) => x % 3 === 0
 * );
 * f(5);   // true;
 * f(6);   // false;
 * ```
 */
declare function anyFail<T>(...conditions: Array<(x: T) => boolean>): (a: T) => boolean;
/**
 * @param conditions
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 * const f = L.anyPass(
 *   x => x > 0,
 *   (x: number) => x % 2 === 0,
 *   (x: number) => x % 3 === 0
 * );
 * f(1);  // true;
 * f(-5);  // false;
 * ```
 */
declare function anyPass<T>(...conditions: Array<(x: T) => boolean>): (a: T) => boolean;
/**
 * @param condition1
 * @param condition2
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 * const f = L.both(
 *   x => x > 0,
 *   x => x < 10
 * );
 * f(3);     // true;
 * f(-3);    // false;
 * ```
 */
declare function both<T>(condition1: (x: T) => boolean, condition2: (x: T) => boolean): (a: T) => boolean;
/**
 * Applies the transform corresponding to the first matching condition
 *
 * @remarks
 * Returns null if no condition is met. Consider using {@link TRUE} as a final condition to
 * prevent this.
 *
 *
 * @example
 * ```ts
 * const f = L.branch(
 *   [N.isGt(100), N.multiply(0.9)],
 *   [N.isGt(50), N.subtract(5)],
 *   [N.isGt(0), L.identity],
 *   [L.TRUE, L.always(0)],
 * );
 *
 * f(500);     // 450
 * f(100);     // 95
 * f(30);      // 30
 * f(-10)      // 0
 * ```
 */
declare function branch<T, U>(...args: Array<[(x: T) => boolean, (x: T) => U]>): (x: T) => U | null;
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
declare function either<T>(condition1: (x: T) => boolean, condition2: (x: T) => boolean): (a: T) => boolean;
/**
 * @param val
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 * const f = L.equals(0);
 * f(0);       // true;
 * f(1);       // false;
 * f(false);   // false;
 * ```
 */
declare function equals<T, U>(val: T): (a: T | U) => boolean;
/**
 * Always returns false
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 * L.FALSE("weasel");       // false
 * ```
 */
declare function FALSE(_: unknown): boolean;
/**
 * Passes the input through unchanged
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 * L.identity(5);   // 5
 * ```
 */
declare function identity<T>(a: T): T;
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
 *   x => x < 0,
 *   x => `${x} is negative.`,
 *   x => `${x} is non-negative.`
 * );
 * f(-4);   // '-4 is negative.'
 * f(4);    // '4 is non-negative.'
 * ```
 */
declare function ifElse<T, U>(condition: (x: T) => boolean, transformIfTrue: (x: T) => U, transformIfFalse: (x: T) => U): (a: T) => U;
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
declare function isIncludedIn<T>(arr: ReadonlyArray<T>): (x: T) => boolean;
/**
 * @param condition1
 * @param condition2
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 *
 * const f = L.neither(
 *   x => x > 0,
 *   x => x % 2 === 0
 * );
 * f(-5);   // true
 * f(5);    // false
 * ```
 */
declare function neither<T>(condition1: (x: T) => boolean, condition2: (x: T) => boolean): (a: T) => boolean;
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
 * const f = L.not(L.equals(5));
 * f(5);    // false
 * f(4);    // true
 * ```
 */
declare function not(f: (...args: Array<unknown>) => boolean): (...args: Parameters<typeof f>) => boolean;
/**
 * Turn nullish (null or undefined) values into the specified value.
 *
 * @param val
 *
 * @example
 *  ```ts
 * import * as L from "flurp/logic";
 * const f = L.nullishTo(3);
 * f(undefined);   // 3
 * f(null);        // 3;
 * f("weasel");    // "weasel"
 */
declare function nullishTo<T, U>(val: U): (a: T) => U | (T & {});
/**
 * Always returns true
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 * L.TRUE("weasel");       // true
 * ```
 */
declare function TRUE(_: unknown): boolean;
/**
 * Applies a transformation if and only if the condition is false
 *
 * @param condition
 * @param f
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 * const f = L.unless(
 *   x => x > 0,
 *   (x: number) => x * 2
 * );
 * f(5);   // 5;
 * f(-5);  // -10;
 * ```
 */
declare function unless<T, U>(condition: (x: T) => boolean, f: (x: T) => U): (a: T) => T | U;
/**
 * Applies a transformation if and only if the condition is true
 *
 * @param condition
 * @param f
 *
 * @example
 * ```ts
 * import * as L from "flurp/logic";
 * const f = L.when(
 *   x => x > 0,
 *   (x: number) => x * 2
 * );
 * f(5);    // 10;
 * f(-5);   // -5;
 * ```
 */
declare function when<T, U>(condition: (x: T) => boolean, f: (x: T) => U): (a: T) => T | U;

declare const logic_allPass: typeof allPass;
declare const logic_allFail: typeof allFail;
declare const logic_always: typeof always;
declare const logic_anyFail: typeof anyFail;
declare const logic_anyPass: typeof anyPass;
declare const logic_both: typeof both;
declare const logic_branch: typeof branch;
declare const logic_either: typeof either;
declare const logic_equals: typeof equals;
declare const logic_FALSE: typeof FALSE;
declare const logic_identity: typeof identity;
declare const logic_ifElse: typeof ifElse;
declare const logic_isIncludedIn: typeof isIncludedIn;
declare const logic_neither: typeof neither;
declare const logic_not: typeof not;
declare const logic_nullishTo: typeof nullishTo;
declare const logic_TRUE: typeof TRUE;
declare const logic_unless: typeof unless;
declare const logic_when: typeof when;
declare namespace logic {
  export {
    logic_allPass as allPass,
    logic_allFail as allFail,
    logic_always as always,
    logic_anyFail as anyFail,
    logic_anyPass as anyPass,
    logic_both as both,
    logic_branch as branch,
    logic_either as either,
    logic_equals as equals,
    logic_FALSE as FALSE,
    logic_identity as identity,
    logic_ifElse as ifElse,
    logic_isIncludedIn as isIncludedIn,
    logic_neither as neither,
    logic_not as not,
    logic_nullishTo as nullishTo,
    logic_TRUE as TRUE,
    logic_unless as unless,
    logic_when as when,
  };
}

export { FALSE as F, TRUE as T, allPass as a, allFail as b, always as c, anyFail as d, anyPass as e, both as f, branch as g, either as h, equals as i, identity as j, ifElse as k, logic as l, isIncludedIn as m, neither as n, not as o, nullishTo as p, unless as u, when as w };
