type POJO<T> = Readonly<Record<string, T>>;
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
declare function entries<T>(obj: POJO<T>): [string, T][];
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
declare function filter<T>(condition: (x: T) => boolean): (obj: POJO<T>) => Record<string, T>;
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
declare function filterWithKey<T>(condition: (k: string, v: T) => boolean): (obj: POJO<T>) => Record<string, unknown>;
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
declare function getOr<T, U>(key: string, defaultValue?: U): (obj: POJO<T>) => T | U | undefined;
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
declare function hasKey<T>(key: string): (obj: POJO<T>) => boolean;
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
declare function isEmpty(obj: POJO<unknown>): boolean;
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
declare function keys<T>(obj: POJO<T>): string[];
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
declare function map<T, U>(f: (x: T) => U): (obj: POJO<T>) => Record<string, U>;
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
declare function merge<T, U>(objToMerge: POJO<U>): (obj: POJO<T>) => {
    [x: string]: T | U;
};
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
declare function mergeInto<T, U>(objToMergeInto: POJO<U>): (obj: POJO<T>) => {
    [x: string]: T | U;
};
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
declare function propEquals<T>(key: string, val: T): (obj: POJO<T>) => boolean;
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
declare function propPasses<T>(key: string, condition: (x: T) => boolean): (obj: POJO<T>) => boolean;
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
declare function remove<T>(keys: string | Array<string>): (obj: POJO<T>) => {
    [x: string]: T;
};
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
declare function set<T>(key: string, newVal: T, createIfNotFound?: boolean): (obj: POJO<T>) => {
    [x: string]: T;
};
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
declare function values<T>(obj: POJO<T>): T[];

type pojo_POJO<T> = POJO<T>;
declare const pojo_entries: typeof entries;
declare const pojo_filter: typeof filter;
declare const pojo_filterWithKey: typeof filterWithKey;
declare const pojo_getOr: typeof getOr;
declare const pojo_hasKey: typeof hasKey;
declare const pojo_isEmpty: typeof isEmpty;
declare const pojo_keys: typeof keys;
declare const pojo_map: typeof map;
declare const pojo_merge: typeof merge;
declare const pojo_mergeInto: typeof mergeInto;
declare const pojo_propEquals: typeof propEquals;
declare const pojo_propPasses: typeof propPasses;
declare const pojo_remove: typeof remove;
declare const pojo_set: typeof set;
declare const pojo_values: typeof values;
declare namespace pojo {
  export {
    pojo_POJO as POJO,
    pojo_entries as entries,
    pojo_filter as filter,
    pojo_filterWithKey as filterWithKey,
    pojo_getOr as getOr,
    pojo_hasKey as hasKey,
    pojo_isEmpty as isEmpty,
    pojo_keys as keys,
    pojo_map as map,
    pojo_merge as merge,
    pojo_mergeInto as mergeInto,
    pojo_propEquals as propEquals,
    pojo_propPasses as propPasses,
    pojo_remove as remove,
    pojo_set as set,
    pojo_values as values,
  };
}

export { POJO as P, filterWithKey as a, merge as b, mergeInto as c, propEquals as d, entries as e, filter as f, getOr as g, hasKey as h, isEmpty as i, propPasses as j, keys as k, map as m, pojo as p, remove as r, set as s, values as v };
