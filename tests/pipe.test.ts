import { pipe, flow, tap, N } from "../src/index";

describe("pipe", () => {
  test("pipe 1", () => {
    const x = pipe(3, (x) => x * 2);
    expect(x).toBe(6);
  });

  test("pipe 3", () => {
    const x = pipe(
      3,
      (x) => x * 2,
      (x) => x + 4,
      Math.log10
    );
    expect(x).toBe(1);
  });

  test("pipe 12", () => {
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

  test("flow 1", () => {
    const f = flow((x: number) => x * 2);
    expect(f(3)).toBe(6);
  });

  test("flow 3", () => {
    const f = flow(
      (x: number) => x * 2,
      (x) => x + 4,
      Math.log10
    );
    expect(f(3)).toBe(1);
  });

  test("flow 12", () => {
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

  test("tap", () => {
    const spy = jest.spyOn(console, "log").mockImplementation();
    const x = pipe(5, N.multiply(2), tap(console.log), N.multiply(2));

    expect(x).toBe(20);
    expect(spy).toHaveBeenCalledWith(10);

    jest.restoreAllMocks();
  });
});
