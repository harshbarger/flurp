export type POJO<T> = Readonly<Record<string, T>>;

/**
 * @internal
 * @param obj
 * @param key
 */
function isKeyOf<T extends POJO<unknown>>(
  obj: T,
  key: string
): key is keyof T & string {
  return obj !== null && key in obj;
}

/**
 * @param condition
 *
 * @example
 * ```ts
 * import * as P from "flurp/pojo";
 * import * as N from "flurp/number";
 *
 * const allPositive = P.allPropsSatisfy<Record<string, number>>(N.isPositive);
 * allPositive({ x: 3, y: 4, z: 5 });         // true
 * allPositive({ x: 3, y: -4, z: 5 });        // false
 * ```
 */
export function allPropsSatisfy<T extends POJO<unknown>>(
  condition: (x: T[keyof T]) => boolean
) {
  return (obj: T) =>
    Object.keys(obj).every((k) => condition(obj[k as keyof T]));
}

/**
 * @param condition
 *
 * @example
 * ```ts
 * import * as P from "flurp/pojo";
 * import * as N from "flurp/number";
 *
 * const anyPositive = P.anyPropSatisfies<Record<string, number>>(N.isPositive);
 * anyPositive({ x: -3, y: -4, z: 5 });         // true
 * anyPositive({ x: -3, y: -4, z: -5 });        // false
 * ```
 */
export function anyPropSatisfies<T extends POJO<unknown>>(
  condition: (x: T[keyof T]) => boolean
) {
  return (obj: T) => Object.keys(obj).some((k) => condition(obj[k as keyof T]));
}

/**
 * @param obj
 *
 * @example
 * ```ts
 * import * as P from "flurp/pojo";
 *
 * const getEntries = P.entries("x");
 * getEntries({x: 5, y: 10});       // [["x", 5], ["y", 10]]
 * ```
 */
export function entries<T extends POJO<unknown>>(obj: T) {
  return Object.entries(obj);
}

/**
 * The same concept as `Array.filter()`, but for object values
 *
 * @param condition
 *
 * @example
 * ```ts
 * import * as P from "flurp/pojo";
 *
 * const keepPositive = P.filter<Record<string, number>>(N.isPositive);
 * keepPositive({ x: 3, y: -4, z: 5 });     // { x: 3, z: 5 }
 * ```
 */
export function filter<T extends POJO<unknown>>(
  condition: (x: T[keyof T]) => boolean
) {
  return function (obj: T) {
    const filtered: Record<string, T[keyof T]> = {};

    for (const k of Object.keys(obj)) {
      const v = obj[k] as T[keyof T];
      if (condition(v)) {
        filtered[k] = v;
      }
    }

    return filtered;
  };
}

/**
 * The same concept as `Array.filter()`, but for object keys
 *
 * @param condition
 *
 * @example
 * ```ts
 * import * as P from "flurp/pojo";
 *
 * const moreThanTwoChars = P.filterWithKey<Record<string, string>>((s: string) => s.length > 2);
 * moreThanTwoChars({ x: 3, yy: -4, zzz: 5 });         // { zzz: 5 }
 *
 * const keyEqualsValue = P.filterWithKey<Record<string, string>>((k: string, v: string) => k === v);
 * keyEqualsValue({ x: "x", y: "weasel", z: "z" })   // { x: "x", z: "z" }
 * ```
 */
export function filterWithKey<T extends POJO<unknown>>(
  condition: (k: string, v: T[keyof T]) => boolean
) {
  return function (obj: T) {
    const filtered: Record<string, unknown> = {};
    for (const k of Object.keys(obj)) {
      const v = obj[k] as T[keyof T];
      if (condition(k, v)) {
        filtered[k] = v;
      }
    }

    return filtered;
  };
}

/**
 * Builds an object from a `spec` object whose values are transformations
 * of the argument
 *
 * @param spec
 *
 * @example
 * ```ts
 * import * as P from "flurp/pojo";
 * import * as A from "flurp/array";
 *
 * const ends = P.fromSpec({
 *   first: A.first,
 *   last: A.last,
 * });
 *
 * ends([3, 4, 5, 6]);    // { first: 3, last: 6 }
 * ```
 */
export function fromSpec<T>(spec: Record<string, (x: T) => unknown>) {
  return function (x: T) {
    const keys = Object.keys(spec);
    return Object.fromEntries(keys.map((k) => [k, spec[k](x)]));
  };
}

/**
 * @param key
 * @param defaultValue
 *
 * @example
 * ```ts
 * import * as P from "flurp/pojo";
 *
 * const getX = P.getOr("x");
 * getX({x: 5});       // 5
 *
 * const getYOrTen = P.getOr("y", 10);
 * getY({x: 5});       // 10
 *
 * const getY = P.getOr("y");
 * getY({x: 5});       // undefined
 * ```
 */
