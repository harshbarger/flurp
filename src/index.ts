/**
 * @hidden
 */
export function flow<A extends Array<unknown>, B>(
  f1: (...xs: A) => B
): (...xs: A) => B;

/**
 * @hidden
 */
export function flow<A extends Array<unknown>, B, C>(
  f1: (...xs: A) => B,
  f2: (x: B) => C
): (...xs: A) => C;

/**
 * Similar to {@link pipe}, except that it returns a function which takes as its parameter
 * the initial value for the pipe in order to support point-free style. Though point-free style
 * can make for concise code, be aware that type-inference for `flow` may be less robust than for `pipe`
 * due to its data-last form.
 *
 * @remarks
 * The implementation contains types to support up to twelve transformations.
 * All overload signatures follow the same pattern as the representative form shown
 * here.
 *
 * @param transforms f1, f2, f3, etc.
 *
 * @example
 * ```ts
 * import { flow } from "flurp";
 * import * as N from "flurp/number";
 *
 * const applyPipe = flow(
 *   N.multiply(2),     // 6 so far
 *   N.ad(4.2),         // 10.2 so far
 *   Math.round
 * );
 *
 * applyPipe(3)         // 10
 * ```
 */
export function flow<A extends Array<unknown>, B, C, D>(
  f1: (...xs: A) => B,
  f2: (x: B) => C,
  f3: (x: C) => D
): (...xs: A) => D;

/**
 * @hidden
 */
export function flow<A extends Array<unknown>, B, C, D, E>(
  f1: (...xs: A) => B,
  f2: (x: B) => C,
  f3: (x: C) => D,
  f4: (x: D) => E
): (...xs: A) => E;

/**
 * @hidden
 */
export function flow<A extends Array<unknown>, B, C, D, E, F>(
  f1: (...xs: A) => B,
  f2: (x: B) => C,
  f3: (x: C) => D,
  f4: (x: D) => E,
  f5: (x: E) => F
): (...xs: A) => F;

/**
 * @hidden
 */
export function flow<A extends Array<unknown>, B, C, D, E, F, G>(
  f1: (...xs: A) => B,
  f2: (x: B) => C,
  f3: (x: C) => D,
  f4: (x: D) => E,
  f5: (x: E) => F,
  f6: (x: F) => G
): (...xs: A) => G;

/**
 * @hidden
 */
export function flow<A extends Array<unknown>, B, C, D, E, F, G, H>(
  f1: (...xs: A) => B,
  f2: (x: B) => C,
  f3: (x: C) => D,
  f4: (x: D) => E,
  f5: (x: E) => F,
  f6: (x: F) => G,
  f7: (x: G) => H
): (...xs: A) => H;

/**
 * @hidden
 */
export function flow<A extends Array<unknown>, B, C, D, E, F, G, H, I>(
  f1: (...xs: A) => B,
  f2: (x: B) => C,
  f3: (x: C) => D,
  f4: (x: D) => E,
  f5: (x: E) => F,
  f6: (x: F) => G,
  f7: (x: G) => H,
  f8: (x: H) => I
): (...xs: A) => I;

/**
 * @hidden
 */
export function flow<A extends Array<unknown>, B, C, D, E, F, G, H, I, J>(
  f1: (...xs: A) => B,
  f2: (x: B) => C,
  f3: (x: C) => D,
  f4: (x: D) => E,
  f5: (x: E) => F,
  f6: (x: F) => G,
  f7: (x: G) => H,
  f8: (x: H) => I,
  f9: (x: I) => J
): (...xs: A) => J;

/**
 * @hidden
 */
export function flow<A extends Array<unknown>, B, C, D, E, F, G, H, I, J, K>(
  f1: (...xs: A) => B,
  f2: (x: B) => C,
  f3: (x: C) => D,
  f4: (x: D) => E,
  f5: (x: E) => F,
  f6: (x: F) => G,
  f7: (x: G) => H,
  f8: (x: H) => I,
  f9: (x: I) => J,
  f10: (x: J) => K
): (...xs: A) => K;

