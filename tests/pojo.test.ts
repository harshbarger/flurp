import * as P from "../src/pojo";
import * as N from "../src/number";
import * as A from "../src/array";

type ObjOf<T> = Record<string, T>;

describe("POJO", () => {
  test("allPropsSatisfy", () => {
    const f = P.allPropsSatisfy<ObjOf<number>>(N.isPositive);
    expect(f({ x: 3, y: 4, z: 5 })).toBe(true);
    expect(f({ x: 3, y: -4, z: 5 })).toBe(false);
  });

  test("anyPropSatisfies", () => {
    const f = P.anyPropSatisfies<ObjOf<number>>(N.isPositive);
    expect(f({ x: -3, y: -4, z: 5 })).toBe(true);
    expect(f({ x: -3, y: -4, z: -5 })).toBe(false);
  });

  test("entries", () => {
    expect(P.entries({ x: 3, y: 4, z: 5 })).toEqual([
      ["x", 3],
      ["y", 4],
      ["z", 5],
    ]);
    expect(P.entries({})).toEqual([]);
  });

  test("filter", () => {
    const f = P.filter<ObjOf<number>>(N.isPositive);
    expect(f({ x: 3, y: -4, z: 5 })).toEqual({ x: 3, z: 5 });
    expect(f({})).toEqual({});
  });

  test("filterWithKey", () => {
    const f = P.filterWithKey<ObjOf<string>>((k: string, v: string) => v === k);
    expect(f({ x: "x", y: "weasel", z: "z" })).toEqual({ x: "x", z: "z" });
    expect(f({})).toEqual({});
  });

  test("fromSpec", () => {
    const f = P.fromSpec({
      first: A.first,
      last: A.last,
    });

    expect(f([3, 4, 5, 6])).toEqual({ first: 3, last: 6 });
  });

  test("getOr", () => {
    const f = P.getOr("x");
    const g = P.getOr("y", 10);
    const h = P.getOr("y");
    expect(f({ x: 5 })).toBe(5);
    expect(g({ x: 5 })).toBe(10);
    expect(h({ x: 5 })).toBe(undefined);
  });

  test("hasKey", () => {
    const f = P.hasKey("x");
    expect(f({ x: 5 })).toBe(true);
    expect(f({ y: 2 })).toBe(false);
    expect(f({ x: 5, y: 5 })).toBe(true);
  });

  test("isEmpty", () => {
    expect(P.isEmpty({})).toBe(true);
    expect(P.isEmpty({ x: 4 })).toBe(false);
  });

  test("keys", () => {
    expect(P.keys({ x: 3, y: 4, z: 5 })).toEqual(["x", "y", "z"]);
    expect(P.keys({})).toEqual([]);
  });

  test("map", () => {
    const f = P.map<ObjOf<number>>(N.multiply(10));
    expect(f({ x: 3, y: 4 })).toEqual({ x: 30, y: 40 });
    expect(f({})).toEqual({});
  });

  test("mapWithKey", () => {
    const obj = { x: 10, y: 20 };
    const f = P.mapWithKey<{ x: number; y: number }>((v, k) => v * obj[k]);
    expect(f({ x: 3, y: 4 })).toEqual({ x: 30, y: 80 });
  });

  test("merge", () => {
    const f = P.merge({ x: 2 });
    expect(f({ x: 3, y: 5 })).toEqual({ x: 2, y: 5 });
    expect(f({ y: 5 })).toEqual({ x: 2, y: 5 });
  });

  test("mergeInto", () => {
    const f = P.mergeInto({ x: 2 });
    expect(f({ x: 3, y: 5 })).toEqual({ x: 3, y: 5 });
  });

  test("noPropSatisfies", () => {
    const f = P.noPropSatisfies<ObjOf<number>>(N.isPositive);
    expect(f({ x: -3, y: -4, z: -5 })).toBe(true);
    expect(f({ x: -3, y: -4, z: 5 })).toBe(false);
  });

  test("pick", () => {
    const f = P.pick(["x", "z"]);
    expect(f({ x: 3, y: 4, z: 5 })).toEqual({ x: 3, z: 5 });
  });

  test("propEquals", () => {
    const f = P.propEquals("x", 5);
    expect(f({ x: 5, y: 3 })).toBe(true);
    expect(f({ x: 3, y: 5 })).toBe(false);
    expect(f({ y: 5 })).toBe(false);
  });

  test("propSatisfies", () => {
    const f = P.propSatisfies<ObjOf<number>>("x", N.isPositive);
    expect(f({ x: 5, y: 3 })).toBe(true);
    expect(f({ x: -5, y: 3 })).toBe(false);
  });

  test("regroup", () => {
    expect(P.regroup({ x: { a: 1, b: 2 }, y: { a: 3, b: 4 } })).toEqual({
      a: { x: 1, y: 3 },
      b: { x: 2, y: 4 },
    });
  });

  test("remove", () => {
    const f = P.remove<ObjOf<number>>("x");
    const g = P.remove<ObjOf<number>>(["x", "y"]);
    expect(f({ x: 3, y: 5, z: 4 })).toEqual({ y: 5, z: 4 });
    expect(g({ x: 3, y: 5, z: 4 })).toEqual({ z: 4 });
    expect(f({ x: 3 })).toEqual({});
    expect(g({ z: 4 })).toEqual({ z: 4 });
    expect(f({})).toEqual({});
  });

  test("set", () => {
    const f = P.set("x", 5);
    const g = P.set("x", 5, false);
    expect(f({ x: 3 })).toEqual({ x: 5 });
    expect(f({ y: 3 })).toEqual({ y: 3, x: 5 });
    expect(g({ y: 3 })).toEqual({ y: 3 });
  });

  test("values", () => {
    expect(P.values({ x: 3, y: 4, z: 5 })).toEqual([3, 4, 5]);
    expect(P.values({})).toEqual([]);
  });
});
