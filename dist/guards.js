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
module.exports = __toCommonJS(guards_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isArray,
  isBoolean,
  isFunction,
  isNotNullish,
  isNull,
  isNullish,
  isNumber,
  isPOJO,
  isString,
  isUndefined
});
