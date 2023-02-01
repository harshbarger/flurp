/**
 * For use with sorting functions such as {@link array!sortWith} or
 * the built-in `Array.prototype.sort()`. Sorts in ascending
 * alphabetical order, ignoring all spaces and punctuation. For the
 * same letter, upper case letters come before lower case letters.
 *
 * @remarks
 * For languages other than English, or for other conventions regarding punctuation,
 * letter case, etc., use {@link alphaLocale}.
 *
 * As of this writing (January 3, 2023), some Android browsers do not support this function..
 *
 * @param a
 * @param b
 */
export function alphabetical(a: string, b: string) {
  // Math.sign because browsers not required to use 1/-1; some may use 2/-2
  return Math.sign(
    a.localeCompare(b, "en-US", { ignorePunctuation: true, caseFirst: "upper" })
  );
}

/**
 * For use with sorting functions such as {@link array!sortWith} or
 * the built-in `Array.prototype.sort()`. Sorts in ascending
 * alphabetical order, ignoring all spaces and punctuation. For the
 * same letter, upper case letters come before lower case letters.
 * `null` follows all strings, with `undefined` at the very end.
 *
 * For languages other than English, or for other conventions regarding punctuation,
 * letter case, etc., use {@link alphaLocaleNullable}.
 *
 * @remarks
 * JavaScript's `Array.prototype.sort()` places `undefined` at the
 * end without even calling the comparator. This comparator, however,
 * still handles `undefined` so that it can be used with sort
 * implementations not based on `Array.prototype.sort()`.
 *
 * As of this writing (January 3, 2023), some Android browsers do not support this function..
 *
 * @param a
 * @param b
 */
export function alphabeticalNullable(
  a: string | null | undefined,
  b: string | null | undefined
) {
  if (a === undefined) {
    return b === undefined ? 0 : 1;
  }

  if (b === undefined) {
    return -1;
  }

  if (a === null) {
    return b === null ? 0 : 1;
  }

  if (b === null) {
    return -1;
  }

  // Math.sign because browsers not required to use 1/-1; some may use 2/-2
  return Math.sign(
    a.localeCompare(b, "en-US", { ignorePunctuation: true, caseFirst: "upper" })
  );
}

/**
 * Returns a comparator function rather than being itself a comparator function.
 * This is just a thin wrapper around the built-in `String.prototype.localeCompare()`,
 * whose options are the same as `Intl.Collator()`, which is documented at
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator).
 *
 * For nullish values, `null` follows all strings, with `undefined` at the very end.
 *
 * @remarks
 * As of this writing (January 3, 2023), some Android browsers do not support this function..
 *
 * @param locales
 * @param options
 */
export function alphaLocale(
  locales?: string | Array<string>,
  options?: Intl.CollatorOptions
) {
  return (a: string, b: string) =>
    Math.sign(a.localeCompare(b, locales, options));
}

/**
 * Returns a comparator function rather than being itself a comparator function.
 * This is just a thin wrapper around the built-in `String.prototype.localeCompare()`,
 * whose options are the same as `Intl.Collator()`, which is documented at
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator).
 *
 * @remarks
 * As of this writing (January 3, 2023), some Android browsers do not support this function..
 *
 * @param locales
 * @param options
 */
export function alphaLocaleNullable(
  locales?: string | Array<string>,
  options?: Intl.CollatorOptions
) {
  return function (a: string | null | undefined, b: string | null | undefined) {
    if (a === undefined) {
      return b === undefined ? 0 : 1;
    }

    if (b === undefined) {
      return -1;
    }

    if (a === null) {
      return b === null ? 0 : 1;
    }

    if (b === null) {
      return -1;
    }

    return Math.sign(a.localeCompare(b, locales, options));
  };
}

export function compareBy<T, U>(
  property: (x: T) => U,
  comparator: (a: U, b: U) => number
) {
  return function (x: T, y: T) {
    const xProp = property(x);
    const yProp = property(y);

    return comparator(xProp, yProp);
  };
}

/**
 * For use with sorting functions such as {@link array!sortWith} or
 * the built-in `Array.prototype.sort()`. Sorts in ascending
 * numerical order, with `NaN` last.
 *
 * @param x
 * @param y
 *
 * @example
 * ```ts
 * import { A, C } from "flurp";
 *
 * const sortNumbers = A.sortWith(C.numericAsc);
 * sortNumbers([30, 6, 1, NaN, 200, 5]);      // [1, 5, 6, 30, 200, NaN]
 * ```
 */
