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

// src/result.ts
var result_exports = {};
__export(result_exports, {
  catchAsNull: () => catchAsNull,
  isNull: () => isNull,
  isUndefined: () => isUndefined,
  map: () => map,
  nullTo: () => nullTo,
  toNullIf: () => toNullIf,
  toUndefinedIf: () => toUndefinedIf,
  undefinedTo: () => undefinedTo
});
module.exports = __toCommonJS(result_exports);
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
function isNull(val) {
  return val === null;
}
function isUndefined(val) {
  return val === void 0;
}
function map(transform) {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  catchAsNull,
  isNull,
  isUndefined,
  map,
  nullTo,
  toNullIf,
  toUndefinedIf,
  undefinedTo
});