/**
 * @hidden
 */
export function flow<A extends Array<unknown>, B, C, D, E, F, G, H, I, J, K, L>(
  f1: (...xs: A) => B,
  f2: (x: B) => C,
  f3: (x: C) => D,
  f4: (x: D) => E,
  f5: (x: E) => F,
  f6: (x: F) => G,
  f7: (x: G) => H,
  f8: (x: H) => I,
  f9: (x: I) => J,
  f10: (x: J) => K,
  f11: (x: K) => L
): (...xs: A) => L;

export function flow<
  A extends Array<unknown>,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M
>(
  f1: (...xs: A) => B,
  f2: (x: B) => C,
  f3: (x: C) => D,
  f4: (x: D) => E,
  f5: (x: E) => F,
  f6: (x: F) => G,
  f7: (x: G) => H,
  f8: (x: H) => I,
  f9: (x: I) => J,
  f10: (x: J) => K,
  f11: (x: K) => L,
  f12: (x: L) => M
): (...xs: A) => M;

export function flow() {
  const fs = arguments;

  return function () {
    let x = fs[0](...arguments);
    const len = fs.length;

    for (let i = 1; i < len; i++) {
      x = fs[i](x);
    }

    return x;
  };
}

/**
 * @hidden
 */
export function pipe<A, B>(init: A, f1: (x: A) => B): B;

/**
 * Starting with the `initial` input, performs a series of transforms, passing the
 * return value of each function as the argument to the next.
 *
 * @remarks
 * The implementation contains types to support up to twelve transformations.
 * All overload signatures follow the same pattern as the representative form shown
 * here.
 *
 * @param initial
 * @param transforms f1, f2, f3, up to f12
 *
 * @example
 * ```ts
 * import { pipe } from "flurp";
 * import * as N from "flurp/number";
 *
 * pipe(
 *   3,
 *   N.multiply(2),    // 6 so far
 *   N.add(4.2),       // 10.2 so far
 *   Math.round
 * );                  // 10
 * ```
 */
export function pipe<A, B, C>(initial: A, f1: (x: A) => B, f2: (x: B) => C): C;

/**
 * @hidden
 */
export function pipe<A, B, C, D>(
  init: A,
  f1: (x: A) => B,
  f2: (x: B) => C,
  f3: (x: C) => D
): D;

/**
 * @hidden
 */
export function pipe<A, B, C, D, E>(
  init: A,
  f1: (x: A) => B,
  f2: (x: B) => C,
  f3: (x: C) => D,
  f4: (x: D) => E
): E;

/**
 * @hidden
 */
export function pipe<A, B, C, D, E, F>(
  init: A,
  f1: (x: A) => B,
  f2: (x: B) => C,
  f3: (x: C) => D,
  f4: (x: D) => E,
  f5: (x: E) => F
): F;

/**
 * @hidden
 */
export function pipe<A, B, C, D, E, F, G>(
  init: A,
  f1: (x: A) => B,
  f2: (x: B) => C,
  f3: (x: C) => D,
  f4: (x: D) => E,
  f5: (x: E) => F,
  f6: (x: F) => G
): G;

/**
 * @hidden
 */
export function pipe<A, B, C, D, E, F, G, H>(
  init: A,
  f1: (x: A) => B,
  f2: (x: B) => C,
  f3: (x: C) => D,
  f4: (x: D) => E,
  f5: (x: E) => F,
  f6: (x: F) => G,
  f7: (x: G) => H
): H;

/**
 * @hidden
 */
export function pipe<A, B, C, D, E, F, G, H, I>(
  init: A,
  f1: (x: A) => B,
  f2: (x: B) => C,
  f3: (x: C) => D,
  f4: (x: D) => E,
  f5: (x: E) => F,
  f6: (x: F) => G,
  f7: (x: G) => H,
  f8: (x: H) => I
): I;

/**
 * @hidden
 */
