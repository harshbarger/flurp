/**
 * @param y
 *
 * @example
 * ```ts
 * import { N } from "flurp";
 *
 * const addFive = N.add(5);
 * addFive(2);     // 7
 * ```
 */
declare function add(y: number): (x: number) => number;
/**
 * Clamps values to the range `min` to `max`
 *
 * @param min
 * @param max
 *
 * @example
 * ```ts
 * import { N } from "flurp";
 *
 * const zeroToTen = N.clamp(0, 10);
 * zeroToTen(-2);     // 0
 * zeroToTen(4);      // 4
 * zeroToTen(13);     // 10
 * ```
 */
declare function clamp(min: number, max: number): (x: number) => number;
/**
 * @param y
 *
 * @example
 * ```ts
 * import { N } from "flurp";
 *
 * const divideByTwo = N.divide(2);
 * divideByTwo(10);     // 2
 * ```
 */
declare function divide(y: number): (x: number) => number;
/**
 * Divides in the opposite direction from {@link divide}.
 *
 * @param y
 *
 * @example
 * ```ts
 * import { N } from "flurp";
 *
 * const twoDividedBy = N.divideInto(2);
 * twoDividedBy(10);       // 0.2
 * ```
 */
declare function divideInto(y: number): (x: number) => number;
/**
 * @remarks
 * The endpoints are included in the interval.
 *
 * @param min
 * @param max
 *
 * @example
 * import { N } from "flurp";
 *
 * const zeroToTen = N.isBetween(0, 10);
 * zeroToTen(-4);     // false
 * zeroToTen(7);      // true
 * zeroToTen(10);     // true
 */
declare function isBetween(min: number, max: number): (x: number) => boolean;
/**
 * @param y
 * @param tolerance
 *
 * @example
 * ```ts
 * import { N } from "flurp";
 *
 * const isVeryNearFive = N.isCloseTo(5);
 * isVeryNearFive(5 + 1e-16);     // true
 * isVeryNearFive(5 - 1e-16);     // true
 * isVeryNearFive(5 + 1e-14);     // false
 *
 * const isSortOfNearFive = N.isCloseTo(5, 0.1);
 * isSortOfNearFive(5.08);        // true
 * ```
 */
declare function isCloseTo(y: number, tolerance?: number): (x: number) => boolean;
/**
 * @param x
 *
 * @example
 * import { N } from "flurp";
 *
 * N.isEven(4);     // true
 * N.isEven(-4);    // true
 * N.isEven(5);     // false
 * N.isEven(3.99)   // false
 */
declare function isEven(x: number): boolean;
/**
 * @param y
 *
 * @example
 * ```ts
 * import { N } from "flurp";
 *
 * const moreThanFour = N.isGt(4);
 * moreThanFour(6);      // true
 * moreThanFour(4);      // false
 * moreThanFour(2);      // false
 * ```
 */
declare function isGt(y: number): (x: number) => boolean;
/**
 * @param y
 *
 * @example
 * ```ts
 * import { N } from "flurp";
 *
 * const atLeastFour = N.isGte(4);
 * atLeastFour(6);     // true
 * atLeastFour(4);     // true
 * atLeastFour(2);     // false
 * ```
 */
declare function isGte(y: number): (x: number) => boolean;
/**
 * @param y
 *
 * @example
 * ```ts
 * import { N } from "flurp";
 *
 * const lessThanFour = N.isLt(4);
 * lessThanFour(2);      // true
 * lessThanFour(4);      // false
 * lessThanFour(6);      // false
 * ```
 */
declare function isLt(y: number): (x: number) => boolean;
/**
 * @param y
 *
 * @example
 * ```ts
 * import { N } from "flurp";
 *
 * const noMoreThanFour = N.isLte(4);
 * noMoreThanFour(2);      // true
 * noMoreThanFour(4);      // true
 * noMoreThanFour(6);      // false
 * ```
 */
declare function isLte(y: number): (x: number) => boolean;
/**
 * @remarks
 * Zero is neither positive nor negative.
 *
 * @param x
 *
 * @example
 * ```ts
 * import { N } from "flurp";
 *
 * N.isNegative(-3);     // true
 * N.isNegative(0);      // false
 * N.isNegative(3);      // false
 * ```
 */
declare function isNegative(x: number): boolean;
/**
 * @remarks
 * Since zero is neither positive nor negative, it counts as non-negative.
 *
 * @param x
 *
 * @example
 * ```ts
 * import { N } from "flurp";
 *
 * N.isNonNegative(3);     // true
 * N.isNonNegative(0);     // true
 * N.isNonNegative(-3);    // false
 * ```
 */
declare function isNonNegative(x: number): boolean;
/**
 * @example
 * ```ts
 * import { N } from "flurp";
 *
 * N.isOdd(3);     // true
 * N.isOdd(-3);    // true
 * N.isOdd(4);     // false
 * N.isOdd(3.01)   // false
 * ```
 */
declare function isOdd(x: number): boolean;
/**
 * @remarks
 * Zero is neither positive nor negative.
 * To include zero, use {@link isNonNegative} instead.
 *
 * @param x
 *
 * @example
 * ```ts
 * import { N } from "flurp";
 *
 * N.isPositive(3);     // true
 * N.isPositive(0);     // false
 * N.isPositive(-3);    // false
 * ```
 */
