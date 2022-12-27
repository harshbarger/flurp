/**
 * @param str
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 * const f = S.append("sel");
 * f("wea");    // "weasel"
 * ```
 */
declare function append(str: string): (s: string) => string;
/**
 * Negative indices count backwards from the beginning of the string.
 *
 * @remarks
 * Non-integer or out of bounds indices return undefined.
 *
 * @param i the index
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 * const f = S.at(2);
 * const g = S.at(-2);
 * f("abcdef");    // c
 * g("abcdef");    // e
 * ```
 */
declare function at(i: number): (s: string) => string | undefined;
/**
 * @param strs
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 * const f = S.concat("e", "ase", "l");
 * f("w");    // "weasel"
 * f("");    // "easel"
 * ```
 */
declare function concat(...strs: Array<string>): (s: string) => string;
/**
 * @param str
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 * const f = S.endsWith("sel");
 * f("weasel");    // true
 * f("_sel");      // false
 * f("el");        // false
 * ```
 */
declare function endsWith(str: string): (s: string) => boolean;
/**
 * @param str
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 *
 * const f = S.includes("as");
 * f("weasel");    // true
 * f("hippo");     // false
 * ```
 */
declare function includes(str: string): (s: string) => boolean;
/**
 * @param regex
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 *
 * const hasVowel = S.includesRegex(/[aeiou]/i);
 * hasVowel("weasel");     // true
 * hasVowel("wxyz");       // false
 * ```
 */
declare function includesRegex(regex: RegExp): (s: string) => boolean;
/**
 * Negative indices count backwards from the beginning of the string.
 *
 * @remarks
 * Non-integer or out of bounds indices return the string unchanged.
 * If the index equals the length of the string, then the string will be appended
 * to the end.
 *
 * @param index
 * @param s
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 * const f = S.insert(2, "__");
 * const g = S.insert(6, "__");
 * const h = S.insert(-2, "__");
 * f("weasel");    // "we__asel"
 * g("weasel");    // "weasel__"
 * h("weasel");    // "weas__el"
 * ```
 */
declare function insert(index: number, s: string): (str: string) => string;
/**
 * @param s
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 * S.length("weasel");   // 6
 * S.length("");         // 0
 * ```
 */
declare function length(s: string): number;
/**
 * Returns all matches of `regex` in the string.
 *
 * @param regex global flag must be set, or will return `null`
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 *
 * const allVowels = S.matches(/[aeiou]/g);
 * allVowels("weasel");         // ["e", "a", "e"]
 *
 * const oopsNotGlobal = S.matches(/[aeiou]/);
 * oopsNotGlobal("weasel");      // null
 * ```
 */
declare function matches(regex: RegExp): ((s: string) => RegExpMatchArray | undefined) | ((_: string) => null);
/**
 * Returns an array in which the first element is the match
 * and remaining elements are the capturing groups. Returns `undefined`
 * if the string has no match for `regex`. (This is different from
 * the built-in `String.prototype.match()`, which returns `null` if there are no matches,
 * but more consistent with the conventions in the Flurp library.)
 *
 * @remarks
 * Returned array contains additional properties with string indices as
 * per the underlying `String.prototype.match()` implementation.
 *
 * @param regex global flag must not be set, or will return `null`
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 *
 * const xyDigits = S.matchGroups(/(\d),(\d)/);
 * xyDigits("(4,6)");            // [ '4,6', '4', '6', index: 1, input: '(4,6)', groups: undefined ]
 * xyDigits("weasel");           // undefined
 *
 * const oopsHasGlobal = S.matchGroups(/(\d),(\d)/g);
 * oopsHasGlobal("(4,6)");       // null
 * ```
 */
declare function matchGroups(regex: RegExp): ((s: string) => RegExpMatchArray | undefined) | ((_: string) => null);
/**
 * Returns an array of arrays in which the first element of each array is the match
 * and remaining elements are the capturing groups. Returns `undefined`
 * if the string has no match for `regex`. (This is different from
 * the built-in `String.prototype.matchAll()`, which returns `null` if there are no matches,
 * but more consistent with the conventions in the Flurp library.)
 *
 * @remarks
 * Returned array contains additional properties with string indices as
 * per the underlying `String.prototype.matchAll()` implementation.
 *
 * @param regex global flag must be set, or will return `null`
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 *
 * const xyDigits = S.matchGroups(/(\d),(\d)/g);
 * xyDigits("(4,6) (3, 2)");
 * //    [
 * //      ['4,6', '4', '6', index: 1, input: '(4,6) (3,2)', groups: undefined],
 * //      ['3,2', '3', '2', index: 7, input: '(4,6) (3,2)', groups: undefined]
 * //    ]
 * xyDigits("weasel");               // undefined
 *
 * const oopsNotGlobal = S.matchGroups(/(\d),(\d)/);
 * oopsNotGlobal("(4,6)");           // null
 * ```
 */
declare function matchGroupsAll(regex: RegExp): ((s: string) => RegExpMatchArray[]) | ((_: string) => null);
/**
 * @param len
 * @param str padding string (defaults to " ")
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 * const f = S.padLeft("10, ".");
 * const g = S.padLeft(10, "_.");
 * f("weasel");      // "....weasel"
 * f("grayweasel")   // "grayweasel"
 * g("weasel")       // "_._.weasel";
 * g("aweasel")      // "_._aweasel";
 * ```
 */
