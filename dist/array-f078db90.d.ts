/**
 * @internal
 * If index is invalid, returns null
 * If index is negative, return positive equivalent index
 * Otherwise return index
 */
/**
 * @param condition
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 * import * as N from "flurp/number";
 *
 * const allPositive = A.all(N.isPositive);
 * allPositive([3, 5, 6]));     // true
 * allPositive([3, 5, -6]));    // false
 * allPositive([]));            // true (since no failing elements)
 * ```
 */
declare function all<T>(condition: (x: T) => boolean): (arr: ReadonlyArray<T>) => boolean;
/**
 * @param condition
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 * import * as N from "flurp/number";
 *
 * const hasAPositive = A.any(N.isPositive);
 * hasAPositive([3, -5, -6]));      // true
 * hasAPositive([-3, -5, -6]));     // false
 * hasAPositive([]));               // false
 * ```
 */
declare function any<T>(condition: (x: T) => boolean): (arr: ReadonlyArray<T>) => boolean;
/**
 * Returns an array of arrays of length `size` with consecutive elements
 * from the original array. Returns an empty array if `size` is shorter
 * than the array or is not an integer.
 *
 * @param size
 *
 * @example
 * ```ts
 * import { A } from "flurp";
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
declare function aperture<T>(size: number): (arr: ReadonlyArray<T>) => T[][];
/**
 * @remarks
 * Can append an array or a single element.
 *
 * @param elems
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 *
 * const appendOne = A.append(7);
 * appendOne([5, 6]);    // [5, 6, 7]
 *
 * const appendMulti = A.append([7, 8, 9]);
 * appendMulti([5, 6]);    // [5, 6, 7, 8, 9]
 * ```
 */
declare function append<T>(elems: T | Array<T>): (arr: ReadonlyArray<T>) => T[];
/**
 * @param arrays
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 *
 * A.concat([[3], [6], [9, 12]]);        // [3, 6, 9, 12]
 * ```
 */
declare function concat<T>(arrays: Array<ReadonlyArray<T>>): T[];
/**
 * @param condition
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 * import * as N from "flurp/number";
 *
 * const countPositive = A.count(isPositive);
 * countPositive([4, 5, -2, 6, -1]);     // 3
 * ```
 */
declare function count<T>(condition: (x: T) => boolean): (arr: ReadonlyArray<T>) => number;
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
 * import { A, L } from "flurp";
 *
 * A.createWith(4, L.always(5));              // [5, 5, 5, 5]
 * A.createWith(3, L.identity)                // [0, 1, 2]
 * A.createWith(5, i => (i + 1) * 5);         // [5, 10, 15, 20, 25]
 * A.createWith(100000, L.identity);          // null
 * A.createWith(100001, L.identity, 200000);  // [0, 1, 2, 3, ..., 99999, 100000]
 * ```
 */
declare function createWith<T>(length: number, f: (x: number) => T, maxLength?: number): any[] | null;
/**
 * Returns a new array with the first `count` elements removed.
 * Returns an empty array if `count` is not an integer or is negative.
 *
 * @param count
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 *
 * const withoutFirstThree = A.dropLast(3);
 * withoutFirstThree([10, 20, 30, 40, 50]);    // [40, 50]
 * withoutFirstThree([10, 20]);                // []
 * ```
 */
declare function drop<T>(count: number): (arr: ReadonlyArray<T>) => T[];
/**
 * Returns a new array with the last `count` elements removed.
 * Returns an empty array if `count` is not an integer or is negative.
 *
 * @param count
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 *
 * const withoutLastThree = A.dropLast(3);
 * withoutLastThree([10, 20, 30, 40, 50]);    // [10, 20]
 * withoutLastThree([10, 20]);                // []
 * ```
 */
declare function dropLast<T>(count: number): (arr: ReadonlyArray<T>) => T[];
/**
 * @param condition
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 * import * as N from "flurp/number";
 *
 * const justPositive = A.filter(N.isPositive);
 * justPositive([3, -6, 2]);     // [3, 2]
 * ```
 */
declare function filter<T>(condition: (x: T) => boolean): (arr: ReadonlyArray<T>) => T[];
/**
 * @param condition
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 * import * as N from "flurp/number";
 *
 * const positiveEvenIndex = A.filterWithIndex((i, x) => N.isPositive(x) && N.isEven(i));
 * positiveWithEvenIndex([3, -6, 2, 4, -7]);    // [3, 2]
 * ```
 */
