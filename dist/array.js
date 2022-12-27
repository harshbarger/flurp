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
module.exports = __toCommonJS(array_exports);
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
function createWith(length2, f, maxLength = 1e4) {
  if (!Number.isInteger(length2) || length2 > maxLength || length2 < 0) {
    return null;
  }
  const result = new Array(length2);
  for (let i = 0; i < length2; i++) {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  all,
  any,
  aperture,
  append,
  concat,
  count,
  createWith,
  drop,
  dropLast,
  filter,
  filterWithIndex,
  find,
  findIndex,
  findLast,
  findLastIndex,
  first,
  flatten,
  get,
  includes,
  insert,
  isEmpty,
  join,
  last,
  length,
  map,
  mapWithIndex,
  none,
  prepend,
  product,
  reduce,
  reduceRight,
  reduceRightWithIndex,
  reduceWithIndex,
  reject,
  remove,
  reverse,
  set,
  slice,
  split,
  splitMulti,
  sum,
  sumWith,
  take,
  takeLast,
  unique
});
