import { flow } from "../src/index";
import * as A from "../src/array";
import * as C from "../src/comparator";
import * as L from "../src/logic";
import * as N from "../src/number";

describe("arrays", () => {
  test("all", () => {
    const f = A.all(N.isPositive);
    expect(f([3, 5, 6])).toBe(true);
    expect(f([3, 5, -6])).toBe(false);
    expect(f([])).toBe(true);
  });

  test("any", () => {
    const f = A.any(N.isPositive);
    expect(f([3, -5, -6])).toBe(true);
    expect(f([-3, -5, -6])).toBe(false);
    expect(f([])).toBe(false);
  });

  test("aperture", () => {
    const f = A.aperture(3);
    const g = A.aperture(3.5);
    expect(f([2, 4, 6, 8, 10, 12, 14])).toEqual([
      [2, 4, 6],
      [4, 6, 8],
      [6, 8, 10],
      [8, 10, 12],
      [10, 12, 14],
    ]);
    expect(f([2, 4])).toEqual([]);
    expect(g([2, 4, 6, 8, 10])).toEqual([]);
  });

  test("append", () => {
    const f = A.append([7, 8]);
    const g = A.append(7);
    expect(f([5, 6])).toEqual([5, 6, 7, 8]);
    expect(g([5, 6])).toEqual([5, 6, 7]);
  });

  test("concat", () => {
    expect(A.concat([[3], [6]])).toEqual([3, 6]);
    expect(A.concat<string | number>([[3], [], [9, 12], ["a"]])).toEqual([
      3,
      9,
      12,
      "a",
    ]);
    expect(A.concat([[5]])).toEqual([5]);
    expect(A.concat([])).toEqual([]);
  });

  test("count", () => {
    const f = A.count(N.isPositive);
    expect(f([4, 5, -2, 6, -1])).toBe(3);
  });

  test("createWith", () => {
    expect(A.createWith(3, L.always(5))).toEqual([5, 5, 5]);
    expect(A.createWith(4, L.identity)).toEqual([0, 1, 2, 3]);
    expect(A.createWith(4, flow(L.identity, N.multiply(2)))).toEqual([
      0, 2, 4, 6,
    ]);
    expect(A.createWith(0, L.identity)).toEqual([]);
    expect(A.createWith(-1, L.identity)).toEqual(null);
    expect(A.createWith(1.5, L.identity)).toEqual(null);
    expect(A.createWith(1e6, L.identity)).toEqual(null);
    expect(A.createWith(1e6, L.identity, 2e6)).toHaveLength(1e6);
  });

  test("drop", () => {
    const f = A.drop(2);
    const g = A.drop(2.5);
    const h = A.drop(6);
    const i = A.drop(5);
    expect(f([0, 1, 2, 3, 4])).toEqual([2, 3, 4]);
    expect(g([0, 1, 2, 3, 4])).toEqual([]);
    expect(h([0, 1, 2, 3, 4])).toEqual([]);
    expect(i([0, 1, 2, 3, 4])).toEqual([]);
  });

  test("dropLast", () => {
    const f = A.dropLast(2);
    const g = A.dropLast(2.5);
    const h = A.dropLast(6);
    const i = A.dropLast(5);
    expect(f([0, 1, 2, 3, 4])).toEqual([0, 1, 2]);
    expect(g([0, 1, 2, 3, 4])).toEqual([]);
    expect(h([0, 1, 2, 3, 4])).toEqual([]);
    expect(i([0, 1, 2, 3, 4])).toEqual([]);
  });

  test("filter", () => {
    const f = A.filter(N.isPositive);
    expect(f([3, -6, 2])).toEqual([3, 2]);
  });

  test("filterWithIndex", () => {
    const f = A.filterWithIndex((i, x: number) => x > 0 && i % 2 === 0);
    expect(f([3, -6, 2, 4, -7])).toEqual([3, 2]);
  });

  test("find", () => {
    const f = A.find(N.isPositive);
    expect(f([-3, -4, -1, 5, -4, 2])).toBe(5);
    expect(f([-3, -4, -1, -5, -4, -2])).toBeUndefined();
    expect(f([])).toBeUndefined();
  });

  test("findAllIndices", () => {
    const f = A.findAllIndices(N.isPositive);
    expect(f([3, -4, -1, 5, -4, 2])).toEqual([0, 3, 5]);
    expect(f([-3, -4, -1, -5, -4, -2])).toEqual([]);
    expect(f([])).toEqual([]);
  });

  test("findIndex", () => {
    const f = A.findIndex(N.isPositive);
    expect(f([-3, -4, -1, 5, -4, 2])).toBe(3);
    expect(f([-3, -4, -1, -5, -4, -2])).toBeUndefined();
    expect(f([])).toBeUndefined();
  });

  test("findLast", () => {
    const f = A.findLast(N.isPositive);
    expect(f([-3, -4, -1, 5, 8, -2])).toBe(8);
    expect(f([-3, -4, -1, -5, -8, -2])).toBeUndefined();
    expect(f([4])).toBe(4);
    expect(f([])).toBeUndefined();
  });

  test("findLastIndex", () => {
    const f = A.findLastIndex(N.isPositive);
    expect(f([-3, -4, 1, -5, 8, -2])).toBe(4);
    expect(f([-3, -4, -1, -5, -8, -2])).toBeUndefined();
    expect(f([])).toBeUndefined();
  });

  test("findRightSlice", () => {
    const twoPos = (arr: ReadonlyArray<number>) =>
      A.count(N.isPositive)(arr) >= 2;
    const f = A.findRightSlice(twoPos);
    expect(f([2, -4, 3, -5, 6])).toEqual([3, -5, 6]);
    expect(f([2, -4, 3])).toEqual([2, -4, 3]);
    expect(f([2, -4, -1, -5])).toBeUndefined();
    expect(f([])).toBeUndefined();
  });

  test("findSlice", () => {
    const twoPos = (arr: ReadonlyArray<number>) =>
      A.count(N.isPositive)(arr) >= 2;
    const f = A.findSlice(twoPos);
    expect(f([2, -4, 1, -5, 6])).toEqual([2, -4, 1]);
    expect(f([2, -4, 1])).toEqual([2, -4, 1]);
    expect(f([2, -4, -1, -5])).toBeUndefined();
    expect(f([])).toBeUndefined();
  });

  test("first", () => {
    expect(A.first([4, 5, 6])).toBe(4);
    expect(A.first([])).toBe(undefined);
  });

  test("flatten", () => {
    const f = A.flatten();
    const g = A.flatten(2);
    expect(f([[3, 4], [], [5, 6, 7, [8, 9]]])).toEqual([3, 4, 5, 6, 7, [8, 9]]);
    expect(g([[3, 4], [], [5, 6, 7, [8, 9]]])).toEqual([3, 4, 5, 6, 7, 8, 9]);
  });

  test("get", () => {
    const f = A.get(2);
    const g = A.get(-5);
    const h = A.get(1.9999999);
    const i = A.get(5);
    const j = A.get(-6);
    expect(f([3, 4, 5, 6, 7])).toBe(5);
    expect(g([3, 4, 5, 6, 7])).toBe(3);
    expect(h([3, 4, 5, 6, 7])).toBe(null);
    expect(i([3, 4, 5, 6, 7])).toBe(undefined);
    expect(j([3, 4, 5, 6, 7])).toBe(undefined);
  });

  test("includes", () => {
    const f = A.includes(2);
    expect(f([2, 3, 4])).toBe(true);
    expect(f([3, 4])).toBe(false);
  });

  test("isEmpty", () => {
    expect(A.isEmpty([])).toBe(true);
    expect(A.isEmpty([2])).toBe(false);
    expect(A.isEmpty([undefined])).toBe(false);
    expect(A.isEmpty([null])).toBe(false);
  });

  test("insert", () => {
    const f = A.insert(2, 5);
    const g = A.insert(2, [5, 5]);
    const h = A.insert(-2, 5);
    const i = A.insert(1 / 2, 5);
    const j = A.insert(NaN, 5);
    expect(f([0, 2, 4, 6, 8])).toEqual([0, 2, 5, 4, 6, 8]);
    expect(g([0, 2, 4, 6, 8])).toEqual([0, 2, 5, 5, 4, 6, 8]);
    expect(h([0, 2, 4, 6, 8])).toEqual([0, 2, 4, 5, 6, 8]);
    expect(i([0, 2, 4, 6, 8])).toEqual([0, 2, 4, 6, 8]);
    expect(j([0, 2, 4, 6, 8])).toEqual([0, 2, 4, 6, 8]);
    expect(f([0, 2])).toEqual([0, 2, 5]);
    expect(h([0])).toEqual([0]);
    expect(f([0])).toEqual([0]);
  });

  test("join", () => {
    const f = A.join();
    const g = A.join("...");
    expect(f(["a", "b", "c"])).toBe("abc");
    expect(g(["a", "b", "c"])).toBe("a...b...c");
  });

  test("last", () => {
    expect(A.last([4, 5, 6])).toBe(6);
    expect(A.last([])).toBe(undefined);
  });

  test("length", () => {
    expect(A.length([4, 5, 6])).toBe(3);
  });

  test("map", () => {
    const f = A.map((x: number) => x * 2);
    expect(f([3, 4, 5])).toEqual([6, 8, 10]);
  });

  test("mapWithIndex", () => {
    const f = A.mapWithIndex((i: number, x: number) => x * i);
    expect(f([3, 4, 5, 6])).toEqual([0, 4, 10, 18]);
  });

  test("none", () => {
    const f = A.none(N.isPositive);
    expect(f([-3, -5, -6])).toBe(true);
    expect(f([-3, 2, -6])).toBe(false);
    expect(f([])).toBe(true);
  });

  test("prepend", () => {
    const f = A.prepend([7, 8]);
    const g = A.prepend(7);
    expect(f([5, 6])).toEqual([7, 8, 5, 6]);
    expect(g([5, 6])).toEqual([7, 5, 6]);
  });

  test("product", () => {
    expect(A.product([2, 3, 6])).toBe(36);
    expect(A.product([2])).toBe(2);
    expect(A.product([])).toBeUndefined();
  });

  test("reduce", () => {
    const f = A.reduce((acc, next) => acc + next, "reduced: ");
    const g = A.reduce((acc, next: string) => acc + next);
    expect(f(["a", "b", "c"])).toBe("reduced: abc");
    expect(g(["a", "b", "c"])).toBe("abc");
    expect(f([])).toBe("reduced: ");
  });

  test("reduceRight", () => {
    const f = A.reduceRight((acc, next) => acc + next, "reduced: ");
    const g = A.reduceRight((acc, next: string) => acc + next);
    expect(f(["a", "b", "c"])).toBe("reduced: cba");
    expect(g(["a", "b", "c"])).toBe("cba");
    expect(f([])).toBe("reduced: ");
  });

  test("reduceRightWithIndex", () => {
    const f = A.reduceRightWithIndex(
      (acc: string, next: string, index: number) =>
        acc + (N.isEven(index) ? next : ""),
      "right: "
    );
    const g = A.reduceRightWithIndex(
      (acc: string, next: string, index: number) =>
        acc + (N.isEven(index) ? next : "")
    );
    expect(f(["a", "b", "c", "d", "e"])).toBe("right: eca");
    expect(g(["a", "b", "c", "d", "e"])).toBe("eca");
    expect(f([])).toBe("right: ");
  });

  test("reduceWithIndex", () => {
    const f = A.reduceWithIndex(
      (acc: number, next: number, index: number) =>
        acc + (N.isEven(index) ? next : 0),
      10
    );
    const g = A.reduceWithIndex(
      (acc: number, next: number, index: number) =>
        acc + (N.isEven(index) ? next : 0)
    );
    expect(f([1, 4, 6, 7, 3])).toBe(20);
    expect(g([1, 4, 6, 7, 3])).toBe(10);
    expect(f([])).toBe(10);
  });

  test("reject", () => {
    const f = A.reject(N.isNegative);
    expect(f([2, 4, -5, 0, 6])).toEqual([2, 4, 0, 6]);
  });

  test("remove", () => {
    const f = A.remove(1);
    const g = A.remove(-2);
    const h = A.remove(1, -2);
    const i = A.remove(1, 6);
    const j = A.remove(1.5);
    const k = A.remove(2, 2.5);
    expect(f([3, 4, 5, 6, 7])).toEqual([3, 5, 6, 7]);
    expect(g([3, 4, 5, 6, 7])).toEqual([3, 4, 5, 7]);
    expect(h([3, 4, 5, 6, 7])).toEqual([3, 6, 7]);
    expect(f([3])).toEqual([3]);
    expect(i([2, 3, 4])).toEqual([2]);
    expect(j([2, 3, 4])).toEqual([2, 3, 4]);
    expect(k([2, 3, 4])).toEqual([2, 3, 4]);
  });

  test("replace", () => {
    const f = A.replace(N.isNegative, Math.abs);
    expect(f([-1, 2, -3, 4, -5])).toEqual([1, 2, 3, 4, 5]);
  });

  test("reverse", () => {
    expect(A.reverse([1, 2, 3])).toEqual([3, 2, 1]);
    expect(A.reverse([])).toEqual([]);
  });

  test("set", () => {
    const f = A.set(2, 10);
    const g = A.set(-4, 10);
    const h = A.set(1.99999999999, 10);
    const i = A.set(4, 10);
    const j = A.set(-5, 10);
    expect(f([3, 4, 5, 6])).toEqual([3, 4, 10, 6]);
    expect(g([3, 4, 5, 6])).toEqual([10, 4, 5, 6]);
    expect(h([3, 4, 5])).toEqual([3, 4, 5]);
    expect(i([3, 4, 5])).toEqual([3, 4, 5]);
    expect(j([3, 4, 5])).toEqual([3, 4, 5]);
  });

  test("slice", () => {
    const f = A.slice(2);
    const g = A.slice(-2);
    const h = A.slice(2, 3);
    const i = A.slice(-5, -3);
    const j = A.slice(10);
    const k = A.slice();
    const l = A.slice(-10);
    const m = A.slice(2.5);
    const n = A.slice(2, 2.5);
    expect(f([0, 1, 2, 3, 4, 5, 6])).toEqual([2, 3, 4, 5, 6]);
    expect(g([0, 1, 2, 3, 4, 5, 6])).toEqual([5, 6]);
    expect(h([0, 1, 2, 3, 4, 5, 6])).toEqual([2]);
    expect(i([0, 1, 2, 3, 4, 5, 6])).toEqual([2, 3]);
    expect(j([0, 1, 2, 3, 4, 5, 6])).toEqual([]);
    expect(k([0, 1, 2, 3, 4, 5, 6])).toEqual([0, 1, 2, 3, 4, 5, 6]);
    expect(l([0, 1, 2, 3, 4, 5, 6])).toEqual([0, 1, 2, 3, 4, 5, 6]);
    expect(m([0, 1, 2, 3, 4, 5, 6])).toEqual([]);
    expect(n([0, 1, 2, 3, 4, 5, 6])).toEqual([]);
  });

  test("sortWith", () => {
    const f = A.sortWith(C.numericAsc);
    const g = A.sortWith(C.numericNullableAsc);
    expect(f([30, 6, 1, NaN, 200, 5])).toEqual([1, 5, 6, 30, 200, NaN]);
    expect(g([30, NaN, 6, 1, undefined, 200, null, 5])).toEqual([
      1,
      5,
      6,
      30,
      200,
      NaN,
      null,
      undefined,
    ]);
  });

  test("split", () => {
    const f = A.split(3);
    const g = A.split(0);
    const h = A.split(-1);
    const i = A.split(1.5);
    expect(f([0, 1, 2, 3, 4])).toEqual([
      [0, 1, 2],
      [3, 4],
    ]);
    expect(g([0, 1, 2, 3, 4])).toEqual([[], [0, 1, 2, 3, 4]]);
    expect(g([0, 1, 2])).toEqual([[], [0, 1, 2]]);
    expect(h([0, 1, 2, 3, 4])).toEqual([[0, 1, 2, 3], [4]]);
    expect(i([0, 1, 2])).toBeNull();
  });

  test("splitMulti", () => {
    const f = A.splitMulti([3]);
    const g = A.splitMulti([1, 4, 6]);
    const h = A.splitMulti([1, 4.5, 6]);
    const i = A.splitMulti([1, -4, 6]);
    expect(f([0, 1, 2, 3, 4])).toEqual([
      [0, 1, 2],
      [3, 4],
    ]);
    expect(g([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([
      [0],
      [1, 2, 3],
      [4, 5],
      [6, 7, 8, 9],
    ]);
    expect(h([0, 1, 2])).toBeNull();
    expect(i([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([
      [0],
      [1, 2, 3, 4, 5],
      [],
      [6, 7, 8, 9],
    ]);
  });

  test("sum", () => {
    expect(A.sum([3, 5, 6])).toBe(14);
    expect(A.sum([])).toBe(0);
  });

  test("sumWith", () => {
    const f = A.sumWith(N.pow(2));
    expect(f([1, 2, 3])).toBe(14);
    expect(f([])).toBe(0);
  });

  test("take", () => {
    const f = A.take(2);
    const g = A.take(2.5);
    const h = A.take(6);
    const i = A.take(5);
    expect(f([0, 1, 2, 3, 4])).toEqual([0, 1]);
    expect(g([0, 1, 2, 3, 4])).toEqual([]);
    expect(h([0, 1, 2, 3, 4])).toEqual([]);
    expect(i([0, 1, 2, 3, 4])).toEqual([0, 1, 2, 3, 4]);
  });

  test("takeLast", () => {
    const f = A.takeLast(2);
    const g = A.takeLast(2.5);
    const h = A.takeLast(6);
    const i = A.takeLast(5);
    expect(f([0, 1, 2, 3, 4])).toEqual([3, 4]);
    expect(g([0, 1, 2, 3, 4])).toEqual([]);
    expect(h([0, 1, 2, 3, 4])).toEqual([]);
    expect(i([0, 1, 2, 3, 4])).toEqual([0, 1, 2, 3, 4]);
  });

  test("unique", () => {
    expect(A.unique([2, 3, 4, 4])).toEqual([2, 3, 4]);
    expect(A.unique([2])).toEqual([2]);
    expect(A.unique([])).toEqual([]);
    expect(A.unique([1, 4, 4, 1, 1, 4])).toEqual([1, 4]);
  });
});
