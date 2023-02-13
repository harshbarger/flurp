import * as G from "../src/guard";
import * as L from "../src/logic";
import * as N from "../src/number";
import * as A from "../src/array";
import * as P from "../src/pojo";
import * as S from "../src/string";

describe("guard", () => {
  test("ifIsArray", () => {
    const f = G.ifIsArray(A.length, L.always(undefined));
    expect(f([5])).toBe(1);
    expect(f(5)).toBe(undefined);
  });

  test("ifIsNull", () => {
    const f = G.ifIsNull([], L.identity);
    expect(f([3, 4, 5])).toEqual([3, 4, 5]);
    expect(f(null)).toEqual([]);
  });

  test("ifIsNullish", () => {
    const f = G.ifIsNullish(L.always([]), L.identity);
    expect(f([3, 4, 5])).toEqual([3, 4, 5]);
    expect(f(null)).toEqual([]);
    expect(f(undefined)).toEqual([]);
  });

  test("ifIsNumber", () => {
    const f = G.ifIsNumber(N.multiply(2), L.always(undefined));
    expect(f(2)).toBe(4);
    expect(f("2")).toBeUndefined();
  });

  test("ifIsPOJO", () => {
    const f = G.ifIsPOJO(P.getOr("x"), L.FALSE);
    expect(f({ x: 5 })).toBe(5);
    expect(f([5])).toBe(false);
  });

  test("ifIsString", () => {
    const f = G.ifIsString(S.length, L.always(0));
    expect(f("5")).toBe(1);
    expect(f(5)).toBe(0);
  });

  test("ifIsUndefined", () => {
    const f = G.ifIsUndefined([], L.identity);
    expect(f([3, 4, 5])).toEqual([3, 4, 5]);
    expect(f(undefined)).toEqual([]);
  });

  test("isArray", () => {
    expect(G.isArray([5])).toBe(true);
    expect(G.isArray([])).toBe(true);
    expect(G.isArray(new Array(3))).toBe(true);
    expect(G.isArray({})).toBe(false);
  });

  test("isArrayAnd", () => {
    const f = G.isArrayAnd(A.isEmpty);
    expect(f([])).toBe(true);
    expect(f([4])).toBe(false);
    expect(f({})).toBe(false);
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

  test("isNumberAnd", () => {
    const f = G.isNumberAnd(isFinite);
    expect(f(1e20)).toBe(true);
    expect(f(-5 / 0)).toBe(false);
    expect(f("weasel")).toBe(false);
  });

  test("isPOJO", () => {
    expect(G.isPOJO({})).toBe(true);
    expect(G.isPOJO([])).toBe(false);
    expect(G.isPOJO(null)).toBe(false);
    expect(G.isPOJO(undefined)).toBe(false);
    expect(G.isPOJO(Number(5))).toBe(false);
    expect(G.isPOJO((x: number) => x + 4)).toBe(false);
  });

  test("isPOJOAnd", () => {
    const f = G.isPOJOAnd(P.hasKey("x"));
    expect(f({ x: 5 })).toBe(true);
    expect(f({ y: 5 })).toBe(false);
    expect(f(["x"])).toBe(false);
  });

  test("isString", () => {
    expect(G.isString("42")).toBe(true);
    expect(G.isString(String(42))).toBe(true);
    expect(G.isString(42)).toBe(false);
  });

  test("isStringAnd", () => {
    const f = G.isStringAnd(S.startsWith("w"));
    expect(f("weasel")).toBe(true);
    expect(f("a weasel")).toBe(false);
    expect(f(/a weasel/)).toBe(false);
  });

  test("isUndefined", () => {
    expect(G.isUndefined(undefined)).toBe(true);
    expect(G.isUndefined(null)).toBe(false);
  });
});
