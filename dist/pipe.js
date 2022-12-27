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

// src/pipe.ts
var pipe_exports = {};
__export(pipe_exports, {
  flow: () => flow,
  pipe: () => pipe,
  tap: () => tap
});
module.exports = __toCommonJS(pipe_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  flow,
  pipe,
  tap
});
