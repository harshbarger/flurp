/**
 * @internal
 * If index is invalid, returns null
 * If index is negative, return positive equivalent index
 * Otherwise return index
 */
function adjIndex(arr: ReadonlyArray<unknown>, i: number) {
  if (!Number.isInteger(i)) {
    return null;
  }

  if (i >= arr.length || i < -arr.length) {
    return undefined;
  }

  return i >= 0 ? i : arr.length + i;
}

/**
 * @param condition
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 * import * as N from "flurp/number";
 *
 * const allPositive = A.all(N.isPositive);
 * allPositive([3, 5, 6]));     // true
 * allPositive([3, 5, -6]));    // false
 * allPositive([]));            // true (since no failing elements)
 * ```
 */
export function all<T>(condition: (x: T) => boolean) {
  return function (arr: ReadonlyArray<T>) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      if (!condition(arr[i])) {
        return false;
      }
    }
    return true;
  };
}

/**
 * @param condition
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 * import * as N from "flurp/number";
 *
 * const hasAPositive = A.any(N.isPositive);
 * hasAPositive([3, -5, -6]));      // true
 * hasAPositive([-3, -5, -6]));     // false
 * hasAPositive([]));               // false
 * ```
 */
export function any<T>(condition: (x: T) => boolean) {
  return function (arr: ReadonlyArray<T>) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      if (condition(arr[i])) {
        return true;
      }
    }
    return false;
  };
}

/**
 * Returns an array of arrays of length `size` with consecutive elements
 * from the original array. Returns an empty array if `size` is shorter
 * than the array or is not an integer.
 *
 * @param size
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const makeTriples = A.aperture(3);
 * makeTriples([2, 4, 6, 8, 10, 12, 14]);
 * //   [
 * //     [2, 4, 6],
 * //     [4, 6, 8],
 * //     [6, 8, 10],
 * //     [8, 10, 12],
 * //     [10, 12, 14],
 * //   ]
 * ```
 */
export function aperture<T>(size: number) {
  if (!Number.isInteger(size)) {
    return (_: ReadonlyArray<T>) => [];
  }

  return function (arr: ReadonlyArray<T>) {
    const len = arr.length;
    if (len >= size) {
      const result = [];
      for (let i = 0; i <= len - size; i++) {
        result.push(arr.slice(i, i + size));
      }
      return result;
    }

    return [];
  };
}

/**
 * @remarks
 * Can append an array or a single element.
 *
 * @param elems
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const appendOne = A.append(7);
 * appendOne([5, 6]);    // [5, 6, 7]
 *
 * const appendMulti = A.append([7, 8, 9]);
 * appendMulti([5, 6]);    // [5, 6, 7, 8, 9]
 * ```
 */
export function append<T>(elems: T | Array<T>) {
  if (Array.isArray(elems)) {
    return (arr: ReadonlyArray<T>) => [...arr, ...elems];
  }

  return (arr: ReadonlyArray<T>) => [...arr, elems];
}

/**
 * Breaks an array into chunks of length `size`. If `useRemaining` is set to `true` (default),
 * then any extra elements at the end not long enough for a complete chunk will be
 * included as a shorter array. If `useRemaining` is `false`, the remaining elements that
 * do not comprise a complete chunk will be ignored.
 *
 * @remarks
 * Returns `null` if `size` is not a positive integer.
 *
 * @param size
 * @param useRemaining
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const pairsAndExtra = A.chunk(2);
 * pairsAndExtra([1, 2, 3, 4, 5, 6, 7]);     // [[1, 2], [3, 4], [5, 6], [7]]
 *
 * const justPairs = A.chunk(2, false);
 * justPairs([1, 2, 3, 4, 5, 6, 7]);     // [[1, 2], [3, 4], [5, 6]]
 * ```
 */
export function chunk<T>(
  size: number,
  useRemaining = true
): (arr: Array<T>) => Array<Array<T>> {
  // explicit return type needed to prevent TS from inferring return type as array of tuple
  if (!(Number.isInteger(size) && size >= 1)) {
    return () => [[]];
  }

  return function (arr: ReadonlyArray<T>) {
    const len = useRemaining
      ? Math.ceil(arr.length / size)
      : Math.floor(arr.length / size);
    return [...new Array(len)].map((_, idx) =>
      arr.slice(idx * size, (idx + 1) * size)
    );
  };
}

/**
 * Concatenates an array of arrays and/or single elements into a single array
 *
 * @remarks
 * This may seem redundant with a one-level `flatten`, but `concat` has a much less
 * complex type since it doesn't have to account for deeper nesting.
 *
 * @param arrays
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * A.concat([[3], [6], [9, 12]]);        // [3, 6, 9, 12]
 * A.concat([[3], 6, [9, 12]]);          // [3, 6, 9, 12]
 * ```
 */
export function concat<T>(arrays: Array<ReadonlyArray<T> | T>) {
  if (arrays.length === 0) {
    return [];
  }

  const allAsArrays = arrays.map((a) => (Array.isArray(a) ? a : [a]));
  return allAsArrays[0].concat(...allAsArrays.slice(1));
}

/**
 * @param condition
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 * import * as N from "flurp/number";
 *
 * const countPositive = A.count(isPositive);
 * countPositive([4, 5, -2, 6, -1]);     // 3
 * ```
 */