export function getOr<T extends POJO<unknown>, U>(
  key: string,
  defaultValue?: U
) {
  return function (obj: T) {
    if (isKeyOf(obj, key)) {
      return obj[key];
    }

    return defaultValue;
  };
}

/**
 * @param key
 *
 * @example
 * ```ts
 * import * as P from "flurp/pojo";
 *
 * const hasX = P.hasKey("x");
 * hasX({x: 5});       // true
 * hasX({y: 2});       // false
 * ```
 */
export function hasKey<T extends POJO<unknown>>(key: string) {
  return function (obj: T) {
    return obj !== null && key in obj;
  };
}

/**
 * @param obj
 *
 * @example
 * ```ts
 * import * as P from "flurp/pojo";
 *
 * P.isEmpty({});           // true
 * P.isEmpty({x: 4});       // false
 * ```
 */
export function isEmpty(obj: POJO<unknown>) {
  return Object.keys(obj).length === 0;
}

/**
 * @param obj
 *
 * @example
 * ```ts
 * import * as P from "flurp/pojo";
 *
 * P.keys({x: 3, y: 4, x: 5});      // ["x", "y", "z"]
 * ```
 */
export function keys(obj: POJO<unknown>) {
  return Object.keys(obj);
}

/**
 * The same concept as `Array.map()`, but for object values.
 *
 * @param transform
 *
 * @example
 * ```ts
 * import * as P from "flurp/pojo";
 *
 * const multiplyByTen = P.map<Record<string, number>>(N.multiply(10));
 * multiplyByTen({ x: 3, y: 4 });   // { x: 30, y: 40 }
 * ```
 */
export function map<T extends POJO<unknown>>(
  transform: (x: T[keyof T]) => unknown
) {
  return function (obj: T) {
    const keys = Object.keys(obj) as Array<keyof T>;

    return Object.fromEntries(keys.map((k) => [k, transform(obj[k])]));
  };
}

/**
 * The same concept as `Array.mapWithIndex()`, but for object values and keys.
 *
 * @param transform
 *
 * @example
 * ```ts
 * import * as P from "flurp/pojo";
 *
 * const obj = { x: 10, y: 20 };
 * const multiplyByObjValue = P.mapWithKey<{ x: number; y: number }>((v, k) => v * obj[k]);
 * multiplyByObjValue({ x: 3, y: 4 });   // { x: 30, y: 80 }
 * ```
 */

export function mapWithKey<T extends POJO<unknown>>(
  transform: (x: T[keyof T], k: keyof T) => unknown
) {
  return function (obj: T) {
    const keys = Object.keys(obj) as Array<keyof T>;

    return Object.fromEntries(keys.map((k) => [k, transform(obj[k], k)]));
  };
}

/**
 * Shallowly merges 'objToMerge` into another object, overriding the
 * properties of the other object in case of conflict.
 *
 * @param objToMerge
 *
 * @example
 * ```ts
 * import * as P from "flurp/pojo";
 *
 * const mergeX = P.merge({ x: 2 });
 * mergeX({ y: 5 });           // { x: 2, y: 5 }
 * mergeX({ x: 3, y: 5 });     // { x: 2, y: 5 }
 * ```
 */
export function merge<T extends POJO<unknown>, U extends POJO<unknown>>(
  objToMerge: U
) {
  return (obj: T) => ({ ...obj, ...objToMerge });
}

/**
 * Shallowly merges an object into 'objToMergeInto`, overriding the
 * properties of `objToMergeInto` in case of conflict.
 *
 * @param objToMergeInto
 *
 * @example
 * ```ts
 * import * as P from "flurp/pojo";
 *
 * const mergeIntoXZ = P.mergeInto({ x: 2, z: 4 });
 * mergeIntoXZ({ x: 3, y: 5 });     // { x: 3, y: 5, z: 4 }
 * ```
 */
export function mergeInto<T extends POJO<unknown>, U extends POJO<unknown>>(
  objToMergeInto: U
) {
  return (obj: T) => ({ ...objToMergeInto, ...obj });
}

/**
 * @param condition
 *
 * @example
 * ```ts
 * import * as P from "flurp/pojo";
 * import * as N from "flurp/number";
 *
 * const nonePositive = P.noPropSatisfies<Record<string, number>>(N.isPositive);
 * nonePositive({ x: -3, y: -4, z: -5 });         // true
 * nonePositive({ x: -3, y: -4, z: 5 });          // false
 * ```
 */
export function noPropSatisfies<T extends POJO<unknown>>(
  condition: (x: T[keyof T]) => boolean
) {
  return (obj: T) =>
    !Object.keys(obj).some((k) => condition(obj[k as keyof T]));
}