declare function filterWithIndex<T>(condition: (i: number, x: T) => boolean): (arr: ReadonlyArray<T>) => T[];
/**
 * @remarks
 * Returns `undefined` if no element satisfies `condition`.
 *
 * @param condition
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 * import * as N from "flurp/number";
 *
 * const firstPositive = A.find(N.isPositive);
 * firstPositive([-3, -4, -1, -4, 5, 2]);        // 5
 * firstPositive([-3, -4, -1, -4, -5, -2]);      // undefined
 * ```
 */
declare function find<T>(condition: (x: T) => boolean): (arr: ReadonlyArray<T>) => T | undefined;
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
 * import { A } from "flurp";
 * import * as N from "flurp/number";
 *
 * const firstPositiveIndex = A.findIndex(N.isPositive);
 * firstPositiveIndex([-3, -4, -1, 4, -5, 2]);    // 3
 * firstPositiveIndex([-3, -4, -1, -4, -5, -2]);  // undefined
 * ```
 */
declare function findIndex<T>(condition: (x: T) => boolean): (arr: ReadonlyArray<T>) => number | undefined;
/**
 * @remarks
 * Returns `undefined` if no element satisfies `condition`.
 *
 * @param condition
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 * import * as N from "flurp/number";
 *
 * const lastPositiveIndex = A.findLast(N.isPositive);
 * lastPositiveIndex([-3, -4, -1, 5, 8, -2]);      // 8
 * lastPositiveIndex([-3, -4, -1, -5, -8, -2]);    // undefined
 * ```
 */
declare function findLast<T>(condition: (x: T) => boolean): (arr: ReadonlyArray<T>) => T | undefined;
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
 * import { A } from "flurp";
 * import * as N from "flurp/number";
 *
 * const lastPositiveIndex = A.findLastIndex(N.isPositive);
 * lastPositiveIndex([-3, -4, 1, -5, 8, -2]);      // 4
 * lastPositiveIndex([-3, -4, -1, -5, -8, -2]);    // undefined
 * ```
 */
declare function findLastIndex<T>(condition: (x: T) => boolean): (arr: ReadonlyArray<T>) => number | undefined;
/**
 * @remarks
 * Returns `undefined` if `arr` is empty.
 *
 * @param arr
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 *
 * A.first([4, 5, 6]);    // 4
 * A.first([]);           // undefined
 * ```
 */
declare function first<T>(arr: ReadonlyArray<T>): T | undefined;
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
 * import { A } from "flurp";
 *
 * const flattenOneLevel = A.flatten();
 * flattenOneLevel([[3, 4], [], [5, 6, 7, [8, 9]]]);  // [3, 4, 5, 6, 7, [8, 9]]
 *
 * const flattenTwoLevels = A.flatten(2);
 * flattenTwoLevels([[3, 4], [], [5, 6, 7, [8, 9]]]);  // [3, 4, 5, 6, 7, 8, 9]
 * ```
 */
declare function flatten<T>(levels?: number): (arr: ReadonlyArray<T>) => FlatArray<T, 0 | 1 | 2 | -1 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20>[];
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
 * import { A } from "flurp";
 *
 * const indexTwo = A.get(2);
 * indexTwo([3, 4, 5, 6, 7]);        // 5
 *
 * const secondToLast = A.get(-2);
 * secondToLast([3, 4, 5, 6, 7]);   // 6
 * ```
 */
declare function get<T>(index: number): (arr: ReadonlyArray<T>) => T | undefined;
/**
 * @param elem
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 *
 * const hasTwo = A.includes(2);
 * hasTwo([2, 3, 4]);    // true
 * hasTwo([3, 4]);       // false
 * ```
 */
declare function includes<T>(elem: T): (arr: ReadonlyArray<T>) => boolean;
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
 * import { A } from "flurp";
 *
 * const insertOne = A.insert(2, 10);
 * insertOne([0, 1, 2, 3, 4]);    // [0, 1, 10, 2, 3, 4]
 *
 * const insertMulti = A.insert(2, [10, 11, 12]);
 * insertMulti([0, 1, 2, 3, 4]);   // [0, 1, 10, 11, 12, 2, 3, 4]
 * ```
 */
declare function insert<T>(index: number, elems: T | Array<T>): (arr: ReadonlyArray<T>) => T[];
/**
 * @param arr
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 *
 * A.isEmpty([]);          // true
 * A.isEmpty([2]);         // false
 * ```
 */
