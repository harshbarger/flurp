import * as C from "../src/comparator";
import * as P from "../src/pojo";

describe("comparators", () => {
  test("alphabetical", () => {
    expect(C.alphabetical("a", "b")).toBe(-1);
    expect(C.alphabetical("b", "a")).toBe(1);
    expect(C.alphabetical("a", "a")).toBe(0);
    expect(C.alphabetical("a", "A")).toBe(1);
    expect(C.alphabetical("A", "a")).toBe(-1);
    expect(C.alphabetical("a c", "ab")).toBe(1);
    expect(C.alphabetical("a c", "Ab")).toBe(1);
    expect(C.alphabetical("a-c", "ac")).toBe(0);
    expect(C.alphabetical("a", "ac")).toBe(-1);
    expect(C.alphabetical("ac", "a")).toBe(1);
  });

  test("alphabeticalNullable", () => {
    expect(C.alphabeticalNullable("a", "b")).toBe(-1);
    expect(C.alphabeticalNullable("b", "a")).toBe(1);
    expect(C.alphabeticalNullable("a", "a")).toBe(0);
    expect(C.alphabeticalNullable("a", "A")).toBe(1);
    expect(C.alphabeticalNullable("A", "a")).toBe(-1);
    expect(C.alphabeticalNullable("a c", "ab")).toBe(1);
    expect(C.alphabeticalNullable("a c", "Ab")).toBe(1);
    expect(C.alphabeticalNullable("a-c", "ac")).toBe(0);
    expect(C.alphabeticalNullable("a", "ac")).toBe(-1);
    expect(C.alphabeticalNullable("ac", "a")).toBe(1);
    expect(C.alphabeticalNullable(null, "a")).toBe(1);
    expect(C.alphabeticalNullable("a", null)).toBe(-1);
    expect(C.alphabeticalNullable(null, null)).toBe(0);
    expect(C.alphabeticalNullable(undefined, "a")).toBe(1);
    expect(C.alphabeticalNullable("a", undefined)).toBe(-1);
    expect(C.alphabeticalNullable(undefined, undefined)).toBe(0);
    expect(C.alphabeticalNullable(undefined, null)).toBe(1);
    expect(C.alphabeticalNullable(null, undefined)).toBe(-1);
  });

  test("alphaLocale", () => {
    // not exhaustive for alphaLocale options, just checking prop pass through
    expect(C.alphaLocale("en", { numeric: true })("20", "5")).toBe(1);
    expect(C.alphaLocale("de")("ä", "z")).toBe(-1);
    expect(C.alphaLocale("sv")("ä", "z")).toBe(1);
    expect(C.alphaLocale("de", { sensitivity: "base" })("ä", "a")).toBe(0);
    expect(C.alphaLocale("sv", { sensitivity: "base" })("ä", "a")).toBe(1);
  });

  test("alphaLocaleNullable", () => {
    // not exhaustive for alphaLocale options, just checking prop pass through
    expect(C.alphaLocaleNullable("en", { numeric: true })("20", "5")).toBe(1);
    expect(C.alphaLocaleNullable("de")("ä", "z")).toBe(-1);
    expect(C.alphaLocaleNullable("sv")("ä", "z")).toBe(1);
    expect(C.alphaLocaleNullable("de", { sensitivity: "base" })("ä", "a")).toBe(
      0
    );
    expect(C.alphaLocaleNullable("sv", { sensitivity: "base" })("ä", "a")).toBe(
      1
    );
    expect(C.alphaLocaleNullable("en", { numeric: true })(null, "a")).toBe(1);
    expect(C.alphaLocaleNullable("en", { numeric: true })("a", null)).toBe(-1);
    expect(C.alphaLocaleNullable("en", { numeric: true })(null, null)).toBe(0);
    expect(C.alphaLocaleNullable("en", { numeric: true })(undefined, "a")).toBe(
      1
    );
    expect(C.alphaLocaleNullable("en", { numeric: true })("a", undefined)).toBe(
      -1
    );
    expect(
      C.alphaLocaleNullable("en", { numeric: true })(undefined, undefined)
    ).toBe(0);
    expect(
      C.alphaLocaleNullable("en", { numeric: true })(undefined, null)
    ).toBe(1);
    expect(
      C.alphaLocaleNullable("en", { numeric: true })(null, undefined)
    ).toBe(-1);
  });

  test("compareBy", () => {
    // TODO: figure out why this works in TS Playground but not here.

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const f = C.compareBy(P.getOr<number, number>("y", NaN), C.numericAsc);
    expect(f({ x: 3, y: 5 }, { x: 5, y: 3 })).toBe(1);
  });

  test("numericAsc", () => {
    expect(C.numericAsc(3, 6)).toBe(-1);
    expect(C.numericAsc(6, 3)).toBe(1);
    expect(C.numericAsc(6, -Infinity)).toBe(1);
    expect(C.numericAsc(Infinity, 3)).toBe(1);
    expect(C.numericAsc(6, 6)).toBe(0);
    expect(C.numericAsc(NaN, 5)).toBe(1);
    expect(C.numericAsc(4, NaN)).toBe(-1);
    expect(C.numericAsc(NaN, NaN)).toBe(0);
  });

  test("numericDesc", () => {
    expect(C.numericDesc(3, 6)).toBe(1);
    expect(C.numericDesc(6, 3)).toBe(-1);
    expect(C.numericDesc(Infinity, 3)).toBe(-1);
    expect(C.numericDesc(6, -Infinity)).toBe(-1);
    expect(C.numericDesc(6, 6)).toBe(0);
    expect(C.numericDesc(NaN, 5)).toBe(1);
    expect(C.numericDesc(4, NaN)).toBe(-1);
    expect(C.numericDesc(NaN, NaN)).toBe(0);
  });

  test("numericNullableAsc", () => {
    expect(C.numericNullableAsc(-3, 6)).toBe(-1);
    expect(C.numericNullableAsc(6, -3)).toBe(1);
    expect(C.numericNullableAsc(6, 6)).toBe(0);
    expect(C.numericNullableAsc(null, 5)).toBe(1);
    expect(C.numericNullableAsc(5, null)).toBe(-1);
    expect(C.numericNullableAsc(null, null)).toBe(0);
    expect(C.numericNullableAsc(undefined, 5)).toBe(1);
    expect(C.numericNullableAsc(5, undefined)).toBe(-1);
    expect(C.numericNullableAsc(undefined, undefined)).toBe(0);
    expect(C.numericNullableAsc(undefined, null)).toBe(1);
    expect(C.numericNullableAsc(null, undefined)).toBe(-1);
    expect(C.numericNullableAsc(null, NaN)).toBe(1);
    expect(C.numericNullableAsc(NaN, 5)).toBe(1);
    expect(C.numericNullableAsc(4, NaN)).toBe(-1);
    expect(C.numericNullableAsc(NaN, NaN)).toBe(0);
  });

  test("numericNullableDesc", () => {
    expect(C.numericNullableDesc(-3, 6)).toBe(1);
    expect(C.numericNullableDesc(6, -3)).toBe(-1);
    expect(C.numericNullableDesc(6, 6)).toBe(0);
    expect(C.numericNullableDesc(null, 5)).toBe(1);
    expect(C.numericNullableDesc(5, null)).toBe(-1);
    expect(C.numericNullableDesc(null, null)).toBe(0);
    expect(C.numericNullableDesc(undefined, 5)).toBe(1);
    expect(C.numericNullableDesc(5, undefined)).toBe(-1);
    expect(C.numericNullableDesc(undefined, undefined)).toBe(0);
    expect(C.numericNullableDesc(undefined, null)).toBe(1);
    expect(C.numericNullableDesc(null, undefined)).toBe(-1);
    expect(C.numericNullableDesc(NaN, 5)).toBe(1);
    expect(C.numericNullableDesc(4, NaN)).toBe(-1);
    expect(C.numericNullableDesc(NaN, NaN)).toBe(0);
  });
});