export function count<T>(condition: (x: T) => boolean) {
  return (arr: ReadonlyArray<T>) =>
    arr.reduce((acc, next) => (condition(next) ? acc + 1 : acc), 0);
}

/**
 * Creates an array of equally spaced numbers from `start` to `end`. You may control
 * the spacing or number of points by setting any of the following:
 * - `n.intervals` e.g., [1, 2, 3] would have two intervals--1 to 2 and 2 to 3 (minimum 1).
 * - `n.points` to set the total number of points (minimum 2)
 * - `n.space` to set the difference between successive points. If `end - start` does
 * not divide evenly by `n.space`, then `n.space` will automatically be adjusted to
 * allow even spacing.
 *
 * If the value of `n` is not valid, then an empty array will be returned.
 *
 * @param start
 * @param end
 * @param n
 * ```ts
 * import * as A from "flurp/array";
 *
 * A.createRange(2, 22, { points: 5 });       // [2, 7, 12, 17, 22]
 * A.createRange(2, 22, { intervals: 5 });    // [2, 6, 10, 14, 18, 22]
 * A.createRange(2, 22, { space: 4 });        // [2, 6, 10, 14, 18, 22]
 * A.createRange(2, 22, { space: 4.1 });      // [2, 6, 10, 14, 18, 22]
 * ```
 */
export function createRange(
  start: number,
  end: number,
  n: Partial<Record<"intervals" | "points" | "space", number>>
) {
  let count = NaN;

  if (
    n.intervals !== undefined &&
    Number.isInteger(n.intervals) &&
    n.intervals >= 1
  ) {
    count = n.intervals + 1;
  }

  if (n.points !== undefined && Number.isInteger(n.points) && n.points >= 2) {
    count = n.points;
  }

  if (n.space !== undefined && n.space !== 0) {
    count = Math.max(Math.round(Math.abs((end - start) / n.space)) + 1, 2);
  }

  if (isNaN(count)) {
    return [];
  }

  const interval = (end - start) / (count - 1);
  const result = [...new Array(count)].map((_, idx) => start + idx * interval);
  result[result.length - 1] = end; // prevents rounding issues at end
  return result;
}

/**
 * Creates a new array with `length` elements. Element values are determined
 * by a function `f` of the element index. Returns `null` for invalid lengths
 * (non-integer or negative). `createWith` also treats a `length` greater than `maxLength` as
 * invalid, to prevent errors that could halt the interface, use excessive memory,
 * etc. If you truly intend to create a very long array, you may set `maxLength`
 * to a value higher than the default of 10000 to accommodate this need.
 *
 * @remarks
 * Note that as an array creation function, `createWith` is one of the few
 * functions in this module that neither takes an array as an argument nor
 * returns such a function.
 *
 * @param length
 * @param f
 * @param maxLength
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 * import * as L from "flurp/logic";
 *
 * A.createWith(4, L.always(5));              // [5, 5, 5, 5]
 * A.createWith(3, L.identity)                // [0, 1, 2]
 * A.createWith(5, i => (i + 1) * 5);         // [5, 10, 15, 20, 25]
 * A.createWith(100000, L.identity);          // null
 * A.createWith(100001, L.identity, 200000);  // [0, 1, 2, 3, ..., 99999, 100000]
 * ```
 */
export function createWith<T>(
  length: number,
  f: (x: number) => T,
  maxLength = 10000
) {
  if (!Number.isInteger(length) || length > maxLength || length < 0) {
    return null;
  }

  const result = new Array(length);

  for (let i = 0; i < length; i++) {
    result[i] = f(i);
  }

  return result;
}

/**
 * Returns a new array with the first `count` elements removed.
 * Returns an empty array if `count` is not an integer or is negative.
 *
 * @param count
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const withoutFirstThree = A.dropLast(3);
 * withoutFirstThree([10, 20, 30, 40, 50]);    // [40, 50]
 * withoutFirstThree([10, 20]);                // []
 * ```
 */
export function drop<T>(count: number) {
  if (!Number.isInteger(count) || count <= 0) {
    return (_: ReadonlyArray<T>) => [];
  }

  return (arr: ReadonlyArray<T>) => arr.slice(count);
}

/**
 * Returns a new array with the last `count` elements removed.
 * Returns an empty array if `count` is not an integer or is negative.
 *
 * @param count
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const withoutLastThree = A.dropLast(3);
 * withoutLastThree([10, 20, 30, 40, 50]);    // [10, 20]
 * withoutLastThree([10, 20]);                // []
 * ```
 */
export function dropLast<T>(count: number) {
  if (!Number.isInteger(count) || count <= 0) {
    return (_: ReadonlyArray<T>) => [];
  }

  return (arr: ReadonlyArray<T>) => arr.slice(0, -count);
}

/**
 * @param condition
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 * import * as N from "flurp/number";
 *
 * const justPositive = A.filter(N.isPositive);
 * justPositive([3, -6, 2]);     // [3, 2]
 * ```
 */
export function filter<T>(condition: (x: T) => boolean) {
  return (arr: ReadonlyArray<T>) => arr.filter(condition);
}

/**
 * @param condition
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 * import * as N from "flurp/number";
 *
 * const positiveEvenIndex = A.filterWithIndex((i, x) => N.isPositive(x) && N.isEven(i));
 * positiveWithEvenIndex([3, -6, 2, 4, -7]);    // [3, 2]
 * ```
 */
