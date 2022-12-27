/**
 * @hidden
 */
declare function flow<A extends Array<unknown>, B>(f1: (...xs: A) => B): (...xs: A) => B;
/**
 * @hidden
 */
declare function flow<A extends Array<unknown>, B, C>(f1: (...xs: A) => B, f2: (x: B) => C): (...xs: A) => C;
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
 * import { flow, N } from "flurp";
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
declare function flow<A extends Array<unknown>, B, C, D>(f1: (...xs: A) => B, f2: (x: B) => C, f3: (x: C) => D): (...xs: A) => D;
/**
 * @hidden
 */
declare function flow<A extends Array<unknown>, B, C, D, E>(f1: (...xs: A) => B, f2: (x: B) => C, f3: (x: C) => D, f4: (x: D) => E): (...xs: A) => E;
/**
 * @hidden
 */
declare function flow<A extends Array<unknown>, B, C, D, E, F>(f1: (...xs: A) => B, f2: (x: B) => C, f3: (x: C) => D, f4: (x: D) => E, f5: (x: E) => F): (...xs: A) => F;
/**
 * @hidden
 */
declare function flow<A extends Array<unknown>, B, C, D, E, F, G>(f1: (...xs: A) => B, f2: (x: B) => C, f3: (x: C) => D, f4: (x: D) => E, f5: (x: E) => F, f6: (x: F) => G): (...xs: A) => G;
/**
 * @hidden
 */
declare function flow<A extends Array<unknown>, B, C, D, E, F, G, H>(f1: (...xs: A) => B, f2: (x: B) => C, f3: (x: C) => D, f4: (x: D) => E, f5: (x: E) => F, f6: (x: F) => G, f7: (x: G) => H): (...xs: A) => H;
/**
 * @hidden
 */
declare function flow<A extends Array<unknown>, B, C, D, E, F, G, H, I>(f1: (...xs: A) => B, f2: (x: B) => C, f3: (x: C) => D, f4: (x: D) => E, f5: (x: E) => F, f6: (x: F) => G, f7: (x: G) => H, f8: (x: H) => I): (...xs: A) => I;
/**
 * @hidden
 */
declare function flow<A extends Array<unknown>, B, C, D, E, F, G, H, I, J>(f1: (...xs: A) => B, f2: (x: B) => C, f3: (x: C) => D, f4: (x: D) => E, f5: (x: E) => F, f6: (x: F) => G, f7: (x: G) => H, f8: (x: H) => I, f9: (x: I) => J): (...xs: A) => J;
/**
 * @hidden
 */
declare function flow<A extends Array<unknown>, B, C, D, E, F, G, H, I, J, K>(f1: (...xs: A) => B, f2: (x: B) => C, f3: (x: C) => D, f4: (x: D) => E, f5: (x: E) => F, f6: (x: F) => G, f7: (x: G) => H, f8: (x: H) => I, f9: (x: I) => J, f10: (x: J) => K): (...xs: A) => K;
/**
 * @hidden
 */
declare function flow<A extends Array<unknown>, B, C, D, E, F, G, H, I, J, K, L>(f1: (...xs: A) => B, f2: (x: B) => C, f3: (x: C) => D, f4: (x: D) => E, f5: (x: E) => F, f6: (x: F) => G, f7: (x: G) => H, f8: (x: H) => I, f9: (x: I) => J, f10: (x: J) => K, f11: (x: K) => L): (...xs: A) => L;
declare function flow<A extends Array<unknown>, B, C, D, E, F, G, H, I, J, K, L, M>(f1: (...xs: A) => B, f2: (x: B) => C, f3: (x: C) => D, f4: (x: D) => E, f5: (x: E) => F, f6: (x: F) => G, f7: (x: G) => H, f8: (x: H) => I, f9: (x: I) => J, f10: (x: J) => K, f11: (x: K) => L, f12: (x: L) => M): (...xs: A) => M;
/**
 * @hidden
 */
declare function pipe<A, B>(init: A, f1: (x: A) => B): B;
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
 * import { pipe, N } from "flurp";
 *
 * pipe(
 *   3,
 *   N.multiply(2),    // 6 so far
 *   N.add(4.2),       // 10.2 so far
 *   Math.round
 * );                  // 10
 * ```
 */
declare function pipe<A, B, C>(initial: A, f1: (x: A) => B, f2: (x: B) => C): C;
/**
 * @hidden
 */
declare function pipe<A, B, C, D>(init: A, f1: (x: A) => B, f2: (x: B) => C, f3: (x: C) => D): D;
/**
 * @hidden
 */
declare function pipe<A, B, C, D, E>(init: A, f1: (x: A) => B, f2: (x: B) => C, f3: (x: C) => D, f4: (x: D) => E): E;
/**
 * @hidden
 */
declare function pipe<A, B, C, D, E, F>(init: A, f1: (x: A) => B, f2: (x: B) => C, f3: (x: C) => D, f4: (x: D) => E, f5: (x: E) => F): F;
/**
 * @hidden
 */
declare function pipe<A, B, C, D, E, F, G>(init: A, f1: (x: A) => B, f2: (x: B) => C, f3: (x: C) => D, f4: (x: D) => E, f5: (x: E) => F, f6: (x: F) => G): G;
/**
 * @hidden
 */
declare function pipe<A, B, C, D, E, F, G, H>(init: A, f1: (x: A) => B, f2: (x: B) => C, f3: (x: C) => D, f4: (x: D) => E, f5: (x: E) => F, f6: (x: F) => G, f7: (x: G) => H): H;
/**
 * @hidden
 */
declare function pipe<A, B, C, D, E, F, G, H, I>(init: A, f1: (x: A) => B, f2: (x: B) => C, f3: (x: C) => D, f4: (x: D) => E, f5: (x: E) => F, f6: (x: F) => G, f7: (x: G) => H, f8: (x: H) => I): I;
/**
 * @hidden
 */
declare function pipe<A, B, C, D, E, F, G, H, I, J>(init: A, f1: (x: A) => B, f2: (x: B) => C, f3: (x: C) => D, f4: (x: D) => E, f5: (x: E) => F, f6: (x: F) => G, f7: (x: G) => H, f8: (x: H) => I, f9: (x: I) => J): J;
/**
 * @hidden
 */
declare function pipe<A, B, C, D, E, F, G, H, I, J, K>(init: A, f1: (x: A) => B, f2: (x: B) => C, f3: (x: C) => D, f4: (x: D) => E, f5: (x: E) => F, f6: (x: F) => G, f7: (x: G) => H, f8: (x: H) => I, f9: (x: I) => J, f10: (x: J) => K): K;
/**
 * @hidden
 */
declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(init: A, f1: (x: A) => B, f2: (x: B) => C, f3: (x: C) => D, f4: (x: D) => E, f5: (x: E) => F, f6: (x: F) => G, f7: (x: G) => H, f8: (x: H) => I, f9: (x: I) => J, f10: (x: J) => K, f11: (x: K) => L): L;
declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(init: A, f1: (x: A) => B, f2: (x: B) => C, f3: (x: C) => D, f4: (x: D) => E, f5: (x: E) => F, f6: (x: F) => G, f7: (x: G) => H, f8: (x: H) => I, f9: (x: I) => J, f10: (x: J) => K, f11: (x: K) => L, f12: (x: L) => M): M;
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
 *
 * pipe(
 *   5,
 *   N.multiply(2),
 *   tap(console.log),    // prints 10 to the console, passes 10 on to the next function
 *   N.multiply(2)
 * );                     // 20
 */
declare function tap<T>(sideEffect: (v: T) => unknown): (val: T) => T;

export { flow, pipe, tap };
