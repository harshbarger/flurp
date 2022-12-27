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
module.exports = __toCommonJS(logic_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FALSE,
  TRUE,
  allFail,
  allPass,
  always,
  anyFail,
  anyPass,
  both,
  branch,
  either,
  equals,
  identity,
  ifElse,
  isIncludedIn,
  neither,
  not,
  nullishTo,
  unless,
  when
});