export function filterWithIndex<T>(condition: (i: number, x: T) => boolean) {
  return (arr: ReadonlyArray<T>) => arr.filter((x, i) => condition(i, x));
}

/**
 * @remarks
 * Returns `undefined` if no element satisfies `condition`.
 *
 * @param condition
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 * import * as N from "flurp/number";
 *
 * const firstPositive = A.find(N.isPositive);
 * firstPositive([-3, -4, -1, -4, 5, 2]);        // 5
 * firstPositive([-3, -4, -1, -4, -5, -2]);      // undefined
 * ```
 */
export function find<T>(condition: (x: T) => boolean) {
  return (arr: ReadonlyArray<T>) => arr.find(condition);
}

/**
 * Returns an array of all indices of an array that pass `condition`.
 *
 * @param condition
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 * import * as N from "flurp/number";
 *
 * const indicesOfPositive = A.findAllIndices(N.isPositive);
 * indicesOfPositive([3, -4, -1, 5, -4, 2]);       // [0, 3, 5]
 * indicesOfPositive([-3, -4, -1, -5, -4, -2]);    // []
 * ```
 */
export function findAllIndices<T>(condition: (x: T) => boolean) {
  return function (arr: ReadonlyArray<T>) {
    const len = arr.length;
    const result = [];

    for (let i = 0; i < len; i++) {
      if (condition(arr[i])) {
        result.push(i);
      }
    }

    return result;
  };
}

/**
 * @remarks
 * Returns `undefined` if no element satisfies `condition`.
 * This behavior differs from the built-in `Array.findIndex()`,
 * but is more consistent with other functions in this library.
 *
 * @param condition
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 * import * as N from "flurp/number";
 *
 * const firstPositiveIndex = A.findIndex(N.isPositive);
 * firstPositiveIndex([-3, -4, -1, 4, -5, 2]);    // 3
 * firstPositiveIndex([-3, -4, -1, -4, -5, -2]);  // undefined
 * ```
 */
export function findIndex<T>(condition: (x: T) => boolean) {
  return function (arr: ReadonlyArray<T>) {
    const idx = arr.findIndex(condition);
    return idx >= 0 ? idx : undefined;
  };
}

/**
 * @remarks
 * Returns `undefined` if no element satisfies `condition`.
 *
 * @param condition
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 * import * as N from "flurp/number";
 *
 * const lastPositiveIndex = A.findLast(N.isPositive);
 * lastPositiveIndex([-3, -4, -1, 5, 8, -2]);      // 8
 * lastPositiveIndex([-3, -4, -1, -5, -8, -2]);    // undefined
 * ```
 */
export function findLast<T>(condition: (x: T) => boolean) {
  /*
   * As of v 4.9.3, TS doesn't have built-in findLast.
   * Simpler reverse implementation eschewed to avoid
   * performance issues in large arrays.
   */
  return function (arr: ReadonlyArray<T>) {
    let i = arr.length - 1;

    while (i >= 0) {
      if (condition(arr[i])) {
        return arr[i];
      }
      i--;
    }

    return undefined;
  };
}

/**
 * @remarks
 * Returns `undefined` if no element satisfies `condition`.
 * This differs from the built-in `Array.findLastIndex()`,
 * but is more consistent with other functions in this library.
 *
 * @param condition
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 * import * as N from "flurp/number";
 *
 * const lastPositiveIndex = A.findLastIndex(N.isPositive);
 * lastPositiveIndex([-3, -4, 1, -5, 8, -2]);      // 4
 * lastPositiveIndex([-3, -4, -1, -5, -8, -2]);    // undefined
 * ```
 */
export function findLastIndex<T>(condition: (x: T) => boolean) {
  /*
   * As of v 4.9.3, TS doesn't have built-in findLastIndex.
   * Simpler reverse implementation eschewed to avoid
   * performance issues in large arrays.
   */
  return function (arr: ReadonlyArray<T>) {
    let i = arr.length - 1;

    while (i >= 0) {
      if (condition(arr[i])) {
        return i;
      }
      i--;
    }

    return undefined;
  };
}

/**
 * Returns the first slice of the array of length `len`
 * from the right (starting with `slice(len - 1)`,
 * then `slice(len - 1)`, etc.) which passes `condition`.
 * Returns `undefined` if no slice of the array ending with
 * the last element passes.
 *
 * @param condition
 */
export function findRightSlice<T>(condition: (a: ReadonlyArray<T>) => boolean) {
  return function (arr: ReadonlyArray<T>) {
    const len = arr.length;
    let i = len - 1;

    while (i >= 0) {
      const slice = arr.slice(i);
      if (condition(slice)) {
        return slice;
      }
      i--;
    }

    return undefined;
  };
}

/**
 * Returns the first slice of the array (starting with `slice(0, 0)`, then `slice(0, 1)`, etc.)
 * which passes `condition`. Returns `undefined` if no slice of the array beginning with
 * the first element passes.
 *
 * @param condition
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 * import * as N from "flurp/number";
 *
 * const twoPositive = (arr: ReadonlyArray<number>) => A.count(N.isPositive)(arr) >= 2;
 * const firstSlice = A.findSlice(twoPositive);
 * firstSlice([2, -4, 1, -5, 6]);      // [2, -4, 1]
 * firstSlice([2, -4]);                // undefined
 * ```
 */
