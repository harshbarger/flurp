"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all2) => {
  for (var name in all2)
    __defProp(target, name, { get: all2[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  A: () => array_exports,
  G: () => guards_exports,
  L: () => logic_exports,
  N: () => number_exports,
  P: () => pojo_exports,
  R: () => result_exports,
  S: () => string_exports,
  flow: () => flow,
  pipe: () => pipe,
  tap: () => tap
});
module.exports = __toCommonJS(src_exports);

// src/pipe.ts
function flow() {
  const fs = arguments;
  return function() {
    let x = fs[0](...arguments);
    const len = fs.length;
    for (let i = 1; i < len; i++) {
      x = fs[i](x);
    }
    return x;
  };
}
function pipe() {
  let x = arguments[0];
  const len = arguments.length - 1;
  const fs = Array.prototype.slice.call(arguments, 1);
  for (let i = 0; i < len; i++) {
    x = fs[i](x);
  }
  return x;
}
function tap(sideEffect) {
  return function(val) {
    sideEffect(val);
    return val;
  };
}

// src/array.ts
var array_exports = {};
__export(array_exports, {
  all: () => all,
  any: () => any,
  aperture: () => aperture,
  append: () => append,
  concat: () => concat,
  count: () => count,
  createWith: () => createWith,
  drop: () => drop,
  dropLast: () => dropLast,
  filter: () => filter,
  filterWithIndex: () => filterWithIndex,
  find: () => find,
  findIndex: () => findIndex,
  findLast: () => findLast,
  findLastIndex: () => findLastIndex,
  first: () => first,
  flatten: () => flatten,
  get: () => get,
  includes: () => includes,
  insert: () => insert,
  isEmpty: () => isEmpty,
  join: () => join,
  last: () => last,
  length: () => length,
  map: () => map,
  mapWithIndex: () => mapWithIndex,
  none: () => none,
  prepend: () => prepend,
  product: () => product,
  reduce: () => reduce,
  reduceRight: () => reduceRight,
  reduceRightWithIndex: () => reduceRightWithIndex,
  reduceWithIndex: () => reduceWithIndex,
  reject: () => reject,
  remove: () => remove,
  reverse: () => reverse,
  set: () => set,
  slice: () => slice,
  split: () => split,
  splitMulti: () => splitMulti,
  sum: () => sum,
  sumWith: () => sumWith,
  take: () => take,
  takeLast: () => takeLast,
  unique: () => unique
});
function adjIndex(arr, i) {
  if (i >= arr.length || i < -arr.length || !Number.isInteger(i)) {
    return null;
  }
  return i >= 0 ? i : arr.length + i;
}
function all(condition) {
  return function(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      if (!condition(arr[i])) {
        return false;
      }
    }
    return true;
  };
}
function any(condition) {
  return function(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      if (condition(arr[i])) {
        return true;
      }
    }
    return false;
  };
}
function aperture(size) {
  if (!Number.isInteger(size)) {
    return (_) => [];
  }
  return function(arr) {
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
function append(elems) {
  if (Array.isArray(elems)) {
    return (arr) => [...arr, ...elems];
  }
  return (arr) => [...arr, elems];
}
function concat(arrays) {
  if (arrays.length === 0) {
    return [];
  }
  return arrays[0].concat(...arrays.slice(1));
}
function count(condition) {
  return (arr) => arr.reduce((acc, next) => condition(next) ? acc + 1 : acc, 0);
}
function createWith(length3, f, maxLength = 1e4) {
  if (!Number.isInteger(length3) || length3 > maxLength || length3 < 0) {
    return null;
  }
  const result = new Array(length3);
  for (let i = 0; i < length3; i++) {
    result[i] = f(i);
  }
  return result;
}
function drop(count2) {
  if (!Number.isInteger(count2) || count2 <= 0) {
    return (_) => [];
  }
  return (arr) => arr.slice(count2);
}
function dropLast(count2) {
  if (!Number.isInteger(count2) || count2 <= 0) {
    return (_) => [];
  }
  return (arr) => arr.slice(0, -count2);
}
function filter(condition) {
  return (arr) => arr.filter(condition);
}
function filterWithIndex(condition) {
  return (arr) => arr.filter((x, i) => condition(i, x));
}
function find(condition) {
  return (arr) => arr.find(condition);
}
function findIndex(condition) {
  return function(arr) {
    const idx = arr.findIndex(condition);
    return idx >= 0 ? idx : void 0;
  };
}
function findLast(condition) {
  return function(arr) {
    let i = arr.length - 1;
    while (i >= 0) {
      if (condition(arr[i])) {
        return arr[i];
      }
      i--;
    }
    return void 0;
  };
}
function findLastIndex(condition) {
  return function(arr) {
    let i = arr.length - 1;
    while (i >= 0) {
      if (condition(arr[i])) {
        return i;
      }
      i--;
    }
    return void 0;
  };
}
function first(arr) {
  return arr.length > 0 ? arr[0] : void 0;
}
function flatten(levels = 1) {
  return (arr) => arr.flat(levels);
}
function get(index) {
  return function(arr) {
    const idx = adjIndex(arr, index);
    return typeof idx === "number" ? arr[idx] : void 0;
  };
}
function includes(elem) {
  return (arr) => arr.includes(elem);
}
function insert(index, elems) {
  const toInsert = Array.isArray(elems) ? elems : [elems];
  return function(arr) {
    if (typeof adjIndex(arr, index) === "number") {
      const [before, after] = split(index)(arr);
      return [...before, ...toInsert, ...after];
    }
    if (index === arr.length) {
      return [...arr, ...toInsert];
    }
    return [...arr];
  };
}
function isEmpty(arr) {
  return arr.length === 0;
}
function join(separator = "") {
  return (arr) => arr.join(separator);
}
function last(arr) {
  return arr.length > 0 ? arr.at(-1) : void 0;
}
function length(arr) {
  return arr.length;
}
function map(transform) {
  return (arr) => arr.map(transform);
}
function mapWithIndex(transform) {
  return (arr) => arr.map((x, i) => transform(i, x));
}
function none(condition) {
  return function(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      if (condition(arr[i])) {
        return false;
      }
    }
    return true;
  };
}
function prepend(elems) {
  if (Array.isArray(elems)) {
    return (arr) => [...elems, ...arr];
  }
  return (arr) => [elems, ...arr];
}
function product(arr) {
  return arr.length > 0 ? arr.reduce((acc, next) => next * acc) : void 0;
}
function reduce(accumulator, initial) {
  return initial === void 0 ? (arr) => arr.reduce(accumulator) : (arr) => arr.reduce(accumulator, initial);
}
function reduceRight(accumulator, initial) {
  return initial === void 0 ? (arr) => arr.reduceRight(accumulator) : (arr) => arr.reduceRight(accumulator, initial);
}
function reduceRightWithIndex(accumulator, initial) {
  return initial === void 0 ? (arr) => arr.reduceRight(accumulator) : (arr) => arr.reduceRight(accumulator, initial);
}
function reduceWithIndex(accumulator, initial) {
  return initial === void 0 ? (arr) => arr.reduce(accumulator) : (arr) => arr.reduce(accumulator, initial);
}
function reject(condition) {
  return (arr) => arr.filter((x) => !condition(x));
}
function remove(startIndex, endIndex) {
  if (!Number.isInteger(startIndex) || typeof endIndex === "number" && !Number.isInteger(startIndex)) {
    return (arr) => [...arr];
  }
  if (endIndex === void 0) {
    return (arr) => [
      ...arr.slice(0, startIndex),
      ...arr.slice(startIndex + 1)
    ];
  }
  return (arr) => [
    ...arr.slice(0, startIndex),
    ...arr.slice(endIndex)
  ];
}
function reverse(arr) {
  return [...arr].reverse();
}
function set(index, newVal) {
  return function(arr) {
    const copy = [...arr];
    const idx = adjIndex(arr, index);
    if (typeof idx === "number") {
      copy[idx] = newVal;
    }
    return copy;
  };
}
function slice(startIndex, endIndex) {
  if (typeof startIndex === "number" && !Number.isInteger(startIndex) || typeof endIndex === "number" && !Number.isInteger(startIndex)) {
    return (_) => [];
  }
  return (arr) => arr.slice(startIndex, endIndex);
}
function split(index) {
  return function(arr) {
    if (!Number.isInteger(index)) {
      return null;
    }
    return [arr.slice(0, index), arr.slice(index)];
  };
}
function splitMulti(indices) {
  return function(arr) {
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
function sum(arr) {
  return arr.reduce((acc, next) => next + acc, 0);
}
function sumWith(transformation) {
  return (arr) => arr.reduce((acc, next) => transformation(next) + acc, 0);
}
function take(count2) {
  if (!Number.isInteger(count2) || count2 <= 0) {
    return (_) => [];
  }
  return (arr) => count2 <= arr.length ? arr.slice(0, count2) : [];
}
function takeLast(count2) {
  if (!Number.isInteger(count2) || count2 <= 0) {
    return (_) => [];
  }
  return (arr) => count2 <= arr.length ? arr.slice(-count2) : [];
}
function unique(arr) {
  return [...new Set(arr)];
}

// src/guards.ts
var guards_exports = {};
__export(guards_exports, {
  isArray: () => isArray,
  isBoolean: () => isBoolean,
  isFunction: () => isFunction,
  isNotNullish: () => isNotNullish,
  isNull: () => isNull,
  isNullish: () => isNullish,
  isNumber: () => isNumber,
  isPOJO: () => isPOJO,
  isString: () => isString,
  isUndefined: () => isUndefined
});
function isArray(x) {
  return Array.isArray(x);
}
function isBoolean(x) {
  return typeof x === "boolean";
}
function isFunction(x) {
  return typeof x === "function";
}
function isNotNullish(x) {
  return !(x === null || x === void 0);
}
function isNull(x) {
  return x === null;
}
function isNullish(x) {
  return x === null || x === void 0;
}
function isNumber(x) {
  return typeof x === "number";
}
function isPOJO(x) {
  return x?.constructor === Object;
}
function isString(x) {
  return typeof x === "string";
}
function isUndefined(x) {
  return x === void 0;
}

// src/logic.ts
var logic_exports = {};
__export(logic_exports, {
  FALSE: () => FALSE,
  TRUE: () => TRUE,
  allFail: () => allFail,
  allPass: () => allPass,
  always: () => always,
  anyFail: () => anyFail,
  anyPass: () => anyPass,
  both: () => both,
  branch: () => branch,
  either: () => either,
  equals: () => equals,
  identity: () => identity,
  ifElse: () => ifElse,
  isIncludedIn: () => isIncludedIn,
  neither: () => neither,
  not: () => not,
  nullishTo: () => nullishTo,
  unless: () => unless,
  when: () => when
});
function allPass(...conditions) {
  return (a) => conditions.every((f) => f(a));
}
function allFail(...conditions) {
  return (a) => conditions.every((f) => !f(a));
}
function always(val) {
  return (_) => val;
}
function anyFail(...conditions) {
  return (a) => conditions.some((f) => !f(a));
}
function anyPass(...conditions) {
  return (a) => conditions.some((f) => f(a));
}
function both(condition1, condition2) {
  return (a) => condition1(a) && condition2(a);
}
function branch(...args) {
  return function(x) {
    let i = 0;
    const len = args.length;
    while (i < len) {
      const [cond, f] = args[i];
      if (cond(x)) {
        return f(x);
      }
      i++;
    }
    return null;
  };
}
function either(condition1, condition2) {
  return (a) => condition1(a) || condition2(a);
}
function equals(val) {
  return (a) => a === val;
}
function FALSE(_) {
  return false;
}
function identity(a) {
  return a;
}
function ifElse(condition, transformIfTrue, transformIfFalse) {
  return (a) => condition(a) ? transformIfTrue(a) : transformIfFalse(a);
}
function isIncludedIn(arr) {
  return (x) => arr.includes(x);
}
function neither(condition1, condition2) {
  return (a) => !condition1(a) && !condition2(a);
}
function not(f) {
  return (...args) => !f(...args);
}
function nullishTo(val) {
  return (a) => a === null || a === void 0 ? val : a;
}
function TRUE(_) {
  return true;
}
function unless(condition, f) {
  return (a) => condition(a) ? a : f(a);
}
function when(condition, f) {
  return (a) => condition(a) ? f(a) : a;
}

// src/number.ts
var number_exports = {};
__export(number_exports, {
  add: () => add,
  clamp: () => clamp,
  divide: () => divide,
  divideInto: () => divideInto,
  isBetween: () => isBetween,
  isCloseTo: () => isCloseTo,
  isEven: () => isEven,
  isGt: () => isGt,
  isGte: () => isGte,
  isLt: () => isLt,
  isLte: () => isLte,
  isNegative: () => isNegative,
  isNonNegative: () => isNonNegative,
  isOdd: () => isOdd,
  isPositive: () => isPositive,
  mathModulo: () => mathModulo,
  modulo: () => modulo,
  multiply: () => multiply,
  nthRoot: () => nthRoot,
  pow: () => pow,
  round: () => round,
  subtract: () => subtract,
  subtractFrom: () => subtractFrom
});
function add(y) {
  return (x) => x + y;
}
function clamp(min, max) {
  return (x) => Math.max(min, Math.min(x, max));
}
function divide(y) {
  return (x) => x / y;
}
function divideInto(y) {
  return (x) => y / x;
}
function isBetween(min, max) {
  return (x) => x >= min && x <= max;
}
function isCloseTo(y, tolerance = 1e-15) {
  return (x) => Math.abs(y - x) <= tolerance;
}
function isEven(x) {
  return x % 2 === 0;
}
function isGt(y) {
  return (x) => x > y;
}
function isGte(y) {
  return (x) => x >= y;
}
function isLt(y) {
  return (x) => x < y;
}
function isLte(y) {
  return (x) => x <= y;
}
function isNegative(x) {
  return x < 0;
}
function isNonNegative(x) {
  return x >= 0;
}
function isOdd(x) {
  return Math.abs(x % 2) === 1;
}
function isPositive(x) {
  return x > 0;
}
function mathModulo(y) {
  return (x) => x - y * Math.floor(x / y);
}
function modulo(y) {
  return (x) => x % y;
}
function multiply(y) {
  return (x) => x * y;
}
function nthRoot(root) {
  return (x) => Math.pow(Math.abs(x), 1 / root) * Math.sign(x);
}
function pow(exponent) {
  return (x) => Math.pow(x, exponent);
}
function round(places = 0) {
  const factor = 10 ** -places;
  return (x) => Math.round(x / factor) * factor;
}
function subtract(y) {
  return (x) => x - y;
}
function subtractFrom(y) {
  return (x) => y - x;
}

// src/pojo.ts
var pojo_exports = {};
__export(pojo_exports, {
  entries: () => entries,
  filter: () => filter2,
  filterWithKey: () => filterWithKey,
  getOr: () => getOr,
  hasKey: () => hasKey,
  isEmpty: () => isEmpty2,
  keys: () => keys,
  map: () => map2,
  merge: () => merge,
  mergeInto: () => mergeInto,
  propEquals: () => propEquals,
  propPasses: () => propPasses,
  remove: () => remove2,
  set: () => set2,
  values: () => values
});
function isKeyOf(obj, key) {
  return obj !== null && key in obj;
}
function entries(obj) {
  return Object.entries(obj);
}
function filter2(condition) {
  return function(obj) {
    const filtered = {};
    Object.entries(obj).forEach(([k, v]) => {
      if (condition(v)) {
        filtered[k] = v;
      }
    });
    return filtered;
  };
}
function filterWithKey(condition) {
  return function(obj) {
    const filtered = {};
    Object.entries(obj).forEach(([k, v]) => {
      if (condition(k, v)) {
        filtered[k] = v;
      }
    });
    return filtered;
  };
}
function getOr(key, defaultValue) {
  return function(obj) {
    if (isKeyOf(obj, key)) {
      return obj[key];
    }
    return defaultValue;
  };
}
function hasKey(key) {
  return function(obj) {
    return obj !== null && key in obj;
  };
}
function isEmpty2(obj) {
  return Object.keys(obj).length === 0;
}
function keys(obj) {
  return Object.keys(obj);
}
function map2(f) {
  return function(obj) {
    const mapped = {};
    Object.entries(obj).forEach(([k, v]) => {
      mapped[k] = f(v);
    });
    return mapped;
  };
}
function merge(objToMerge) {
  return (obj) => ({ ...obj, ...objToMerge });
}
function mergeInto(objToMergeInto) {
  return (obj) => ({ ...objToMergeInto, ...obj });
}
function propEquals(key, val) {
  return (obj) => obj[key] === val;
}
function propPasses(key, condition) {
  return (obj) => condition(obj[key]);
}
function remove2(keys2) {
  if (typeof keys2 === "string") {
    return function(obj) {
      const copy = { ...obj };
      delete copy[keys2];
      return copy;
    };
  }
  return function(obj) {
    const copy = { ...obj };
    keys2.forEach((key) => delete copy[key]);
    return copy;
  };
}
function set2(key, newVal, createIfNotFound = true) {
  return function(obj) {
    if (isKeyOf(obj, key) || createIfNotFound) {
      return { ...obj, [key]: newVal };
    }
    return { ...obj };
  };
}
function values(obj) {
  return Object.values(obj);
}

// src/result.ts
var result_exports = {};
__export(result_exports, {
  catchAsNull: () => catchAsNull,
  isNull: () => isNull2,
  isUndefined: () => isUndefined2,
  map: () => map3,
  nullTo: () => nullTo,
  toNullIf: () => toNullIf,
  toUndefinedIf: () => toUndefinedIf,
  undefinedTo: () => undefinedTo
});
function catchAsNull(transform) {
  return function(val) {
    if (val === null || val === void 0) {
      return val;
    }
    try {
      return transform(val);
    } catch {
      return null;
    }
  };
}
function isNull2(val) {
  return val === null;
}
function isUndefined2(val) {
  return val === void 0;
}
function map3(transform) {
  return (val) => val === null || val === void 0 ? val : transform(val);
}
function nullTo(newVal) {
  return (val) => val === null ? newVal : val;
}
function toNullIf(condition) {
  return function(val) {
    if (val === null || val === void 0) {
      return val;
    }
    return condition(val) ? null : val;
  };
}
function toUndefinedIf(condition) {
  return function(val) {
    if (val === null || val === void 0) {
      return val;
    }
    return condition(val) ? void 0 : val;
  };
}
function undefinedTo(newVal) {
  return (val) => val === void 0 ? newVal : val;
}

// src/string.ts
var string_exports = {};
__export(string_exports, {
  append: () => append2,
  at: () => at,
  concat: () => concat2,
  endsWith: () => endsWith,
  includes: () => includes2,
  includesRegex: () => includesRegex,
  insert: () => insert2,
  length: () => length2,
  matchGroups: () => matchGroups,
  matchGroupsAll: () => matchGroupsAll,
  matches: () => matches,
  padLeft: () => padLeft,
  padRight: () => padRight,
  prepend: () => prepend2,
  replace: () => replace,
  replaceAll: () => replaceAll,
  slice: () => slice2,
  split: () => split2,
  startsWith: () => startsWith,
  toLowerCase: () => toLowerCase,
  toUpperCase: () => toUpperCase,
  trim: () => trim,
  trimLeft: () => trimLeft,
  trimRight: () => trimRight
});
function adjIndex2(s, i) {
  if (i >= s.length || i < -s.length || !Number.isInteger(i)) {
    return null;
  }
  return i >= 0 ? i : s.length + i;
}
function append2(str) {
  return (s) => s + str;
}
function at(i) {
  return function(s) {
    const idx = adjIndex2(s, i);
    if (typeof idx === "number") {
      return s[idx];
    }
    return void 0;
  };
}
function concat2(...strs) {
  return (s) => s.concat(...strs);
}
function endsWith(str) {
  return (s) => s.endsWith(str);
}
function includes2(str) {
  return (s) => s.includes(str);
}
function includesRegex(regex) {
  return (s) => regex.test(s);
}
function insert2(index, s) {
  return function(str) {
    const idx = adjIndex2(str, index);
    if (typeof idx === "number") {
      return str.substring(0, idx) + s + str.substring(idx);
    }
    if (index === str.length) {
      return str + s;
    }
    return str;
  };
}
function length2(s) {
  return s.length;
}
function matches(regex) {
  if (regex.global) {
    return (s) => s.match(regex) || void 0;
  }
  return (_) => null;
}
function matchGroups(regex) {
  if (!regex.global) {
    return (s) => s.match(regex) || void 0;
  }
  return (_) => null;
}
function matchGroupsAll(regex) {
  if (regex.global) {
    return (s) => [...s.matchAll(regex)];
  }
  return (_) => null;
}
function padLeft(len, str = " ") {
  return function(s) {
    if (s.length >= len) {
      return s;
    }
    if (str === "") {
      return null;
    }
    const padLength = len - s.length;
    const repeats = Math.ceil(padLength / str.length);
    const padding = str.repeat(repeats).substring(0, padLength);
    return padding + s;
  };
}
function padRight(len, str = " ") {
  return function(s) {
    if (s.length >= len) {
      return s;
    }
    if (str === "") {
      return null;
    }
    const padLength = len - s.length;
    const repeats = Math.ceil(padLength / str.length);
    const padding = str.repeat(repeats).substring(0, padLength);
    return s + padding;
  };
}
function prepend2(str) {
  return (s) => str + s;
}
function replace(target, replacement) {
  if (typeof replacement === "string") {
    return (s) => s.replace(target, replacement);
  }
  return (s) => s.replace(target, replacement);
}
function replaceAll(target, replacement) {
  if (typeof replacement === "string") {
    return (s) => s.replaceAll(target, replacement);
  }
  return (s) => s.replaceAll(target, replacement);
}
function slice2(start, end) {
  if (!Number.isInteger(start) || typeof end === "number" && !Number.isInteger(start)) {
    return (_) => "";
  }
  return (s) => s.slice(start, end);
}
function split2(str) {
  return (s) => s.split(str);
}
function startsWith(str) {
  return (s) => s.startsWith(str);
}
function toLowerCase(s) {
  return s.toLowerCase();
}
function toUpperCase(s) {
  return s.toUpperCase();
}
function trim(s) {
  return s.trim();
}
function trimLeft(s) {
  return s.trimStart();
}
function trimRight(s) {
  return s.trimEnd();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  A,
  G,
  L,
  N,
  P,
  R,
  S,
  flow,
  pipe,
  tap
});
