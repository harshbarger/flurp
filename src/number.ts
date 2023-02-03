/**
 * @param y
 *
 * @example
 * ```ts
 * import * as N from "flurp/number";
 *
 * const addFive = N.add(5);
 * addFive(2);     // 7
 * ```
 */
export function add(y: number) {
  return (x: number) => x + y;
}

/**
 * Clamps values to the range `min` to `max`
 *
 * @param min
 * @param max
 *
 * @example
 * ```ts
 * import * as N from "flurp/number";
 *
 * const zeroToTen = N.clamp(0, 10);
 * zeroToTen(-2);     // 0
 * zeroToTen(4);      // 4
 * zeroToTen(13);     // 10
 * ```
 */
export function clamp(min: number, max: number) {
  return (x: number) => Math.max(min, Math.min(x, max));
}

/**
 * @param y
 *
 * @example
 * ```ts
 * import * as N from "flurp/number";
 *
 * const divideByTwo = N.divide(2);
 * divideByTwo(10);     // 2
 * ```
 */
export function divide(y: number) {
  return (x: number) => x / y;
}

/**
 * Divides in the opposite direction from {@link divide}.
 *
 * @param y
 *
 * @example
 * ```ts
 * import * as N from "flurp/number";
 *
 * const twoDividedBy = N.divideInto(2);
 * twoDividedBy(10);       // 0.2
 * ```
 */
export function divideInto(y: number) {
  return (x: number) => y / x;
}

/**
 * @remarks
 * The endpoints are included in the interval.
 *
 * @param min
 * @param max
 *
 * @example
 * import * as N from "flurp/number";
 *
 * const zeroToTen = N.isBetween(0, 10);
 * zeroToTen(-4);     // false
 * zeroToTen(7);      // true
 * zeroToTen(10);     // true
 */
export function isBetween(min: number, max: number) {
  return (x: number) => x >= min && x <= max;
}

/**
 * @param y
 * @param tolerance
 *
 * @example
 * ```ts
 * import * as N from "flurp/number";
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
export function isCloseTo(y: number, tolerance = 1e-15) {
  return (x: number) => Math.abs(y - x) <= tolerance;
}

/**
 * @remarks
 * You may set a non-zero tolerance to account for floating point errors when dealing with
 * non-integers.
 *
 * @param y
 * @param tolerance
 *
 * @example
 * ```ts
 * import * as N from "flurp/number";
 *
 * const divisibleByThree = N.isDivisibleBy(3);
 * divisibleByThree(6);     // true
 * divisibleByThree(5);     // false
 *
 * const almostEven = N.isDivisibleBy(2, 1e-12);
 * almostEven(4 - 1e-13);    // true
 * ```
 */
export function isDivisibleBy(y: number, tolerance = 0) {
  if (tolerance === 0) {
    return (x: number) => x % y === 0;
  }

  return function (x: number) {
    const closestMultiple = Math.round(x / y) * y;
    return Math.abs(x - closestMultiple) <= tolerance;
  };
}

/**
 * @param x
 *
 * @example
 * import * as N from "flurp/number";
 *
 * N.isEven(4);     // true
 * N.isEven(-4);    // true
 * N.isEven(5);     // false
 * N.isEven(3.99)   // false
 */
export function isEven(x: number) {
  return x % 2 === 0;
}

/**
 * @param y
 *
 * @example
 * ```ts
 * import * as N from "flurp/number";
 *
 * const moreThanFour = N.isGt(4);
 * moreThanFour(6);      // true
 * moreThanFour(4);      // false
 * moreThanFour(2);      // false
 * ```
 */
export function isGt(y: number) {
  return (x: number) => x > y;
}

/**
 * @param y
 *
 * @example
 * ```ts
 * import * as N from "flurp/number";
 *
 * const atLeastFour = N.isGte(4);
 * atLeastFour(6);     // true
 * atLeastFour(4);     // true
 * atLeastFour(2);     // false
 * ```
 */
export function isGte(y: number) {
  return (x: number) => x >= y;
}

/**
 * @param y
 *
 * @example
 * ```ts
 * import * as N from "flurp/number";
 *
 * const lessThanFour = N.isLt(4);
 * lessThanFour(2);      // true
 * lessThanFour(4);      // false
 * lessThanFour(6);      // false
 * ```
 */
