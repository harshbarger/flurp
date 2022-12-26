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
 * @param obj
 *
 * @example
 * ```ts
 *import { P } from "flurp";
 *
 * const getEntries = P.entries("x");
 * getEntries({x: 5, y: 10});       // [["x", 5], ["y", 10]]
 * ```
 */
export function entries<T>(obj: POJO<T>) {
  return Object.entries(obj);
}

/**
 * The same concept as `Array.filter()`, but for object values
 *
 * @param condition
 *
 * @example
 * ```ts
 * import { P } from "flurp";
 *
 * const keepPositive = P.filter(N.isPositive);
 * keepPositive({ x: 3, y: -4, z: 5 });     // { x: 3, z: 5 }
 * ```
 */
export function filter<T>(condition: (x: T) => boolean) {
  return function (obj: POJO<T>) {
    const filtered: Record<string, T> = {};
    Object.entries(obj).forEach(([k, v]: [string, T]) => {
      if (condition(v)) {
        filtered[k] = v;
      }
    });
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
 *import { P } from "flurp";
 *
 * const moreThanTwoChars = P.filterWithKey((s: string) => s.length > 2);
 * moreThanTwoChars({ x: 3, yy: -4, zzz: 5 });         // { zzz: 5 }
 *
 * const keyEqualsValue = P.filterWithKey((k: string, v: string) => k === v);
 * keyEqualsValue({ x: "x", y: "weasel", z: "z" })   // { x: "x", z: "z" }
 * ```
 */
export function filterWithKey<T>(condition: (k: string, v: T) => boolean) {
  return function (obj: POJO<T>) {
    const filtered: Record<string, unknown> = {};
    Object.entries(obj).forEach(([k, v]: [string, T]) => {
      if (condition(k, v)) {
        filtered[k] = v;
      }
    });
    return filtered;
  };
}

/**
 * @param key
 * @param defaultValue
 *
 * @example
 * ```ts
 * import { P } from "flurp";
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
export function getOr<T, U>(key: string, defaultValue?: U) {
  return function (obj: POJO<T>) {
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
 * import { P } from "flurp";
 *
 * const hasX = P.hasKey("x");
 * hasX({x: 5});       // true
 * hasX({y: 2});       // false
 * ```
 */
export function hasKey<T>(key: string) {
  return function (obj: POJO<T>) {
    return obj !== null && key in obj;
  };
}

/**
 * @param obj
 *
 * @example
 * ```ts
 * import { P } from "flurp";
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
 * import { P } from "flurp";
 *
 * P.keys({x: 3, y: 4, x: 5});      // ["x", "y", "z"]
 * ```
 */
export function keys<T>(obj: POJO<T>) {
  return Object.keys(obj);
}

/**
 * The same concept as `Array.map()`, but for object values.
 *
 * @param f
 *
 * @example
 * ```ts
 * import { P } from "flurp";
 *
 * const multiplyByTen = P.map(N.multiply(10));
 * multiplyByTen({ x: 3, y: 4 });   // { x: 30, y: 40 }
 * ```
 *
 */
export function map<T, U>(f: (x: T) => U) {
  return function (obj: POJO<T>) {
    const mapped: Record<string, U> = {};

    Object.entries(obj).forEach(([k, v]: [string, T]) => {
      mapped[k] = f(v);
    });

    return mapped;
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
 * import { P } from "flurp";
 *
 * const mergeX = P.merge({ x: 2 });
 * mergeX({ y: 5 });           // { x: 2, y: 5 }
 * mergeX({ x: 3, y: 5 });     // { x: 2, y: 5 }
 * ```
 */
export function merge<T, U>(objToMerge: POJO<U>) {
  return (obj: POJO<T>) => ({ ...obj, ...objToMerge });
}

/**
 * Shallowly merges an object into 'objToMergeInto`, overriding the
 * properties of `objToMergeInto` in case of conflict.
 *
 * @param objToMergeInto
 *
 * @example
 * ```ts
 * import { P } from "flurp";
 *
 * const mergeIntoXZ = P.mergeInto({ x: 2, z: 4 });
 * mergeIntoXZ({ x: 3, y: 5 });     // { x: 3, y: 5, z: 4 }
 * ```
 */
export function mergeInto<T, U>(objToMergeInto: POJO<U>) {
  return (obj: POJO<T>) => ({ ...objToMergeInto, ...obj });
}

/**
 * @param key
 * @param val
 *
 * @example
 * ```ts
 * import { P } from "flurp";
 *
 * const xIsFive = P.propEquals("x", 5);
 * xIsFive({ x: 5, y: 3 });      // true
 * xIsFive({ x: 3, y: 5 });      // false
 * xIsFive({ y: 5 });            // false
 * ```
 */
export function propEquals<T>(key: string, val: T) {
  return (obj: POJO<T>) => obj[key] === val;
}

/**
 * @remarks
 * Will return true for a non-existent key if `undefined` passes `condition`.
 *
 * @param key
 * @param condition
 *
 * @example
 * ```ts
 * import { G, N, O } from "flurp";
 *
 * const xIsPositive = P.propPasses("x", N.isPositive);
 * xIsPositive(f({ x: 5, y: 3 });      // true
 * xIsPositive(f({ x: -5, y: 3 });     // false
 * xIsPositive(f({ y: 5 });            // false
 *
 * const xIsUndefined = P.propPasses("x", G.isUndefined);
 * xIsUndefined(f{ y: 5 });             // true
 * ```
 */
export function propPasses<T>(key: string, condition: (x: T) => boolean) {
  return (obj: POJO<T>) => condition(obj[key]);
}

/**
 * @param keys
 *
 * @example
 * ```ts
 * import { P } from "flurp";
 *
 * const removeX = P.remove("x");
 * removeX({x: 3, y: 4, z: 5});    // {y: 4, z: 5}
 *
 * const removeXAndY = P.remove(["x", "y"]);
 * removeXAnyY({x: 3, y: 4, z: 5});    // {z: 5}
 * ```
 */
export function remove<T>(keys: string | Array<string>) {
  if (typeof keys === "string") {
    return function (obj: POJO<T>) {
      const copy = { ...obj };
      delete copy[keys];
      return copy;
    };
  }

  return function (obj: POJO<T>) {
    const copy = { ...obj };
    keys.forEach((key) => delete copy[key]);
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
 * import { P } from "flurp";
 *
 * const setX = P.set("x", 5);
 * setX({x: 3});              // {x: 5}
 * setX({y: 3});              // {x: 5, y: 3}
 *
 * const setXIfExists = P.set("x", 5, false);
 * setXIfExists({y: 3});      // {y: 3}
 * ```
 */
export function set<T>(key: string, newVal: T, createIfNotFound = true) {
  return function (obj: POJO<T>) {
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
 * import { P } from "flurp";
 *
 * P.values({x: 3, y: 4, x: 5});      // [3, 4, 5]
 * ```
 */
export function values<T>(obj: POJO<T>) {
  return Object.values(obj);
}
