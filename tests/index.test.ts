import { flow, pipe, safe, safeCatch, tap } from "../src/index";
import * as N from "../src/number";

test("flow", () => {
  const f = flow(
    (x: number) => x * 2,
    (x) => x + 4,
    Math.log10,
    (x) => x + 1,
    (x) => x * 4, // 8 so far
    (x) => x / 2,
    (x) => x + 96,
    Math.log10, // 2 so far
    (x) => -x,
    (x) => x * 5,
    (x) => x / 10,
    (x) => x + 6
  );
  expect(f(3)).toBe(5);
});

describe("pipe", () => {
  test("pipe", () => {
    const x = pipe(
      3,
      (x) => x * 2,
      (x) => x + 4,
      Math.log10,
      (x) => x + 1,
      (x) => x * 4, // 8 so far
      (x) => x / 2,
      (x) => x + 96,
      Math.log10, // 2 so far
      (x) => -x,
      (x) => x * 5,
      (x) => x / 10,
      (x) => x + 6
    );
    expect(x).toBe(5);
  });

  test("safe", () => {
    const f = safe(N.multiply(2));
    expect(f(5)).toBe(10);
    expect(f(undefined)).toBeUndefined();
    expect(f(null)).toBeNull();
  });

  test("safeCatch", () => {
    // @ts-expect-error error triggered intentionally to test catch and replace
    const f = safeCatch((s: string) => Math[s](1), null);
    expect(f("log")).toBe(0);
    expect(f("no-such-method")).toBeNull();
  });

  test("tap", () => {
    const spy = jest.spyOn(console, "log").mockImplementation();
    const x = pipe(5, N.multiply(2), tap(console.log), N.multiply(2));

    expect(x).toBe(20);
    expect(spy).toHaveBeenCalledWith(10);

    jest.restoreAllMocks();
  });
});