declare function padLeft(len: number, str?: string): (s: string) => string | null;
/**
 * @param len
 * @param str padding string (defaults to " ")
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 * const f = S.padRight("10, ".");
 * const g = S.padRight(10, "_.");
 * f("weasel");      // "weasel...."
 * f("grayweasel")   // "grayweasel"
 * g("weasel")       // "weasel_._.";
 * g("aweasel")      // "aweasel_._";
 * ```
 */
declare function padRight(len: number, str?: string): (s: string) => string | null;
/**
 * @param str
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 * const f = S.prepend("wea");
 * f("sel");    // "weasel"
 * ```
 */
declare function prepend(str: string): (s: string) => string;
/**
 * @remarks
 * Implemented with the built-in String.replace(), which allows for additional features
 * documented at [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
 * (e.g., special patterns in the replacement strings).
 *
 * @param target (if RegExp, must include the global flag)
 * @param replacement
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 * const f = S.replace("e", "_");
 * const g = S.replace(/[a-e]/, S.toUpperCase);
 * f("weasel");       // "w_asel"
 * g("weasel");       // "wEasel"
 * ```
 */
declare function replace(target: string | RegExp, replacement: string | ((s: string, ...args: Array<unknown>) => string)): (s: string) => string;
/**
 * @param target (if RegExp, must include the global flag)
 * @param replacement
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 * const f = S.replaceAll("e", "_");
 * const g = S.replaceAll(/[a-e]/g, S.toUpperCase);
 * f("weasel");       // "w_as_l"
 * g("weasel");       // "wEAsEl"
 * ```
 */
declare function replaceAll(target: string | RegExp, replacement: string | ((s: string, ...args: Array<unknown>) => string)): (s: string) => string;
/**
 * Negative indices count backwards from the beginning of the array. Like the built-in String.slice(),
 * the slice does not include the index at the end.
 *
 * @remarks
 * Returns an empty string if an index is fractional or NaN.
 *
 * @param start
 * @param end
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 * const f = S.slice(2);
 * const g = S.slice(-2);
 * const h = S.slice(2, 3);
 * f("weasel");      // "asel"
 * g("weasel");      // "el"
 * h("weasel");      // "a"
 */
declare function slice(start: number, end?: number): (_: string) => string;
/**
 * @param str
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 * const f = S.split("as");
 * f("class of weasels");    // ["cl", "s of we", "els"]
 * ```
 */
declare function split(str: string): (s: string) => string[];
/**
 * @param str
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 *
 * const startsWithWea = S.startsWith("wea");
 * startsWithWea("weasel");    // true
 * startsWithWea("_wea");      // false
 * startsWithWea("we");        // false
 * ```
 */
declare function startsWith(str: string): (s: string) => boolean;
/**
 * @param s
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 * S.toLowerCase("WEASEL");   // "weasel"
 * ```
 */
declare function toLowerCase(s: string): string;
/**
 * @param s
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 * S.toUpperCase("weasel");   // "WEASEL"
 * ```
 */
declare function toUpperCase(s: string): string;
/**
 * @param s
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 * S.trim("  weasel  ");   // "weasel"
 * ```
 */
declare function trim(s: string): string;
/**
 * @param s
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 * S.trimLeft("  weasel  ");   // "weasel  "
 * ```
 */
declare function trimLeft(s: string): string;
/**
 * @param s
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 * S.trimRightt("  weasel  ");   // "  weasel"
 * ```
 */
declare function trimRight(s: string): string;

declare const string_append: typeof append;
declare const string_at: typeof at;
declare const string_concat: typeof concat;
declare const string_endsWith: typeof endsWith;
declare const string_includes: typeof includes;
declare const string_includesRegex: typeof includesRegex;
declare const string_insert: typeof insert;
declare const string_length: typeof length;
declare const string_matches: typeof matches;
declare const string_matchGroups: typeof matchGroups;
declare const string_matchGroupsAll: typeof matchGroupsAll;
declare const string_padLeft: typeof padLeft;
declare const string_padRight: typeof padRight;
declare const string_prepend: typeof prepend;
declare const string_replace: typeof replace;
declare const string_replaceAll: typeof replaceAll;
declare const string_slice: typeof slice;
declare const string_split: typeof split;
declare const string_startsWith: typeof startsWith;
declare const string_toLowerCase: typeof toLowerCase;
declare const string_toUpperCase: typeof toUpperCase;
declare const string_trim: typeof trim;
declare const string_trimLeft: typeof trimLeft;
declare const string_trimRight: typeof trimRight;
declare namespace string {
  export {
    string_append as append,
    string_at as at,
    string_concat as concat,
    string_endsWith as endsWith,
    string_includes as includes,
    string_includesRegex as includesRegex,
    string_insert as insert,
    string_length as length,
    string_matches as matches,
    string_matchGroups as matchGroups,
    string_matchGroupsAll as matchGroupsAll,
    string_padLeft as padLeft,
    string_padRight as padRight,
    string_prepend as prepend,
    string_replace as replace,
    string_replaceAll as replaceAll,
    string_slice as slice,
    string_split as split,
    string_startsWith as startsWith,
    string_toLowerCase as toLowerCase,
    string_toUpperCase as toUpperCase,
    string_trim as trim,
    string_trimLeft as trimLeft,
    string_trimRight as trimRight,
  };
}

export { append as a, at as b, concat as c, includesRegex as d, endsWith as e, insert as f, matchGroups as g, matchGroupsAll as h, includes as i, padRight as j, prepend as k, length as l, matches as m, replaceAll as n, slice as o, padLeft as p, split as q, replace as r, string as s, startsWith as t, toLowerCase as u, toUpperCase as v, trim as w, trimLeft as x, trimRight as y };
