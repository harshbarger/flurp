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
module.exports = __toCommonJS(number_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  add,
  clamp,
  divide,
  divideInto,
  isBetween,
  isCloseTo,
  isEven,
  isGt,
  isGte,
  isLt,
  isLte,
  isNegative,
  isNonNegative,
  isOdd,
  isPositive,
  mathModulo,
  modulo,
  multiply,
  nthRoot,
  pow,
  round,
  subtract,
  subtractFrom
});
