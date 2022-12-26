import { N } from "../src/index";

describe("numbers", () => {
  test("add", () => {
    const f = N.add(5);
    expect(f(2)).toBe(7);
  });

  test("clamp", () => {
    const f = N.clamp(0, 100);
    expect(f(-2)).toBe(0);
    expect(f(42)).toBe(42);
    expect(f(Infinity)).toBe(100);
  });

  test("divide", () => {
    const f = N.divide(2);
    expect(f(10)).toBe(5);
  });

  test("divideInto", () => {
    const f = N.divideInto(2);
    expect(f(10)).toBe(0.2);
  });

  test("isCloseTo", () => {
    const f = N.isCloseTo(5);
    const g = N.isCloseTo(5, 1e-13);
    expect(f(5 + 1e-16)).toBe(true);
    expect(f(5 - 1e-16)).toBe(true);
    expect(f(5 + 1e-14)).toBe(false);
    expect(f(5 - 1e-14)).toBe(false);
    expect(g(5 + 1e-14)).toBe(true);
    expect(g(5 - 1e-14)).toBe(true);
  });

  test("isBetween", () => {
    const f = N.isBetween(3, 7);
    expect(f(1)).toBe(false);
    expect(f(3)).toBe(true);
    expect(f(4)).toBe(true);
    expect(f(7)).toBe(true);
    expect(f(10)).toBe(false);
  });

  test("isEven", () => {
    const f = N.isEven;
    expect(f(4)).toBe(true);
    expect(f(-4)).toBe(true);
    expect(f(3.99)).toBe(false);
    expect(f(NaN)).toBe(false);
  });

  test("isGt", () => {
    const f = N.isGt(4);
    expect(f(6)).toBe(true);
    expect(f(4)).toBe(false);
    expect(f(2)).toBe(false);
  });

  test("isGte", () => {
    const f = N.isGte(4);
    expect(f(6)).toBe(true);
    expect(f(4)).toBe(true);
    expect(f(2)).toBe(false);
  });

  test("isLt", () => {
    const f = N.isLt(4);
    expect(f(2)).toBe(true);
    expect(f(4)).toBe(false);
    expect(f(6)).toBe(false);
  });

  test("isLte", () => {
    const f = N.isLte(4);
    expect(f(2)).toBe(true);
    expect(f(4)).toBe(true);
    expect(f(6)).toBe(false);
  });

  test("isNegative", () => {
    const f = N.isNegative;
    expect(f(3)).toBe(false);
    expect(f(-3)).toBe(true);
    expect(f(0)).toBe(false);
    expect(f(NaN)).toBe(false);
  });

  test("isNonNegative", () => {
    const f = N.isNonNegative;
    expect(f(3)).toBe(true);
    expect(f(-3)).toBe(false);
    expect(f(0)).toBe(true);
    expect(f(NaN)).toBe(false);
  });

  test("isOdd", () => {
    const f = N.isOdd;
    expect(f(3)).toBe(true);
    expect(f(-3)).toBe(true);
    expect(f(3.01)).toBe(false);
    expect(f(NaN)).toBe(false);
  });

  test("isPositive", () => {
    const f = N.isPositive;
    expect(f(3)).toBe(true);
    expect(f(-3)).toBe(false);
    expect(f(0)).toBe(false);
    expect(f(NaN)).toBe(false);
  });

  test("mathModulo", () => {
    const f = N.mathModulo(6);
    const g = N.mathModulo(-6);
    expect(f(7)).toBe(1);
    expect(f(-7)).toBe(5);
    expect(g(7)).toBe(-5);
    expect(g(-7)).toBe(-1);
  });

  test("modulo", () => {
    const f = N.modulo(6);
    const g = N.modulo(-6);
    const h = N.modulo(0);
    expect(f(7)).toBe(1);
    expect(g(7)).toBe(1);
    expect(f(-7.1)).toBeCloseTo(-1.1, 1e-9);
    expect(g(-7)).toBe(-1);
    expect(h(7)).toBeNaN();
  });

  test("multiply", () => {
    const f = N.multiply(5);
    expect(f(2)).toBe(10);
  });

  test("nthRoot", () => {
    const f = N.nthRoot(3);
    expect(f(8)).toBe(2);
    expect(f(-8)).toBe(-2);
  });

  test("pow", () => {
    const f = N.pow(3);
    expect(f(4)).toBe(64);
  });

  test("round", () => {
    const f = N.round(2);
    const g = N.round();
    const h = N.round(-2);
    expect(f(12345.6789)).toBe(12345.68);
    expect(g(12345.6789)).toBe(12346);
    expect(h(12345.6789)).toBe(12300);
  });

  test("subtract", () => {
    const f = N.subtract(5);
    expect(f(2)).toBe(-3);
  });

  test("subtractFrom", () => {
    const f = N.subtractFrom(5);
    expect(f(2)).toBe(3);
  });
});
