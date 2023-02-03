import * as R from "../src/result";
import * as A from "../src/array";

describe("result", () => {
  test("catchAsNull", () => {
    // @ts-expect-error error triggered intentionally to test catch and replace
    const f = R.catchAsNull((s: string) => Math[s](1));
    expect(f("log")).toBe(0);
    expect(f("no-such-method")).toBeNull();
    expect(f(null)).toBeNull();
    expect(f(undefined)).toBeUndefined();
  });

  test("isNull", () => {
    expect(R.isNull(null)).toBe(true);
    expect(R.isNull(undefined)).toBe(false);
  });

  test("isUndefined", () => {
    expect(R.isUndefined(undefined)).toBe(true);
    expect(R.isUndefined(null)).toBe(false);
  });

  test("map", () => {
    const f = R.map((x: number) => x * 2);
    expect(f(5)).toBe(10);
    expect(f(undefined)).toBeUndefined();
    expect(f(null)).toBeNull();
  });

  test("nullTo", () => {
    const f = R.nullTo(5);
    const g = R.nullTo(undefined);
    expect(f(2)).toBe(2);
    expect(f(undefined)).toBeUndefined();
    expect(f(null)).toBe(5);
    expect(g(2)).toBe(2);
    expect(g(undefined)).toBeUndefined();
    expect(g(null)).toBeUndefined();
  });

  test("toNullIf", () => {
    const f = R.toNullIf(A.isEmpty);
    expect(f([4, 5, 6])).toEqual([4, 5, 6]);
    expect(f([])).toBeNull();
    expect(f(undefined)).toBeUndefined();
    expect(f(null)).toBeNull();
  });

  test("toUndefinedIf", () => {
    const f = R.toUndefinedIf(A.isEmpty);
    expect(f([4, 5, 6])).toEqual([4, 5, 6]);
    expect(f([])).toBeUndefined();
    expect(f(undefined)).toBeUndefined();
    expect(f(null)).toBeNull();
  });

  test("undefinedTo", () => {
    const f = R.undefinedTo(5);
    const g = R.undefinedTo(null);
    expect(f(2)).toBe(2);
    expect(f(undefined)).toBe(5);
    expect(f(null)).toBeNull();
    expect(g(2)).toBe(2);
    expect(g(undefined)).toBeNull();
    expect(f(null)).toBeNull();
  });
});