export function findSlice<T>(condition: (a: ReadonlyArray<T>) => boolean) {
  return function (arr: ReadonlyArray<T>) {
    let i = 0;
    const len = arr.length;

    while (i <= len) {
      const slice = arr.slice(0, i);
      if (condition(slice)) {
        return slice;
      }
      i++;
    }

    return undefined;
  };
}

/**
 * @remarks
 * Returns `undefined` if `arr` is empty.
 *
 * @param arr
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * A.first([4, 5, 6]);    // 4
 * A.first([]);           // undefined
 * ```
 */
export function first<T>(arr: ReadonlyArray<T>) {
  return arr.length > 0 ? arr[0] : undefined;
}

/**
 * Flattens nested arrays recursively with `levels` iterations.
 *
 * @remarks
 * The verbose type signature comes from the recursive definition
 * TypeScript uses for the built-in `Array.flat()`.
 *
 * @param levels
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const flattenOneLevel = A.flatten();
 * flattenOneLevel([[3, 4], [], [5, 6, 7, [8, 9]]]);  // [3, 4, 5, 6, 7, [8, 9]]
 *
 * const flattenTwoLevels = A.flatten(2);
 * flattenTwoLevels([[3, 4], [], [5, 6, 7, [8, 9]]]);  // [3, 4, 5, 6, 7, 8, 9]
 * ```
 */
export function flatten<T>(levels = 1) {
  return (arr: ReadonlyArray<T>) => arr.flat(levels);
}

/**
 * Negative indices count backwards from the end of the array.
 *
 * @remarks
 * Returns `undefined` if `index` is fractional or `NaN`.
 *
 * @param index
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const indexTwo = A.get(2);
 * indexTwo([3, 4, 5, 6, 7]);        // 5
 *
 * const secondToLast = A.get(-2);
 * secondToLast([3, 4, 5, 6, 7]);   // 6
 * ```
 */
export function get<T>(index: number) {
  return function (arr: ReadonlyArray<T>) {
    const idx = adjIndex(arr, index);
    return typeof idx === "number" ? arr[idx] : idx;
  };
}

/**
 * @param elem
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const hasTwo = A.includes(2);
 * hasTwo([2, 3, 4]);    // true
 * hasTwo([3, 4]);       // false
 * ```
 */
export function includes<T>(elem: T) {
  return (arr: ReadonlyArray<T>) => arr.includes(elem);
}

/**
 * Can insert an array or a single element.
 * Negative indices count backwards from the end of the array.
 *
 * @remarks
 * Non-integer or out of bounds indices return the array unchanged.
 * If `index` equals the length of the array, then `elems` will be appended
 * to the end.
 *
 * @param index
 * @param elems
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const insertOne = A.insert(2, 10);
 * insertOne([0, 1, 2, 3, 4]);    // [0, 1, 10, 2, 3, 4]
 *
 * const insertMulti = A.insert(2, [10, 11, 12]);
 * insertMulti([0, 1, 2, 3, 4]);   // [0, 1, 10, 11, 12, 2, 3, 4]
 * ```
 */
export function insert<T>(index: number, elems: T | Array<T>) {
  const toInsert = Array.isArray(elems) ? elems : [elems];

  return function (arr: ReadonlyArray<T>) {
    if (typeof adjIndex(arr, index) === "number") {
      // non-null assertion OK since causes of null would also make adjIndex non-numeric
      const [before, after] = split<T>(index)(arr)!;
      return [...before, ...toInsert, ...after];
    }

    if (index === arr.length) {
      return [...arr, ...toInsert];
    }

    return [...arr];
  };
}

/**
 * @param arr
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * A.isEmpty([]);          // true
 * A.isEmpty([2]);         // false
 * ```
 */
export function isEmpty<T>(arr: ReadonlyArray<T>) {
  return arr.length === 0;
}

/**
 * @param separator
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const justJoin = A.join();
 * justJoin(["a", "b", "c"]));    // "abc"
 *
 * const joinDots = A.join("...");
 * joinDots(["a", "b", "c"]));    // "a...b...c"
 * ```
 */
export function join(separator = "") {
  return (arr: ReadonlyArray<string>) => arr.join(separator);
}

/**
 * @remarks
 * Returns `undefined` if `arr` is empty.
 *
 * @param arr
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * A.last([4, 5, 6]);    // 6
 * A.last([]);           // undefined
 * ```
 */
export function last<T>(arr: ReadonlyArray<T>) {
  return arr.length > 0 ? arr.at(-1) : undefined;
}

/**
 * @param arr
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * A.length([4, 5, 6]);    // 3
 * ```
 */
export function length<T>(arr: ReadonlyArray<T>) {
  return arr.length;
}

/**
 * @param transform
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 * import * as N from "flurp/number";
 *
 * const double = A.map(N.multiply(2));
 * double([3, 4, 5]);    // [6, 8, 10]
 * ```
 */
export function map<T, U>(transform: (x: T) => U) {
  return (arr: ReadonlyArray<T>) => arr.map(transform);
}