declare function isEmpty<T>(arr: ReadonlyArray<T>): boolean;
/**
 * @param separator
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 *
 * const justJoin = A.join();
 * justJoin(["a", "b", "c"]));    // "abc"
 *
 * const joinDots = A.join("...");
 * joinDots(["a", "b", "c"]));    // "a...b...c"
 * ```
 */
declare function join(separator?: string): (arr: ReadonlyArray<string>) => string;
/**
 * @remarks
 * Returns `undefined` if `arr` is empty.
 *
 * @param arr
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 *
 * A.last([4, 5, 6]);    // 6
 * A.last([]);           // undefined
 * ```
 */
declare function last<T>(arr: ReadonlyArray<T>): T | undefined;
/**
 * @param arr
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 *
 * A.length([4, 5, 6]);    // 3
 * ```
 */
declare function length<T>(arr: ReadonlyArray<T>): number;
/**
 * @param transform
 *
 * @example
 * ```ts
 * import { A, N } from "flurp";
 *
 * const double = A.map(N.multiply(2));
 * double([3, 4, 5]);    // [6, 8, 10]
 * ```
 */
declare function map<T, U>(transform: (x: T) => U): (arr: ReadonlyArray<T>) => U[];
/**
 * @param transform
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 *
 * const multiplyByIndex = A.mapWithIndex((i: number, x: number) => x * i);
 * multiplyByIndex([3, 4, 5, 6]);    // [0, 4, 10, 18]
 * ```
 */
declare function mapWithIndex<T, U>(transform: (i: number, x: T) => U): (arr: ReadonlyArray<T>) => U[];
/**
 * @param condition
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 *
 * const hasNoPositive = A.none(N.isPositive);
 * hasNoPositive([-3, -5, -6]));     // true
 * hasNoPositive([-3, 2, -6]));      // false
 * hasNoPositive([]));               // true (since no failing elements)
 * ```
 */
declare function none<T>(condition: (x: T) => boolean): (arr: ReadonlyArray<T>) => boolean;
/**
 * @remarks
 * Can prepend an array or a single element
 *
 * @param elems
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 *
 * const prependOne = prepend(7);
 * prependOne([5, 6]);       // [7, 5, 6]
 *
 * const prependMulti = prepend([7, 8]);
 * prependMulti ([5, 6]);    // [7, 8, 5, 6]
 * ```
 */
declare function prepend<T>(elems: T | Array<T>): (arr: ReadonlyArray<T>) => T[];
/**
 * @remarks
 * Returns undefined if `arr` is empty.
 *
 * @param arr
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 *
 * A.product([2, 3, 5]);    // 30
 * A.product([2]);          // 2
 * A.product([]);           // undefined
 * ```
 */
declare function product(arr: ReadonlyArray<number>): number | undefined;
/**
 * @param accumulator
 * @param initial
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 *
 * const concatWithLabel = A.reduce((acc, next) => acc + next, "reduced: ");
 * concatWithLabel(["a", "b", "c"]);     // "reduced: abc"
 *
 * const justConcat = A.reduce((acc, next: string) => acc + next);
 * justConcat(["a", "b", "c"]);          // "abc"
 * ```
 */
declare function reduce<T>(accumulator: (acc: T, next: T) => T, initial?: T): (arr: ReadonlyArray<T>) => T;
/**
 * @param accumulator
 * @param initial?
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 *
 * const concatWithLabel = A.reduceRight((acc, next) => acc + next, "reduced: ");
 * concatWithLabel(["a", "b", "c"]);    // "reduced: abc"
 *
 * const justConcat = A.reduceRight((acc, next: string) => acc + next);
 * justConcat(["a", "b", "c"]);         // "abc"
 * ```
 */
declare function reduceRight<T>(accumulator: (acc: T, next: T) => T, initial?: T): (arr: ReadonlyArray<T>) => T;
/**
 * @param accumulator
 * @param initial
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 *
 * const concatEveryOther = A.reduceRightWithIndex(
 *   (acc: string, next: string, index: number) =>
 *     acc + (N.isEven(index) ? next : ""),
 *     "every other from right: "
 *   );
 * f(["a", "b", "c", "d", "e"]);   // "every other from right: eca"
 * ```
 */