/**
 * @param keys
 *
 * @example
 * ```ts
 * import * as P from "flurp/pojo";
 *
 * const justXY = P.pick(["x", "Y"], 0);
 * justXY({ x: 3, y: 4, z: 5 });    // { x: 3, y: 4 }
 * ```
 */
export function pick<T extends POJO<unknown>>(keys: Array<keyof T>) {
  return (obj: T) => Object.fromEntries(keys.map((k) => [k, obj[k]]));
}

/**
 * @param key
 * @param val
 *
 * @example
 * ```ts
 * import * as P from "flurp/pojo";
 *
 * const xIsFive = P.propEquals("x", 5);
 * xIsFive({ x: 5, y: 3 });      // true
 * xIsFive({ x: 3, y: 5 });      // false
 * xIsFive({ y: 5 });            // false
 * ```
 */
export function propEquals<T extends POJO<unknown>>(
  key: string,
  val: T[keyof T]
) {
  return (obj: T) => obj[key] === val;
}

/**
 * @param key
 * @param condition
 *
 * @example
 * ```ts
 * import * as P from "flurp/pojo";
 * import * as N from "flurp/number";
 *
 * const xIsPositive = P.propSatisfies<Record<string, number>>("x", N.isPositive);
 * xIsPositive(f({ x: 5, y: 3 });      // true
 * xIsPositive(f({ x: -5, y: 3 });     // false
 * xIsPositive(f({ y: 5 });            // false
 * ```
 */
export function propSatisfies<T extends POJO<unknown>>(
  key: keyof T,
  condition: (x: T[keyof T]) => boolean
) {
  return (obj: T) => condition(obj[key]);
}

/**
 * Given `obj` in which the values are themselves POJOs, restructures the object so that the first level keys
 * become the second level keys and vice versa.
 *
 * @remarks
 * All objects that are values of `obj` must have the same set of keys.
 *
 * @param obj
 *
 * @example
 * ```ts
 * import * as P from "flurp/pojo";
 *
 * const nested = {
 *   x: {a: 1, b: 2},
 *   y: {a: 3, b: 4},
 *   z: {a: 5, b: 6},
 * };
 *
 * P.regroup(nested);  // { a: {x: 1, y: 3, z: 5}, b: {x: 2, y: 4, z: 6} }
 * ```
 */
export function regroup<T extends POJO<unknown>, U extends Record<string, T>>(
  obj: U
) {
  const firstLevelKeys = Object.keys(obj);
  const secondLevelKeys = Object.keys(obj[firstLevelKeys[0]]);
  return Object.fromEntries(
    secondLevelKeys.map((k2) => [
      k2,
      Object.fromEntries(firstLevelKeys.map((k1) => [k1, obj[k1][k2]])),
    ])
  );
}

/**
 * @param keys
 *
 * @example
 * ```ts
 * import * as P from "flurp/pojo";
 *
 * const removeX = P.remove<Record<string, number>>("x");
 * removeX({x: 3, y: 4, z: 5});    // {y: 4, z: 5}
 *
 * const removeXAndY = P.remove<Record<string, number>>(["x", "y"]);
 * removeXAnyY({x: 3, y: 4, z: 5});    // {z: 5}
 * ```
 */
export function remove<T extends POJO<unknown>>(
  keys: keyof T | Array<keyof T>
) {
  if (Array.isArray(keys)) {
    return function (obj: T) {
      const copy = { ...obj };
      for (const k of keys) {
        delete copy[k];
      }
      return copy;
    };
  }

  return function (obj: T) {
    const copy = { ...obj };
    delete copy[keys];
    return copy;
  };
}

/**
 *
 * @param key
 * @param newVal
 * @param createIfNotFound
 *
 *@example
 * ```ts
 * import * as P from "flurp/pojo";
 *
 * const setX = P.set("x", 5);
 * setX({x: 3});              // {x: 5}
 * setX({y: 3});              // {x: 5, y: 3}
 *
 * const setXIfExists = P.set("x", 5, false);
 * setXIfExists({y: 3});      // {y: 3}
 * ```
 */
export function set<T extends POJO<unknown>>(
  key: string,
  newVal: T[keyof T],
  createIfNotFound = true
) {
  return function (obj: T) {
    if (isKeyOf(obj, key) || createIfNotFound) {
      return { ...obj, [key]: newVal };
    }

    return { ...obj };
  };
}

/**
 * @param obj
 *
 * @example
 * ```ts
 * import * as P from "flurp/pojo";
 *
 * P.values({x: 3, y: 4, x: 5});      // [3, 4, 5]
 * ```
 */
export function values<T extends POJO<unknown>>(obj: T) {
  return Object.values(obj);
}