export function isLt(y: number) {
  return (x: number) => x < y;
}

/**
 * @param y
 *
 * @example
 * ```ts
 * import * as N from "flurp/number";
 *
 * const noMoreThanFour = N.isLte(4);
 * noMoreThanFour(2);      // true
 * noMoreThanFour(4);      // true
 * noMoreThanFour(6);      // false
 * ```
 */
export function isLte(y: number) {
  return (x: number) => x <= y;
}

/**
 * @remarks
 * Zero is neither positive nor negative.
 *
 * @param x
 *
 * @example
 * ```ts
 * import * as N from "flurp/number";
 *
 * N.isNegative(-3);     // true
 * N.isNegative(0);      // false
 * N.isNegative(3);      // false
 * ```
 */
export function isNegative(x: number) {
  return x < 0;
}

/**
 * @remarks
 * Since zero is neither positive nor negative, it counts as non-negative.
 *
 * @param x
 *
 * @example
 * ```ts
 * import * as N from "flurp/number";
 *
 * N.isNonNegative(3);     // true
 * N.isNonNegative(0);     // true
 * N.isNonNegative(-3);    // false
 * ```
 */
export function isNonNegative(x: number) {
  return x >= 0;
}

/**
 * @example
 * ```ts
 * import * as N from "flurp/number";
 *
 * N.isOdd(3);     // true
 * N.isOdd(-3);    // true
 * N.isOdd(4);     // false
 * N.isOdd(3.01)   // false
 * ```
 */
export function isOdd(x: number) {
  return Math.abs(x % 2) === 1;
}

/**
 * @remarks
 * Zero is neither positive nor negative.
 * To include zero, use {@link isNonNegative} instead.
 *
 * @param x
 *
 * @example
 * ```ts
 * import * as N from "flurp/number";
 *
 * N.isPositive(3);     // true
 * N.isPositive(0);     // false
 * N.isPositive(-3);    // false
 * ```
 */
export function isPositive(x: number) {
  return x > 0;
}

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
 * import * as N from "flurp/number";
 *
 * const hueIn0to360 = N.mathModulo(360);
 * hueIn0to360(390);     // 30
 * hueIn0to360(-60);     // 300
 * ```
 */
export function mathModulo(y: number) {
  return (x: number) => x - y * Math.floor(x / y);
}

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
 * import * as N from "flurp/number";
 *
 * const modTen = N.modulo(10);
 * modTen(12);         // 2.5
 * modTen(-12.5);      // -2.5
 * ```
 */
export function modulo(y: number) {
  return (x: number) => x % y;
}

/**
 * @param y
 *
 * @example
 * ```ts
 * import * as N from "flurp/number";
 *
 * const triple = N.multiply(3);
 * f(10);     // 30
 * ```
 */
export function multiply(y: number) {
  return (x: number) => x * y;
}

/**
 * @param root
 *
 * @example
 * ```ts
 * import * as N from "flurp/number";
 *
 * const cubeRoot = N.nthRoot(3);
 * cubeRoot(8);     // 2
 * cubeRoot(-8);    // -2
 * ```
 */
export function nthRoot(root: number) {
  return (x: number) => Math.pow(Math.abs(x), 1 / root) * Math.sign(x);
}

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
 * import * as N from "flurp/number";
 *
 * const square = N.pow(2);
 * square(5);     // 25
 * ```
 */
export function pow(exponent: number) {
  return (x: number) => Math.pow(x, exponent);
}

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
 * import * as N from "flurp/number";
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
export function round(places = 0) {
  const factor = 10 ** -places;

  return (x: number) => Math.round(x / factor) * factor;
}

/**
 * @param y
 *
 * @example
 * ```ts
 * import * as N from "flurp/number";
 *
 * const subtractFive = N.subtract(5);
 * subtractFive(2);       // -3
 * ```
 */
export function subtract(y: number) {
  return (x: number) => x - y;
}

/**
 * Subtracts in the opposite direction from {@link subtract}.
 *
 * @param y
 *
 * @example
 * ```ts
 * import * as N from "flurp/number";
 *
 * const subtractFromFive = N.subtractFrom(5);
 * subtractFromFive(2);      // 3
 * ```
 */
export function subtractFrom(y: number) {
  return (x: number) => y - x;
}