export function numericAsc(x: number, y: number) {
  if (x < y) {
    return -1;
  }

  if (x > y) {
    return 1;
  }

  if (isNaN(x)) {
    return isNaN(y) ? 0 : 1;
  }

  if (isNaN(y)) {
    return -1;
  }

  return 0;
}

/**
 * For use with sorting functions such as {@link array!sortWith} or
 * the built-in `Array.prototype.sort()`. Sorts in descending
 * numerical order, with `NaN` last.
 *
 * @param x
 * @param y
 *
 * @example
 * ```ts
 * import { A, C } from "flurp";
 *
 * const sortNumbers = A.sortWith(C.numericDesc);
 * sortNumbers([30, 6, 1, NaN, 200, 5]);      // [200, 30, 6, 5, 1, NaN]
 * ```
 */
export function numericDesc(x: number, y: number) {
  if (x < y) {
    return 1;
  }

  if (x > y) {
    return -1;
  }

  if (isNaN(x)) {
    return isNaN(y) ? 0 : 1;
  }

  if (isNaN(y)) {
    return -1;
  }

  return 0;
}

/**
 * For use with sorting functions such as {@link array!sortWith} or
 * the built-in `Array.prototype.sort()`. Sorts in ascending
 * numerical order, with valid numbers followed by `NaN`, then `null`,
 * then `undefined`.
 *
 * @remarks
 * JavaScript's `Array.prototype.sort()` places `undefined` at the
 * end without even calling the comparator. This comparator, however,
 * still handles `undefined` so that it can be used with sort
 * implementations not based on `Array.prototype.sort()`.
 *
 * @param x
 * @param y
 *
 * @example
 * ```ts
 * import { A, C } from "flurp";
 *
 * const sortNumbers = A.sortWith(C.numericNullableAsc);
 * sortNumbers([30, NaN, 6, 1, undefined, 200, null, 5]);      // [1, 5, 6, 30, 200, NaN, null, undefined]
 * ```
 */
export function numericNullableAsc(
  x: number | null | undefined,
  y: number | null | undefined
) {
  if (x === undefined) {
    return y === undefined ? 0 : 1;
  }

  if (y === undefined) {
    return -1;
  }

  if (x === null) {
    return y === null ? 0 : 1;
  }

  if (y === null) {
    return -1;
  }

  if (x < y) {
    return -1;
  }

  if (x > y) {
    return 1;
  }

  if (isNaN(x)) {
    return isNaN(y) ? 0 : 1;
  }

  if (isNaN(y)) {
    return -1;
  }

  return 0;
}

/**
 * For use with sorting functions such as {@link array!sortWith} or
 * the built-in `Array.prototype.sort()`. Sorts in descending
 * numerical order, with valid numbers followed by `NaN`, then `null`,
 * then `undefined`.
 *
 * @remarks
 * JavaScript's `Array.prototype.sort()` places `undefined` at the
 * end without even calling the comparator. This comparator, however,
 * still handles `undefined` so that it can be used with sort
 * implementations not based on `Array.prototype.sort()`.
 *
 * @param x
 * @param y
 *
 * @example
 * ```ts
 * import { A, C } from "flurp";
 *
 * const sortNumbers = A.sortWith(C.numericNullableDesc);
 * sortNumbers([30, NaN, 6, 1, undefined, 200, null, 5]);      // [200, 30, 6, 5, 1, NaN, null, undefined]
 * ```
 */
export function numericNullableDesc(
  x: number | null | undefined,
  y: number | null | undefined
) {
  if (x === undefined) {
    return y === undefined ? 0 : 1;
  }

  if (y === undefined) {
    return -1;
  }

  if (x === null) {
    return y === null ? 0 : 1;
  }

  if (y === null) {
    return -1;
  }

  if (x < y) {
    return 1;
  }

  if (x > y) {
    return -1;
  }

  if (isNaN(x)) {
    return isNaN(y) ? 0 : 1;
  }

  if (isNaN(y)) {
    return -1;
  }

  return 0;
}
