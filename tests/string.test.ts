import * as S from "../src/string";

describe("strings", () => {
  test("append", () => {
    const f = S.append("sel");
    expect(f("wea")).toBe("weasel");
  });

  test("concat", () => {
    const f = S.concat("e", "ase", "l");
    expect(f("w")).toBe("weasel");
    expect(f("")).toBe("easel");
  });

  test("endWith", () => {
    const f = S.endsWith("sel");
    expect(f("weasel")).toBe(true);
    expect(f("sel_")).toBe(false);
    expect(f("el")).toBe(false);
  });

  test("get", () => {
    const f = S.get(2);
    const g = S.get(-2);
    const h = S.get(1.5);
    const i = S.get(-7);
    const j = S.get(6);
    expect(f("abcdef")).toBe("c");
    expect(g("abcdef")).toBe("e");
    expect(h("abcdef")).toBe(undefined);
    expect(i("abcdef")).toBe(undefined);
    expect(j("abcdef")).toBe(undefined);
  });

  test("includes", () => {
    const f = S.includes("as");
    expect(f("weasel")).toBe(true);
    expect(f("hippo")).toBe(false);
  });

  test("includesRegex", () => {
    const f = S.includesRegex(/[aeiou]/i);
    expect(f("WEASEL")).toBe(true);
    expect(f("qqq")).toBe(false);
  });

  test("insert", () => {
    const f = S.insert(0, "__");
    const g = S.insert(2, "__");
    const h = S.insert(4, "__");
    const i = S.insert(-1, "__");
    const j = S.insert(-4, "__");
    const k = S.insert(2, "");
    expect(f("gray")).toBe("__gray");
    expect(g("gray")).toBe("gr__ay");
    expect(h("gray")).toBe("gray__");
    expect(h("gra")).toBe("gra");
    expect(i("gray")).toBe("gra__y");
    expect(j("gray")).toBe("__gray");
    expect(j("gra")).toBe("gra");
    expect(k("gra")).toBe("gra");
  });

  test("length", () => {
    expect(S.length("weasel")).toBe(6);
    expect(S.length("")).toBe(0);
  });

  test("matches", () => {
    const f = S.matches(/[ae]/g);
    const g = S.matches(/[ae]/);
    expect(f("weasel")).toEqual(["e", "a", "e"]);
    expect(f("hippo")).toBeUndefined();
    expect(g("weasel")).toBeNull();
  });

  test("matchGroups", () => {
    const f = S.matchGroups(/(\d),(\d)/);
    const g = S.matchGroups(/(\d),(\d)/g);
    // slice due to extra non-integer properties included with result of String.match()
    expect(f("(4,6)")?.slice(0, 3)).toEqual(["4,6", "4", "6"]);
    expect(f("(4,6) (3,2)")?.slice(0, 3)).toEqual(["4,6", "4", "6"]);
    expect(f("hippo")).toBeUndefined();
    expect(g("(4,6)")).toBeNull();
  });

  test("matchGroupsAll", () => {
    const f = S.matchGroupsAll(/(\d),(\d)/g);
    const g = S.matchGroupsAll(/(\d),(\d)/);
    // slice due to extra non-integer properties included with result of String.match()
    const oneGroup = f("(4,6)");
    expect(oneGroup && oneGroup[0].slice(0, 3)).toEqual(["4,6", "4", "6"]);
    const twoGroups = f("(4,6) (3,2)");
    expect(twoGroups).toHaveLength(2);
    expect(twoGroups && twoGroups[0].slice(0, 3)).toEqual(["4,6", "4", "6"]);
    expect(twoGroups && twoGroups[1].slice(0, 3)).toEqual(["3,2", "3", "2"]);
    expect(g("(4,6)")).toBeNull();
  });

  test("padLeft", () => {
    const f = S.padLeft(10, ".");
    const g = S.padLeft(10, "_.");
    const h = S.padLeft(10, "");
    const i = S.padLeft(10);
    expect(f("weasel")).toBe("....weasel");
    expect(f("grayweasel")).toBe("grayweasel");
    expect(g("weasel")).toBe("_._.weasel");
    expect(g("aweasel")).toBe("_._aweasel");
    expect(h("weasel")).toBeNull();
    expect(i("weasel")).toBe("    weasel");
  });

  test("padRight", () => {
    const f = S.padRight(10, ".");
    const g = S.padRight(10, "_.");
    const h = S.padRight(10, "");
    const i = S.padRight(10);
    expect(f("weasel")).toBe("weasel....");
    expect(f("grayweasel")).toBe("grayweasel");
    expect(g("weasel")).toBe("weasel_._.");
    expect(g("aweasel")).toBe("aweasel_._");
    expect(h("weasel")).toBeNull();
    expect(i("weasel")).toBe("weasel    ");
  });

  test("prepend", () => {
    const f = S.prepend("wea");
    expect(f("sel")).toBe("weasel");
  });

  test("replace", () => {
    const f = S.replace("e", "_");
    const g = S.replace("e", S.toUpperCase);
    const h = S.replace(/[a-e]/, "_");
    const i = S.replace(/[a-e]/, S.toUpperCase);
    expect(f("weasel")).toBe("w_asel");
    expect(g("weasel")).toBe("wEasel");
    expect(h("weasel")).toBe("w_asel");
    expect(i("weasel")).toBe("wEasel");
  });

  test("replaceAll", () => {
    const f = S.replaceAll("e", "_");
    const g = S.replaceAll("e", S.toUpperCase);
    const h = S.replaceAll(/[a-e]/g, "_");
    const i = S.replaceAll(/[a-e]/g, S.toUpperCase);
    expect(f("weasel")).toBe("w_as_l");
    expect(g("weasel")).toBe("wEasEl");
    expect(h("weasel")).toBe("w__s_l");
    expect(i("weasel")).toBe("wEAsEl");
  });

  test("slice", () => {
    const f = S.slice(2);
    const g = S.slice(-2);
    const h = S.slice(2, 3);
    const i = S.slice(-5, -3);
    const j = S.slice(10);
    const k = S.slice(-10);
    const l = S.slice(2.5);
    const m = S.slice(2, 2.5);
    expect(f("weasel")).toBe("asel");
    expect(g("weasel")).toBe("el");
    expect(h("weasel")).toBe("a");
    expect(i("weasel")).toBe("ea");
    expect(j("weasel")).toBe("");
    expect(k("weasel")).toBe("weasel");
    expect(l("weasel")).toBe("");
    expect(m("weasel")).toBe("");
  });

  test("split", () => {
    const f = S.split("as");
    expect(f("class of weasels")).toEqual(["cl", "s of we", "els"]);
  });

  test("startsWith", () => {
    const f = S.startsWith("wea");
    expect(f("weasel")).toBe(true);
    expect(f("_wea")).toBe(false);
    expect(f("we")).toBe(false);
  });

  test("toLowerCase", () => {
    expect(S.toLowerCase("WEASEL")).toBe("weasel");
  });

  test("toUpperCase", () => {
    expect(S.toUpperCase("weasel")).toBe("WEASEL");
  });

  test("trim", () => {
    expect(S.trim(" weasel ")).toBe("weasel");
  });

  test("trimLeft", () => {
    expect(S.trimLeft(" weasel ")).toBe("weasel ");
  });

  test("trimRight", () => {
    expect(S.trimRight(" weasel ")).toBe(" weasel");
  });
});