/**
 * @param transform
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const multiplyByIndex = A.mapWithIndex((i: number, x: number) => x * i);
 * multiplyByIndex([3, 4, 5, 6]);    // [0, 4, 10, 18]
 * ```
 */
export function mapWithIndex<T, U>(transform: (i: number, x: T) => U) {
  return (arr: ReadonlyArray<T>) => arr.map((x, i) => transform(i, x));
}

/**
 * Calculates the average of an array of numbers
 *
 * @param arr
 *
 * ```ts
 * import * as A from "flurp/array";
 *
 * A.mean([3, 5, 10]);    // 6
 * ```
 */
export function mean(arr: ReadonlyArray<number>) {
  return arr.reduce((acc, next) => next + acc, 0) / arr.length;
}

/**
 * Applies a transformation to an array of numbers and averages the results
 *
 * @param transformation
 *
 * ```ts
 * import * as A from "flurp/array";
 * import * as N from "flurp/number";
 *
 * const meanOfSquares = A.meanWith(N.pow(2));
 * meanOfSquares([3, 4, 2, 1]);    // 7.5    i.e., (3^2 + 4^2 + 2^2 + 1^2) / 4
 * ```
 */
export function meanWith<T>(transformation: (x: T) => number) {
  return (arr: ReadonlyArray<T>) =>
    arr.reduce((acc: number, next: T) => transformation(next) + acc, 0) /
    arr.length;
}

/**
 * @param condition
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const hasNoPositive = A.none(N.isPositive);
 * hasNoPositive([-3, -5, -6]));     // true
 * hasNoPositive([-3, 2, -6]));      // false
 * hasNoPositive([]));               // true (since no failing elements)
 * ```
 */
export function none<T>(condition: (x: T) => boolean) {
  return function (arr: ReadonlyArray<T>) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      if (condition(arr[i])) {
        return false;
      }
    }
    return true;
  };
}

/**
 * @remarks
 * Can prepend an array or a single element
 *
 * @param elems
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const prependOne = prepend(7);
 * prependOne([5, 6]);       // [7, 5, 6]
 *
 * const prependMulti = prepend([7, 8]);
 * prependMulti ([5, 6]);    // [7, 8, 5, 6]
 * ```
 */
export function prepend<T>(elems: T | Array<T>) {
  if (Array.isArray(elems)) {
    return (arr: ReadonlyArray<T>) => [...elems, ...arr];
  }

  return (arr: ReadonlyArray<T>) => [elems, ...arr];
}

/**
 * @remarks
 * Returns undefined if `arr` is empty.
 *
 * @param arr
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * A.product([2, 3, 5]);    // 30
 * A.product([2]);          // 2
 * A.product([]);           // undefined
 * ```
 */
export function product(arr: ReadonlyArray<number>) {
  return arr.length > 0 ? arr.reduce((acc, next) => next * acc) : undefined;
}

/**
 * @remarks
 * The `initial` value is mandatory. This is required so `accumulator` can accept
 * different types for `acc` and `next`.
 *
 * @param accumulator
 * @param initial
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const concatWithLabel = A.reduce((acc, next) => acc + next, "reduced: ");
 * ```
 */
export function reduce<T, U>(accumulator: (acc: T, next: U) => T, initial: T) {
  // separate functions required due to typing of init in Array.reduce
  return (arr: ReadonlyArray<U>) => arr.reduce(accumulator, initial);
}

/**
 * @remarks
 * The `initial` value is mandatory. This is required so `accumulator` can accept
 * different types for `acc` and `next`.
 *
 * @param accumulator
 * @param initial
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const concatWithLabel = A.reduceRight((acc, next) => acc + next, "reduced: ");
 * ```
 */
export function reduceRight<T, U>(
  accumulator: (acc: T, next: U) => T,
  initial: T
) {
  // separate functions required due to typing of init in Array.reduce()
  return (arr: ReadonlyArray<U>) => arr.reduceRight(accumulator, initial);
}

/**
 * @param accumulator
 * @param initial
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const concatEveryOther = A.reduceRightWithIndex(
 *   (acc: string, next: string, index: number) =>
 *     acc + (N.isEven(index) ? next : ""),
 *     "every other from right: "
 *   );
 * f(["a", "b", "c", "d", "e"]);   // "every other from right: eca"
 * ```
 */
export function reduceRightWithIndex<T, U>(
  accumulator: (acc: T, next: U, index: number) => T,
  initial: T
) {
  // separate functions required due to typing of init in Array.reduce()
  return (arr: ReadonlyArray<U>) => arr.reduceRight(accumulator, initial);
}

/**
 * @param accumulator
 * @param initial
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const addEvenIndexed = A.reduceWithIndex(
 *       (acc: number, next: number, index: number) =>
 *         acc + (N.isEven(index) ? next : 0),
 *       10
 *     );
 * addEvenIndexed([1, 4, 6, 7, 3]);    // 10
 * ```
 */
export function reduceWithIndex<T, U>(
  accumulator: (acc: T, next: U, index: number) => T,
  initial: T
) {
  // separate functions required due to typing of init in Array.reduce()
  return (arr: ReadonlyArray<U>) => arr.reduce(accumulator, initial);
}

/**
 * The opposite of `filter`. It returns a list with the elements that satisfy
 * the condition removed.
 *
 * @param condition
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 * import * as N from "flurp/number";
 *
 * const tossOutNegative = A.reject(N.isNegative);
 * tossOutNegative([0, 2, -4, 6, 8]);    // [0, 2, 6, 8]
 * ```
 */