export function pipe<A, B, C, D, E, F, G, H, I, J>(
  init: A,
  f1: (x: A) => B,
  f2: (x: B) => C,
  f3: (x: C) => D,
  f4: (x: D) => E,
  f5: (x: E) => F,
  f6: (x: F) => G,
  f7: (x: G) => H,
  f8: (x: H) => I,
  f9: (x: I) => J
): J;

/**
 * @hidden
 */
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
  init: A,
  f1: (x: A) => B,
  f2: (x: B) => C,
  f3: (x: C) => D,
  f4: (x: D) => E,
  f5: (x: E) => F,
  f6: (x: F) => G,
  f7: (x: G) => H,
  f8: (x: H) => I,
  f9: (x: I) => J,
  f10: (x: J) => K
): K;

/**
 * @hidden
 */
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(
  init: A,
  f1: (x: A) => B,
  f2: (x: B) => C,
  f3: (x: C) => D,
  f4: (x: D) => E,
  f5: (x: E) => F,
  f6: (x: F) => G,
  f7: (x: G) => H,
  f8: (x: H) => I,
  f9: (x: I) => J,
  f10: (x: J) => K,
  f11: (x: K) => L
): L;

export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  init: A,
  f1: (x: A) => B,
  f2: (x: B) => C,
  f3: (x: C) => D,
  f4: (x: D) => E,
  f5: (x: E) => F,
  f6: (x: F) => G,
  f7: (x: G) => H,
  f8: (x: H) => I,
  f9: (x: I) => J,
  f10: (x: J) => K,
  f11: (x: K) => L,
  f12: (x: L) => M
): M;

export function pipe(): unknown {
  let x = arguments[0];
  const len = arguments.length - 1;
  const fs = Array.prototype.slice.call(arguments, 1);

  for (let i = 0; i < len; i++) {
    x = fs[i](x);
  }

  return x;
}

/**
 * Wraps a `transform` function to passes nullish values (`null` and `undefined`)
 * through unchanged instead of applying the transform.
 *
 * @remarks
 * This is intended to solve the same problem as the Maybe monad in other functional languages
 * and libraries. It allows you to use nullish for error conditions, and to pass
 * potentially nullish values safely through a pipeline even when the individual functions
 * do not accept them as input.
 *
 * @param transform
 *
 * @example
 * ```ts
 * import { safe } from "flurp";
 * import * as N from "flurp/number";
 *
 * const safeDouble = safe(N.multiply(2));
 * safeDouble(5);                 // 10
 * safeDouble(undefined);         // undefined
 * safeDouble(null);              // null
 * ```
 */
export function safe<T, U>(transform: (x: T) => U) {
  return function (val: T | null | undefined) {
    if (val === null) {
      return null;
    }

    if (val === undefined) {
      return undefined;
    }

    return transform(val);
  };
}

/**
 * Tries to execute function `transform`. In case of an exception, it returns
 * `fallback` instead.
 *
 * @param transform
 *
 * @example
 * ```ts
 * import { safeCatch } from "flurp";
 *
 * const tryMath = E.safeCatch((s: string) => Math[s](1), null);
 * tryMath("log");                  // 0
 * tryMath("no-such-function")      // null
 * ```
 */
export function safeCatch<T, U>(transform: (val: T) => U, fallback: U) {
  return function (val: T) {
    try {
      return transform(val);
    } catch {
      return fallback;
    }
  };
}

/**
 * Applies a function `sideEffect` to the input, then returns the input.
 * The primary use case for `tap` is debugging values in the middle of a
 * pipe or flow chain.
 *
 * @param sideEffect
 *
 * @example
 * ```ts
 * import { pipe, tap } from "flurp";
 * import * as N from "flurp/number";
 *
 * pipe(
 *   5,
 *   N.multiply(2),
 *   tap(console.log),    // prints 10 to the console, passes 10 on to the next function
 *   N.multiply(2)
 * );                     // 20
 * ```
 */
export function tap<T>(sideEffect: (v: T) => unknown) {
  return function (val: T) {
    sideEffect(val);
    return val;
  };
}
