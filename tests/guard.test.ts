import * as G from "../src/guard";

describe("guard", () => {
  test("isArray", () => {
    expect(G.isArray([5])).toBe(true);
    expect(G.isArray([])).toBe(true);
    expect(G.isArray(new Array(3))).toBe(true);
    expect(G.isArray({})).toBe(false);
  });

  test("isBoolean", () => {
    expect(G.isBoolean(true)).toBe(true);
    expect(G.isBoolean(Boolean(4))).toBe(true);
    expect(G.isBoolean(0)).toBe(false);
  });

  test("isFunction", () => {
    expect(G.isFunction((x: number) => x + 4)).toBe(true);
    expect(G.isFunction(console.log)).toBe(true);
    expect(G.isFunction(new Function("x", "return x + 1"))).toBe(true);
    expect(G.isFunction(42)).toBe(false);
  });

  test("isNotNullish", () => {
    expect(G.isNotNullish({})).toBe(true);
    expect(G.isNotNullish(null)).toBe(false);
    expect(G.isNotNullish(undefined)).toBe(false);
  });

  test("isNull", () => {
    expect(G.isNull(null)).toBe(true);
    expect(G.isNull(undefined)).toBe(false);
  });

  test("isNullish", () => {
    expect(G.isNullish(null)).toBe(true);
    expect(G.isNullish(undefined)).toBe(true);
    expect(G.isNullish({})).toBe(false);
  });

  test("isNumber", () => {
    expect(G.isNumber(42)).toBe(true);
    expect(G.isNumber(Number(42))).toBe(true);
    expect(G.isNumber("42")).toBe(false);
  });

  test("isPOJO", () => {
    expect(G.isPOJO({})).toBe(true);
    expect(G.isPOJO([])).toBe(false);
    expect(G.isPOJO(null)).toBe(false);
    expect(G.isPOJO(undefined)).toBe(false);
    expect(G.isPOJO(Number(5))).toBe(false);
    expect(G.isPOJO((x: number) => x + 4)).toBe(false);
  });

  test("isString", () => {
    expect(G.isString("42")).toBe(true);
    expect(G.isString(String(42))).toBe(true);
    expect(G.isString(42)).toBe(false);
  });

  test("isUndefined", () => {
    expect(G.isUndefined(undefined)).toBe(true);
    expect(G.isUndefined(null)).toBe(false);
  });
});
