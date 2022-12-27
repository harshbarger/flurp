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

// src/string.ts
var string_exports = {};
__export(string_exports, {
  append: () => append,
  at: () => at,
  concat: () => concat,
  endsWith: () => endsWith,
  includes: () => includes,
  includesRegex: () => includesRegex,
  insert: () => insert,
  length: () => length,
  matchGroups: () => matchGroups,
  matchGroupsAll: () => matchGroupsAll,
  matches: () => matches,
  padLeft: () => padLeft,
  padRight: () => padRight,
  prepend: () => prepend,
  replace: () => replace,
  replaceAll: () => replaceAll,
  slice: () => slice,
  split: () => split,
  startsWith: () => startsWith,
  toLowerCase: () => toLowerCase,
  toUpperCase: () => toUpperCase,
  trim: () => trim,
  trimLeft: () => trimLeft,
  trimRight: () => trimRight
});
module.exports = __toCommonJS(string_exports);
function adjIndex(s, i) {
  if (i >= s.length || i < -s.length || !Number.isInteger(i)) {
    return null;
  }
  return i >= 0 ? i : s.length + i;
}
function append(str) {
  return (s) => s + str;
}
function at(i) {
  return function(s) {
    const idx = adjIndex(s, i);
    if (typeof idx === "number") {
      return s[idx];
    }
    return void 0;
  };
}
function concat(...strs) {
  return (s) => s.concat(...strs);
}
function endsWith(str) {
  return (s) => s.endsWith(str);
}
function includes(str) {
  return (s) => s.includes(str);
}
function includesRegex(regex) {
  return (s) => regex.test(s);
}
function insert(index, s) {
  return function(str) {
    const idx = adjIndex(str, index);
    if (typeof idx === "number") {
      return str.substring(0, idx) + s + str.substring(idx);
    }
    if (index === str.length) {
      return str + s;
    }
    return str;
  };
}
function length(s) {
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
function prepend(str) {
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
function slice(start, end) {
  if (!Number.isInteger(start) || typeof end === "number" && !Number.isInteger(start)) {
    return (_) => "";
  }
  return (s) => s.slice(start, end);
}
function split(str) {
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
  append,
  at,
  concat,
  endsWith,
  includes,
  includesRegex,
  insert,
  length,
  matchGroups,
  matchGroupsAll,
  matches,
  padLeft,
  padRight,
  prepend,
  replace,
  replaceAll,
  slice,
  split,
  startsWith,
  toLowerCase,
  toUpperCase,
  trim,
  trimLeft,
  trimRight
});