declare function reduceRightWithIndex<T>(accumulator: (acc: T, next: T, index: number) => T, initial?: T): (arr: ReadonlyArray<T>) => T;
/**
 * @param accumulator
 * @param initial?
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 *
 * const addEvenIndexed = A.reduceWithIndex(
 *       (acc: number, next: number, index: number) =>
 *         acc + (N.isEven(index) ? next : 0),
 *       10
 *     );
 * addEvenIndexed([1, 4, 6, 7, 3]);    // 10
 * ```
 */
declare function reduceWithIndex<T>(accumulator: (acc: T, next: T, index: number) => T, initial?: T): (arr: ReadonlyArray<T>) => T;
/**
 * The opposite of `filter`. It returns a list with the elements that satisfy
 * the condition removed.
 *
 * @param condition
 *
 * @example
 * ```ts
 * import { A, N } from "flurp";
 *
 * const tossOutNegative = A.reject(N.isNegative);
 * tossOutNegative([0, 2, -4, 6, 8]);    // [0, 2, 6, 8]
 * ```
 */
declare function reject<T>(condition: (x: T) => boolean): (arr: ReadonlyArray<T>) => T[];
/**
 * Removes the element `startIndex`, or the elements from `startIndex` to
 * (but not including) `endIndex', from the array.
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
 * import { A } from "flurp";
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
declare function remove<T>(startIndex: number, endIndex?: number): (arr: ReadonlyArray<T>) => T[];
/**
 * @param arr
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 *
 * A.reverse([1, 2, 3]);    // [3, 2, 1]
 * ```
 */
declare function reverse<T>(arr: ReadonlyArray<T>): T[];
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
 * import { A } from "flurp";
 *
 * const firstToTen = A.set(0, 10);
 * firstToTen([3, 4, 5, 6]);   // [10, 4, 5, 6]
 *
 * const lastToTen = A.set(-1, 10);
 * lastToTen([3, 4, 5, 6]);   // [3, 4, 5, 10]
 * ```
 */
declare function set<T>(index: number, newVal: T): (arr: ReadonlyArray<T>) => T[];
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
 * import { A } from "flurp";
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
 */
declare function slice<T>(startIndex?: number, endIndex?: number): (arr: ReadonlyArray<T>) => T[];
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
 * import { A } from "flurp";
 *
 * const split = A.split(3);
 * split([0, 1, 2, 3, 4]);     // [[0, 1, 2], [3, 4]]
 *
 * const splitLast = A.split(-1);
 * splitLast([0, 1, 2, 3, 4]);     // [[0, 1, 2, 3], [4]]
 * ```
 */
declare function split<T>(index: number): (arr: ReadonlyArray<T>) => T[][] | null;
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
 * import { A } from "flurp";
 *
 * const splitFirstAndLastPairs = A/split(2, -2);
 * splitFirstAndLastPairs([0, 1, 2, 3, 4, 5, 6, 7]);    // [[0, 1], [2, 3, 4], [6, 7]]
 * ```
 */
declare function splitMulti<T>(indices: Array<number>): (arr: ReadonlyArray<T>) => T[][] | null;
/**
 * @param arr
 *
 *@example
 * ```ts
 * import { A } from "flurp";
 *
 * A.sum([3, 4, 5]);    // 12
 * ```
 */
declare function sum(arr: ReadonlyArray<number>): number;
/**
 * Applies a transformation to every element before computing the sum
 *
 * @param transformation
 *
 *@example
 * ```ts
 * import { A } from "flurp";
 * import * as N from "flurp/number";
 *
 * const sumOfSquares = A.sumWith(N.pow(2));
 * sumOfSquares([1, 3, 5]);    // 35   (i.e., 1^2 + 3^2 + 5^2)
 * ```
 */
declare function sumWith<T>(transformation: (x: T) => number): (arr: ReadonlyArray<T>) => number;
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
 * import { A } from "flurp";
 *
 * const firstThree = A.take(3);
 * firstThree([10, 20, 30, 40, 50]);    // [10, 20, 30]
 * firstThree([10, 20]);                // []
 * ```
 */
