"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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

// src/pojo.ts
var pojo_exports = {};
__export(pojo_exports, {
  entries: () => entries,
  filter: () => filter,
  filterWithKey: () => filterWithKey,
  getOr: () => getOr,
  hasKey: () => hasKey,
  isEmpty: () => isEmpty,
  keys: () => keys,
  map: () => map,
  merge: () => merge,
  mergeInto: () => mergeInto,
  propEquals: () => propEquals,
  propPasses: () => propPasses,
  remove: () => remove,
  set: () => set,
  values: () => values
});
module.exports = __toCommonJS(pojo_exports);
function isKeyOf(obj, key) {
  return obj !== null && key in obj;
}
function entries(obj) {
  return Object.entries(obj);
}
function filter(condition) {
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
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function keys(obj) {
  return Object.keys(obj);
}
function map(f) {
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
function remove(keys2) {
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
function set(key, newVal, createIfNotFound = true) {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  entries,
  filter,
  filterWithKey,
  getOr,
  hasKey,
  isEmpty,
  keys,
  map,
  merge,
  mergeInto,
  propEquals,
  propPasses,
  remove,
  set,
  values
});
