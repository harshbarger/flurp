import * as L from "../src/logic";
import * as N from "../src/number";

describe("logic", () => {
  test("allFail", () => {
    const f = L.allFail(N.isNegative, N.isEven, (x: number) => x % 3 === 0);
    expect(f(5)).toBe(true);
    expect(f(4)).toBe(false);
    expect(f(9)).toBe(false);
    expect(f(-5)).toBe(false);
  });

  test("allPass", () => {
    const f = L.allPass(N.isPositive, N.isEven, (x: number) => x % 3 === 0);
    expect(f(6)).toBe(true);
    expect(f(4)).toBe(false);
    expect(f(9)).toBe(false);
    expect(f(-6)).toBe(false);
  });

  test("always", () => {
    const f = L.always(5);
    expect(f("weasel")).toBe(5);
  });

  test("anyFail", () => {
    const f = L.anyFail(N.isPositive, N.isLt(10), (x: number) => x % 3 === 0);
    expect(f(-6)).toBe(true);
    expect(f(5)).toBe(true);
    expect(f(17)).toBe(true);
    expect(f(6)).toBe(false);
  });

  test("anyPass", () => {
    const f = L.anyPass(N.isPositive, N.isEven, (x: number) => x % 3 === 0);
    expect(f(1)).toBe(true);
    expect(f(-4)).toBe(true);
    expect(f(-9)).toBe(true);
    expect(f(-5)).toBe(false);
  });

  test("both", () => {
    const f = L.both(N.isPositive, N.isLt(10));
    expect(f(3)).toBe(true);
    expect(f(-3)).toBe(false);
    expect(f(13)).toBe(false);
  });

  test("branch", () => {
    const f = L.branch(
      [N.isGt(100), N.multiply(0.9)],
      [N.isGt(50), N.subtract(5)],
      [N.isGt(0), L.identity]
    );

    expect(f(500)).toBe(450);
    expect(f(100)).toBe(95);
    expect(f(30)).toBe(30);
    expect(f(0)).toBeNull();
  });

  test("either", () => {
    const f = L.either(N.isPositive, N.isEven);
    expect(f(-2)).toBe(true);
    expect(f(5)).toBe(true);
    expect(f(2)).toBe(true);
    expect(f(-3)).toBe(false);
  });

  test("equals", () => {
    const f = L.equals(0);
    expect(f(0)).toBe(true);
    expect(f(1)).toBe(false);
    expect(f(false)).toBe(false);
  });

  test("FALSE", () => {
    expect(L.FALSE("weasel")).toBe(false);
  });

  test("identity", () => {
    expect(L.identity(5)).toBe(5);
  });

  test("ifElse", () => {
    const f = L.ifElse(
      N.isNegative,
      (x) => `${x} is negative.`,
      (x) => `${x} is non-negative.`
    );
    expect(f(-4)).toBe("-4 is negative.");
    expect(f(4)).toBe("4 is non-negative.");
  });

  test("isIncludedIn", () => {
    const f = L.isIncludedIn([2, 3, 4]);
    expect(f(3)).toBe(true);
    expect(f(5)).toBe(false);
  });

  test("neither", () => {
    const f = L.neither(N.isPositive, N.isEven);
    expect(f(-5)).toBe(true);
    expect(f(5)).toBe(false);
    expect(f(-4)).toBe(false);
  });

  test("not", () => {
    const f = L.not(L.equals(5));
    expect(f(5)).toBe(false);
    expect(f(4)).toBe(true);
  });

  test("nullishTo", () => {
    const f = L.nullishTo(3);
    expect(f(undefined)).toBe(3);
    expect(f(null)).toBe(3);
    expect(f([2])).toEqual([2]);
  });

  test("TRUE", () => {
    expect(L.TRUE("weasel")).toBe(true);
  });

  test("unless", () => {
    const f = L.unless(N.isPositive, N.multiply(2));
    expect(f(5)).toBe(5);
    expect(f(-5)).toBe(-10);
  });

  test("when", () => {
    const f = L.when(N.isPositive, N.multiply(2));
    expect(f(5)).toBe(10);
    expect(f(-5)).toBe(-5);
  });
});