declare function take<T>(count: number): (arr: ReadonlyArray<T>) => T[];
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
 * import { A } from "flurp";
 *
 * const lastThree = A.takeLast(3);
 * lastThree([10, 20, 30, 40, 50]);    // [30, 40, 50]
 * lastThree([10, 20]);                // []
 * ```
 */
declare function takeLast<T>(count: number): (arr: ReadonlyArray<T>) => T[];
/**
 * Returns a new array with duplicate values removed
 *
 * @param arr
 *
 * @example
 * ```ts
 * import { A } from "flurp";
 *
 * A.unique([1, 4, 4, 1, 1, 4]);    // [1, 4]
 * ```
 */
declare function unique<T>(arr: ReadonlyArray<T>): T[];

declare const array_all: typeof all;
declare const array_any: typeof any;
declare const array_aperture: typeof aperture;
declare const array_append: typeof append;
declare const array_concat: typeof concat;
declare const array_count: typeof count;
declare const array_createWith: typeof createWith;
declare const array_drop: typeof drop;
declare const array_dropLast: typeof dropLast;
declare const array_filter: typeof filter;
declare const array_filterWithIndex: typeof filterWithIndex;
declare const array_find: typeof find;
declare const array_findIndex: typeof findIndex;
declare const array_findLast: typeof findLast;
declare const array_findLastIndex: typeof findLastIndex;
declare const array_first: typeof first;
declare const array_flatten: typeof flatten;
declare const array_get: typeof get;
declare const array_includes: typeof includes;
declare const array_insert: typeof insert;
declare const array_isEmpty: typeof isEmpty;
declare const array_join: typeof join;
declare const array_last: typeof last;
declare const array_length: typeof length;
declare const array_map: typeof map;
declare const array_mapWithIndex: typeof mapWithIndex;
declare const array_none: typeof none;
declare const array_prepend: typeof prepend;
declare const array_product: typeof product;
declare const array_reduce: typeof reduce;
declare const array_reduceRight: typeof reduceRight;
declare const array_reduceRightWithIndex: typeof reduceRightWithIndex;
declare const array_reduceWithIndex: typeof reduceWithIndex;
declare const array_reject: typeof reject;
declare const array_remove: typeof remove;
declare const array_reverse: typeof reverse;
declare const array_set: typeof set;
declare const array_slice: typeof slice;
declare const array_split: typeof split;
declare const array_splitMulti: typeof splitMulti;
declare const array_sum: typeof sum;
declare const array_sumWith: typeof sumWith;
declare const array_take: typeof take;
declare const array_takeLast: typeof takeLast;
declare const array_unique: typeof unique;
declare namespace array {
  export {
    array_all as all,
    array_any as any,
    array_aperture as aperture,
    array_append as append,
    array_concat as concat,
    array_count as count,
    array_createWith as createWith,
    array_drop as drop,
    array_dropLast as dropLast,
    array_filter as filter,
    array_filterWithIndex as filterWithIndex,
    array_find as find,
    array_findIndex as findIndex,
    array_findLast as findLast,
    array_findLastIndex as findLastIndex,
    array_first as first,
    array_flatten as flatten,
    array_get as get,
    array_includes as includes,
    array_insert as insert,
    array_isEmpty as isEmpty,
    array_join as join,
    array_last as last,
    array_length as length,
    array_map as map,
    array_mapWithIndex as mapWithIndex,
    array_none as none,
    array_prepend as prepend,
    array_product as product,
    array_reduce as reduce,
    array_reduceRight as reduceRight,
    array_reduceRightWithIndex as reduceRightWithIndex,
    array_reduceWithIndex as reduceWithIndex,
    array_reject as reject,
    array_remove as remove,
    array_reverse as reverse,
    array_set as set,
    array_slice as slice,
    array_split as split,
    array_splitMulti as splitMulti,
    array_sum as sum,
    array_sumWith as sumWith,
    array_take as take,
    array_takeLast as takeLast,
    array_unique as unique,
  };
}

export { mapWithIndex as A, none as B, prepend as C, product as D, reduce as E, reduceRight as F, reduceRightWithIndex as G, reduceWithIndex as H, reject as I, remove as J, reverse as K, set as L, slice as M, split as N, splitMulti as O, sum as P, sumWith as Q, take as R, takeLast as S, unique as T, array as a, all as b, any as c, aperture as d, append as e, concat as f, count as g, createWith as h, drop as i, dropLast as j, filter as k, filterWithIndex as l, find as m, findIndex as n, findLast as o, findLastIndex as p, first as q, flatten as r, get as s, includes as t, insert as u, isEmpty as v, join as w, last as x, length as y, map as z };