export function reject<T>(condition: (x: T) => boolean) {
  return (arr: ReadonlyArray<T>) => arr.filter((x) => !condition(x));
}

/**
 * Removes the element `startIndex`, or the elements from `startIndex` to
 * (but not including) `endIndex`, from the array.
 *
 * Negative indices count backwards from the end of the array.
 * If `index` is fractional or otherwise invalid, returns a shallow copy
 * of the array.
 *
 * @remarks
 * This function removes elements by indices. To remove
 * by element value, use {@link reject}.
 *
 * @param startIndex
 * @param endIndex
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const removeSecond = A.remove(1);
 * removeSecond([10, 20, 30, 40]);            // [10, 30, 40]
 *
 * const removeLast = A.remove(-1);
 * removeLast([10, 20, 30, 40]);              // [10, 20, 30]
 *
 * const removeSecondAndThird = A.remove(2, 4);
 * removeSecondAndThird([10, 20, 30, 40]);    // [10, 40]
 * ```
 */
export function remove<T>(startIndex: number, endIndex?: number) {
  if (
    !Number.isInteger(startIndex) ||
    (typeof endIndex === "number" && !Number.isInteger(startIndex))
  ) {
    return (arr: ReadonlyArray<T>) => [...arr];
  }

  if (endIndex === undefined) {
    return (arr: ReadonlyArray<T>) => [
      ...arr.slice(0, startIndex),
      ...arr.slice(startIndex + 1),
    ];
  }

  return (arr: ReadonlyArray<T>) => [
    ...arr.slice(0, startIndex),
    ...arr.slice(endIndex),
  ];
}

/**
 * A convenience function to streamline some `map` operations. Applies `transform` to those
 * elements which satisfy `condition` while leaving other elements unchanged.
 *
 * @param condition
 * @param transform
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 * import * as L from "flurp/logic";
 * import * as N from "flurp/number";
 *
 * const negativeToPositive = A.replace(N.isNegative, Math.abs);
 * negativeToPositive([-1, 2, -3, 4, -5]);      // [1, 2, 3, 4, 5]
 *
 * const zeroToOne = A.replace(L.equals(0), always(1));
 * zeroToOne([0, 3, 4, 0]);                  // [1, 3, 4, 1]
 * ```
 */
export function replace<T, U>(
  condition: (x: T) => boolean,
  transform: (x: T) => U
) {
  return (arr: ReadonlyArray<T>) =>
    arr.map((x) => (condition(x) ? transform(x) : x));
}

/**
 * Replaces the elements from `startIndex` to (but not including) `endIndex` with `replacement`.
 * Returns a shallow copy without replacement if `startIndex >= endIndex` or if one or both indices
 * is not an integer.
 *
 * Negative indices count backwards from the end of the array.
 *
 *
 * @param startIndex
 * @param endIndex
 * @param replacement
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 * import * as L from "flurp/logic";
 * import * as N from "flurp/number";
 *
 * const replaceSecondAndThird = A.replaceSlice(1, 3, [10, 11, 12]);
 * replaceSecondAndThird([1, 2, 3, 4, 5]);   // [1, 10, 11, 12, 4, 5]
 *
 * const replaceSecondToLast = A.replaceSlice(-2, -1, [10, 11, 12]);
 * replaceSecondToLast([1, 2, 3, 4, 5]);     // [1, 2, 3, 10, 11, 12, 5];
 * ```
 */
export function replaceSlice<T>(
  startIndex: number,
  endIndex: number,
  replacement: Array<T>
) {
  if (!Number.isInteger(startIndex) || !Number.isInteger(endIndex)) {
    return (arr: ReadonlyArray<T>) => [...arr];
  }

  return function (arr: ReadonlyArray<T>) {
    const start = Math.max(
      0,
      startIndex >= 0 ? startIndex : arr.length + startIndex
    );
    const end = Math.min(
      arr.length,
      endIndex >= 0 ? endIndex : arr.length + endIndex
    );

    if (start >= end) {
      return [...arr];
    }

    return [...arr.slice(0, start), ...replacement, ...arr.slice(end)];
  };
}

/**
 * @param arr
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * A.reverse([1, 2, 3]);    // [3, 2, 1]
 * ```
 */
export function reverse<T>(arr: ReadonlyArray<T>) {
  return [...arr].reverse();
}

/**
 * Returns `true` if the array element at `index` exists and satisfies `condition`.
 * Negative indices count backwards from the end of the array.
 *
 * @remarks
 * This function is designed to improve developer experience by eliminating the need
 * to account for the `undefined` type when accessing an array element.
 *
 * @param index
 * @param condition
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 * import * as N from "flurp/number";
 *
 * const indexTwoPositive = A.satisfies(3, N.isPositive);
 * indexTwoPositive([1, -2, 3, -4]);     // true
 * indexTwoPositive([-1, 2, -3, 4]);     // false
 * indexTwoPositive([1, 2]);             // false
 *
 * const lastPositive = A.satisfies(-1, N.isPositive);
 * lastPositive([1, -2, 3]);             // true
 * ```
 */