declare function isPositive(x: number): boolean;
/**
 * This implementation follows Knuth's definition, `mod(a, n) = a - n * floor(a / n)`,
 * which reflects the mathematical definition of modular arithmetic better than
 * JavasScript's `%` operator. (The primary difference is in handling negative numbers.)
 * For an implementation of the JavaScript `%` operator, see {@link modulo}.
 *
 * @param y
 *
 * @example
 * ```ts
 * import { N } from "flurp";
 *
 * const hueIn0to360 = N.mathModulo(360);
 * hueIn0to360(390);     // 30
 * hueIn0to360(-60);     // 300
 * ```
 */
declare function mathModulo(y: number): (x: number) => number;
/**
 * Implemented with the `%` operator, so it follows the JavaScript specification
 * that the sign of `a % b` is the sign of `a`, and values are not required
 * to be integers. See {@link mathModulo} for a function that follows Knuth's
 * definition, better reflecting the use of mod in mathematics.
 *
 * @param y
 *
 * @example
 * ```ts
 * import { N } from "flurp";
 *
 * const modTen = N.modulo(10);
 * modTen(12);         // 2.5
 * modTen(-12.5);      // -2.5
 * ```
 */
declare function modulo(y: number): (x: number) => number;
/**
 * @param y
 *
 * @example
 * ```ts
 * import { N } from "flurp";
 *
 * const triple = N.multiply(3);
 * f(10);     // 30
 * ```
 */
declare function multiply(y: number): (x: number) => number;
/**
 * @param root
 *
 * @example
 * ```ts
 * import { N } from "flurp";
 *
 * const cubeRoot = N.nthRoot(3);
 * cubeRoot(8);     // 2
 * cubeRoot(-8);    // -2
 * ```
 */
declare function nthRoot(root: number): (x: number) => number;
/**
 * @remarks
 * `pow` is implemented with `Math.pow`, so it has the same limitations.
 * For example, `N.pow(-8)(1/3)` will be `NaN` rather than `-2`. See {@link nthRoot}
 * for a more robust function for roots.
 *
 * @param exponent
 *
 * @example
 * ```ts
 * import { N } from "flurp";
 *
 * const square = N.pow(2);
 * square(5);     // 25
 * ```
 */
declare function pow(exponent: number): (x: number) => number;
/**
 * Rounds to a number of `places` right of the decimal point.
 * Rounds to the nearest integer if `places` is zero. Negative `places` rounds
 * to the left of the decimal point, e.g., `places` of -3 rounds to the
 * nearest thousand (10^3).
 *
 * @param places
 *
 * @example
 * ```ts
 * import { N } from "flurp";
 *
 * const toTwoPlaces = N.round(2);
 * toTwoPlaces(12345.6789);      // 12345.68
 *
 * const toInteger = N.round(0);
 * toInteger(12345.6789));       // 12346
 *
 * const toHundreds = N.round(-2);
 * toHundreds(12345.6789);       // 12300
 * ```
 */
declare function round(places?: number): (x: number) => number;
/**
 * @param y
 *
 * @example
 * ```ts
 * import { N } from "flurp";
 *
 * const subtractFive = N.subtract(5);
 * subtractFive(2);       // -3
 * ```
 */
declare function subtract(y: number): (x: number) => number;
/**
 * Subtracts in the opposite direction from {@link subtract}.
 *
 * @param y
 *
 * @example
 * ```ts
 * import { N } from "flurp";
 *
 * const subtractFromFive = N.subtractFrom(5);
 * subtractFromFive(2);      // 3
 * ```
 */
declare function subtractFrom(y: number): (x: number) => number;

declare const number_add: typeof add;
declare const number_clamp: typeof clamp;
declare const number_divide: typeof divide;
declare const number_divideInto: typeof divideInto;
declare const number_isBetween: typeof isBetween;
declare const number_isCloseTo: typeof isCloseTo;
declare const number_isEven: typeof isEven;
declare const number_isGt: typeof isGt;
declare const number_isGte: typeof isGte;
declare const number_isLt: typeof isLt;
declare const number_isLte: typeof isLte;
declare const number_isNegative: typeof isNegative;
declare const number_isNonNegative: typeof isNonNegative;
declare const number_isOdd: typeof isOdd;
declare const number_isPositive: typeof isPositive;
declare const number_mathModulo: typeof mathModulo;
declare const number_modulo: typeof modulo;
declare const number_multiply: typeof multiply;
declare const number_nthRoot: typeof nthRoot;
declare const number_pow: typeof pow;
declare const number_round: typeof round;
declare const number_subtract: typeof subtract;
declare const number_subtractFrom: typeof subtractFrom;
declare namespace number {
  export {
    number_add as add,
    number_clamp as clamp,
    number_divide as divide,
    number_divideInto as divideInto,
    number_isBetween as isBetween,
    number_isCloseTo as isCloseTo,
    number_isEven as isEven,
    number_isGt as isGt,
    number_isGte as isGte,
    number_isLt as isLt,
    number_isLte as isLte,
    number_isNegative as isNegative,
    number_isNonNegative as isNonNegative,
    number_isOdd as isOdd,
    number_isPositive as isPositive,
    number_mathModulo as mathModulo,
    number_modulo as modulo,
    number_multiply as multiply,
    number_nthRoot as nthRoot,
    number_pow as pow,
    number_round as round,
    number_subtract as subtract,
    number_subtractFrom as subtractFrom,
  };
}

export { add as a, divideInto as b, clamp as c, divide as d, isCloseTo as e, isEven as f, isGt as g, isGte as h, isBetween as i, isLt as j, isLte as k, isNegative as l, isNonNegative as m, number as n, isOdd as o, isPositive as p, mathModulo as q, modulo as r, multiply as s, nthRoot as t, pow as u, round as v, subtract as w, subtractFrom as x };