export function satisfies<T>(index: number, condition: (x: T) => boolean) {
  return function (arr: ReadonlyArray<T>) {
    const idx = adjIndex(arr, index);
    return typeof idx === "number" ? condition(arr.at(idx)!) : false;
  };
}

/**
 * Negative indices count backwards from the end of the array.
 * If `index` is fractional or otherwise invalid, returns a shallow copy
 * of the array.
 *
 * @param index  the index at which to update
 * @param newVal  the new value of the element
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const firstToTen = A.set(0, 10);
 * firstToTen([3, 4, 5, 6]);   // [10, 4, 5, 6]
 *
 * const lastToTen = A.set(-1, 10);
 * lastToTen([3, 4, 5, 6]);   // [3, 4, 5, 10]
 * ```
 */
export function set<T>(index: number, newVal: T) {
  return function (arr: ReadonlyArray<T>) {
    const copy = [...arr];
    const idx = adjIndex(arr, index);

    if (typeof idx === "number") {
      copy[idx] = newVal;
    }

    return copy;
  };
}

/**
 * Negative indices count backwards from the end of the array.
 * Like the built-in `Array.slice()`, the slice does not include the `end` index,
 * and omitting both parameters returns a shallow copy of the array.
 *
 * @remarks
 * Returns an empty array if `start` or `end` is fractional or `NaN`.
 *
 * @param startIndex?
 * @param endIndex?
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const fromIndexTwo = A.slice(2);
 * fromIndexTwo([0, 1, 2, 3, 4, 5, 6]);        // [2, 3, 4, 5, 6]
 *
 * const lastTwo = A.slice(-2);
 * lastTwo([0, 1, 2, 3, 4, 5, 6]);             // [5, 6]
 *
 * const indexTwoAndThree = A.slice(2, 4);
 * indexTwoAndThree([0, 1, 2, 3, 4, 5, 6]);    // [2, 3]
 *
 * const shallowCopy = A.slice();
 * shallowCopy([0, 1, 2, 3, 4, 5, 6]);         // [0, 1, 2, 3, 4, 5, 6]
 * ```
 */
export function slice<T>(startIndex?: number, endIndex?: number) {
  if (
    (typeof startIndex === "number" && !Number.isInteger(startIndex)) ||
    (typeof endIndex === "number" && !Number.isInteger(endIndex))
  ) {
    return (_: ReadonlyArray<T>) => [];
  }

  return (arr: ReadonlyArray<T>) => arr.slice(startIndex, endIndex);
}

/**
 * Returns `true` if each element from the slice beginning at `startIndex` and continuing
 * with as many elements as there are in `conditions` exist and pass their corresponding conditions.
 * In other words, the first element in the slice passes the first condition, the next element
 * passes the second condition, etc.
 *
 * Negative `startIndex` values count backwards from the end of the array.
 *
 * @param startIndex
 * @param conditions
 *
 * @example
 * ```ts
 *
 * import * as A from "flurp/array";
 * import * as L from "flurp/logic";
 * import * as N from "flurp/number";
 *
 * const posNegPos = A.sliceSatisfies(1, [N.isPositive, N.isNegative, N.isPositive]);
 * posNegPos([0, 2, -2, 2, 0, 0]);     // true
 * posNegPos([0, 2, -2, -2, 0, 0]);    // false
 * posNegPos([2, -2, 2, 0, 0]);        // false
 *
 * const endsNineTen = A.sliceSatisfies(-2, [L.equals(9), L.equals(10)]);
 * endsNineTen([5, 9, 10]);            // true
 * endsNineTen([9, 10, 5]);            // false
 * endsNineTen([9]);                   // false
 * ```
 */
export function sliceSatisfies<T>(
  startIndex: number,
  conditions: Array<(x: T) => boolean>
) {
  return function (arr: ReadonlyArray<T>) {
    const start = adjIndex(arr, startIndex);
    if (typeof start !== "number") {
      return false;
    }

    let i = 0;
    while (i < conditions.length) {
      const elem = arr.at(start + i);
      if (elem === undefined || !conditions[i](elem)) {
        return false;
      }
      i++;
    }

    return true;
  };
}

/**
 * Returns a new array sorted according to the `comparator` function.
 * The {@link !comparator} module contains some useful comparator functions and
 * utilities for creating others. You may also write your own comparators,
 * provided that they follow the specifications found in [MDN on `Array.prototype.sort()`]
 * (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).
 *
 * @remarks
 * The built-in `Array.prototype.sort()` has a default comparator that sorts in ascending order
 * according to the string representation of the items. However, this behavior is rarely the most sound
 * option for real world use cases, and Flurp has therefore not included such an option among
 * its comparators.
 *
 * @param comparator
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 * import * as C from "flurp/comparator";
 *
 * const sortScores = A.sortWith(C.numericDesc);
 * sortScores([30, 6, 1, 40, 5]);      // [40, 30, 6, 5, 1]
 * ```
 */
export function sortWith<T>(comparator: (x: T, y: T) => number) {
  return (arr: ReadonlyArray<T>) => [...arr].sort(comparator);
}

/**
 * Breaks an array into an array of two arrays. The first contains the
 * elements before `index`, and the second contains the elements at `index`
 * and thereafter.
 *
 * @remarks
 * Negative indices count backwards from the end of the array.
 * Returns `null` if `index` is fractional or `NaN`.
 *
 * @param index
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const split = A.split(3);
 * split([0, 1, 2, 3, 4]);     // [[0, 1, 2], [3, 4]]
 *
 * const splitLast = A.split(-1);
 * splitLast([0, 1, 2, 3, 4]);     // [[0, 1, 2, 3], [4]]
 * ```
 */
export function split<T>(index: number) {
  return function (arr: ReadonlyArray<T>) {
    if (!Number.isInteger(index)) {
      return null;
    }

    return [arr.slice(0, index), arr.slice(index)];
  };
}

/**
 * Breaks an array into an array of arrays. The `indices` are
 * where each new array begins.
 *
 * @remarks
 * Negative indices count backwards from the end of the array.
 * Returns null if any index is fractional or NaN.
 *
 * @param indices
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const splitFirstAndLastPairs = A/split(2, -2);
 * splitFirstAndLastPairs([0, 1, 2, 3, 4, 5, 6, 7]);    // [[0, 1], [2, 3, 4], [6, 7]]
 * ```
 */
export function splitMulti<T>(indices: Array<number>) {
  return function (arr: ReadonlyArray<T>) {
    if (indices.some((i) => !Number.isInteger(i))) {
      return null;
    }

    const indexes = [0, ...indices, Infinity];
    const len = indices.length + 1;
    const result = [];

    for (let i = 0; i < len; i++) {
      result.push(arr.slice(indexes[i], indexes[i + 1]));
    }
    return result;
  };
}

/**
 * @param arr
 *
 *@example
 * ```ts
 * import * as A from "flurp/array";
 *
 * A.sum([3, 4, 5]);    // 12
 * ```
 */
export function sum(arr: ReadonlyArray<number>) {
  return arr.reduce((acc, next) => next + acc, 0);
}

/**
 * Applies a transformation to every element before computing the sum
 *
 * @param transformation
 *
 *@example
 * ```ts
 * import * as A from "flurp/array";
 * import * as N from "flurp/number";
 *
 * const sumOfSquares = A.sumWith(N.pow(2));
 * sumOfSquares([1, 3, 5]);    // 35   (i.e., 1^2 + 3^2 + 5^2)
 * ```
 */
export function sumWith<T>(transformation: (x: T) => number) {
  return (arr: ReadonlyArray<T>) =>
    arr.reduce((acc: number, next: T) => transformation(next) + acc, 0);
}

/**
 * Returns a new array including the first `count` elements.
 * Returns an empty array if `count` is not an integer or is negative.
 * To prevent unexpected behavior from returning
 * a non-empty but shorter than expected array, `take` also returns an empty
 * array if `count` exceeds the length of the array.  To return the entire array
 * instead in this case, use {@link slice}.
 *
 * @param count
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const firstThree = A.take(3);
 * firstThree([10, 20, 30, 40, 50]);    // [10, 20, 30]
 * firstThree([10, 20]);                // []
 * ```
 */
export function take<T>(count: number) {
  if (!Number.isInteger(count) || count <= 0) {
    return (_: ReadonlyArray<T>) => [];
  }

  return (arr: ReadonlyArray<T>) =>
    count <= arr.length ? arr.slice(0, count) : [];
}

/**
 * Returns a new array including the last `count` elements. Returns an empty array if `count`
 * is not an integer or is negative. To prevent unexpected behavior from returning
 * a non-empty but shorter than expected array, `takeLast` also returns an empty
 * array if `count` exceeds the length of the array.  To return the entire array
 * instead in this case, use {@link slice}.
 *
 * @param count
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * const lastThree = A.takeLast(3);
 * lastThree([10, 20, 30, 40, 50]);    // [30, 40, 50]
 * lastThree([10, 20]);                // []
 * ```
 */
export function takeLast<T>(count: number) {
  if (!Number.isInteger(count) || count <= 0) {
    return (_: ReadonlyArray<T>) => [];
  }

  return (arr: ReadonlyArray<T>) =>
    count <= arr.length ? arr.slice(-count) : [];
}

/**
 * Applies a `transformation` to the value of an array at the specified `index`.
 *
 * Negative indices count backwards from the end of the array.
 * If `index` is fractional or otherwise invalid, returns a shallow copy
 * of the array.
 *
 * @param index
 * @param transformation
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 * import * as N from "flurp/number";
 *
 * const doubleFirst = A.update(0, N.multiply(2));
 * doubleFirst([3, 4, 5, 6]);   // [6, 4, 5, 6]
 *
 * const doubleLast = A.update(-1, N.multiply(2));
 * doubleLast([3, 4, 5, 6]);   // [3, 4, 5, 12]
 * ```
 */
export function update<T>(index: number, transformation: (x: T) => T) {
  return function (arr: ReadonlyArray<T>) {
    const copy = [...arr];
    const idx = adjIndex(arr, index);

    if (typeof idx === "number") {
      copy[idx] = transformation(arr[idx]);
    }

    return copy;
  };
}

/**
 * Returns a new array with duplicate values removed
 *
 * @param arr
 *
 * @example
 * ```ts
 * import * as A from "flurp/array";
 *
 * A.unique([1, 4, 4, 1, 1, 4]);    // [1, 4]
 * ```
 */
export function unique<T>(arr: ReadonlyArray<T>) {
  return [...new Set(arr)];
}
