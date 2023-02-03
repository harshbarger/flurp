/**
 * @internal
 * If index is invalid, returns null
 * If index is negative, return positive equivalent index
 * Otherwise return index
 */
function adjIndex(s: string, i: number) {
  if (i >= s.length || i < -s.length || !Number.isInteger(i)) {
    return null;
  }

  return i >= 0 ? i : s.length + i;
}

/**
 * @param str
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 *
 * const appendSel = S.append("sel");
 * appendSel("wea");    // "weasel"
 * ```
 */
export function append(str: string) {
  return (s: string) => s + str;
}

/**
 * @param strs
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 *
 * const concatenate = S.concat("e", "ase", "l");
 * concatenate("w");    // "weasel"
 * concatenate("");     // "easel"
 * ```
 */
export function concat(...strs: Array<string>) {
  return (s: string) => s.concat(...strs);
}

/**
 * @param str
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 *
 * const endsWithSel = S.endsWith("sel");
 * endsWithSel("weasel");    // true
 * endsWithSel("_sel");      // false
 * endsWithSel("el");        // false
 * ```
 */
export function endsWith(str: string) {
  return (s: string) => s.endsWith(str);
}

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
 *
 * const third = S.get(2);
 * const secondToLast = S.get(-2);
 * third("abcdef");           // c
 * secondToLast("abcdef");    // e
 * ```
 */
export function get(i: number) {
  return function (s: string) {
    const idx = adjIndex(s, i);

    if (typeof idx === "number") {
      return s[idx];
    }

    return undefined;
  };
}

/**
 * @param str
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 *
 * const hasAs = S.includes("as");
 * hasAs("weasel");    // true
 * hasAs("hippo");     // false
 * ```
 */
export function includes(str: string) {
  return (s: string) => s.includes(str);
}

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
export function includesRegex(regex: RegExp) {
  return (s: string) => regex.test(s);
}

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
 *
 * const f = S.insert(2, "__");
 * const g = S.insert(6, "__");
 * const h = S.insert(-2, "__");
 * f("weasel");    // "we__asel"
 * g("weasel");    // "weasel__"
 * h("weasel");    // "weas__el"
 * ```
 */
export function insert(index: number, s: string) {
  return function (str: string) {
    const idx = adjIndex(str, index);

    if (typeof idx === "number") {
      return str.substring(0, idx) + s + str.substring(idx);
    }

    if (index === str.length) {
      return str + s;
    }

    return str;
  };
}

/**
 * @param s
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 *
 * S.length("weasel");   // 6
 * S.length("");         // 0
 * ```
 */
export function length(s: string) {
  return s.length;
}

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
export function matches(regex: RegExp) {
  if (regex.global) {
    return (s: string) => s.match(regex) || undefined;
  }

  return (_: string) => null;
}

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
export function matchGroups(regex: RegExp) {
  if (!regex.global) {
    return (s: string) => s.match(regex) || undefined;
  }

  return (_: string) => null;
}

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
export function matchGroupsAll(regex: RegExp) {
  if (regex.global) {
    return (s: string) => [...s.matchAll(regex)];
  }

  return (_: string) => null;
}

/**
 * @param len
 * @param str padding string (defaults to " ")
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 *
 * const leftDot = S.padLeft("10, ".");
 * const leftMulti = S.padLeft(10, "_.");
 * leftDot("weasel");        // "....weasel"
 * leftDot("grayweasel")     // "grayweasel"
 * leftMulti("weasel")       // "_._.weasel";
 * leftMulti("aweasel")      // "_._aweasel";
 * ```
 */
export function padLeft(len: number, str = " ") {
  return function (s: string) {
    if (s.length >= len) {
      return s;
    }

    if (str === "") {
      return null;
    }

    const padLength = len - s.length;
    const repeats = Math.ceil(padLength / str.length);
    const padding = str.repeat(repeats).substring(0, padLength);
    return padding + s;
  };
}

/**
 * @param len
 * @param str padding string (defaults to " ")
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 *
 * const rightDot = S.padRight("10, ".");
 * const rightMulti = S.padRight(10, "_.");
 * rightDot("weasel");        // "weasel...."
 * rightDot("grayweasel")     // "grayweasel"
 * rightMulti("weasel")       // "weasel_._.";
 * rightMulti("aweasel")      // "aweasel_._";
 * ```
 */
export function padRight(len: number, str = " ") {
  return function (s: string) {
    if (s.length >= len) {
      return s;
    }

    if (str === "") {
      return null;
    }

    const padLength = len - s.length;
    const repeats = Math.ceil(padLength / str.length);
    const padding = str.repeat(repeats).substring(0, padLength);
    return s + padding;
  };
}

/**
 * @param str
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 *
 * const prependWea = S.prepend("wea");
 * prependWea("sel");    // "weasel"
 * ```
 */
export function prepend(str: string) {
  return (s: string) => str + s;
}

/**
 * Replaces the first instance of a string or regular expression.
 *
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
 *
 * const underscoreForE = S.replace("e", "_");
 * const vowelToUpper = S.replace(/[aeiou]/, S.toUpperCase);
 * underscoreForE("weasel");       // "w_asel"
 * vowelToUpper("weasel");       // "wEasel"
 * ```
 */
export function replace(
  target: string | RegExp,
  replacement: string | ((s: string, ...args: Array<unknown>) => string)
) {
  // typing defs force the apparently redundant branch
  if (typeof replacement === "string") {
    return (s: string) => s.replace(target, replacement);
  }

  return (s: string) => s.replace(target, replacement);
}

/**
 * @param target (if RegExp, must include the global flag)
 * @param replacement
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 *
 * const underscoreForE = S.replace("e", "_");
 * const vowelToUpper = S.replace(/[aeiou]/, S.toUpperCase);
 * underscoreForE("weasel");       // "w_as_l"
 * vowelToUpper("weasel");         // "wEAsEl"
 * ```
 */
export function replaceAll(
  target: string | RegExp,
  replacement: string | ((s: string, ...args: Array<unknown>) => string)
) {
  // typing defs force the apparently redundant branch
  if (typeof replacement === "string") {
    return (s: string) => s.replaceAll(target, replacement);
  }

  return (s: string) => s.replaceAll(target, replacement);
}

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
 *
 * const f = S.slice(2);
 * const g = S.slice(-2);
 * const h = S.slice(2, 3);
 * f("weasel");      // "asel"
 * g("weasel");      // "el"
 * h("weasel");      // "a"
 */
export function slice(start: number, end?: number) {
  if (
    !Number.isInteger(start) ||
    (typeof end === "number" && !Number.isInteger(start))
  ) {
    return (_: string) => "";
  }

  return (s: string) => s.slice(start, end);
}

/**
 * @param str
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 *
 * const f = S.split("as");
 * f("class of weasels");    // ["cl", "s of we", "els"]
 * ```
 */
export function split(str: string) {
  return (s: string) => s.split(str);
}

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
export function startsWith(str: string) {
  return (s: string) => s.startsWith(str);
}

/**
 * @param s
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 *
 * S.toLowerCase("WEASEL");   // "weasel"
 * ```
 */
export function toLowerCase(s: string) {
  return s.toLowerCase();
}

/**
 * @param s
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 *
 * S.toUpperCase("weasel");   // "WEASEL"
 * ```
 */
export function toUpperCase(s: string) {
  return s.toUpperCase();
}

/**
 * @param s
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 *
 * S.trim("  weasel  ");   // "weasel"
 * ```
 */
export function trim(s: string) {
  return s.trim();
}

/**
 * @param s
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 *
 * S.trimLeft("  weasel  ");   // "weasel  "
 * ```
 */
export function trimLeft(s: string) {
  return s.trimStart();
}

/**
 * @param s
 *
 * @example
 * ```ts
 * import * as S from "flurp/string";
 *
 * S.trimRightt("  weasel  ");   // "  weasel"
 * ```
 */
export function trimRight(s: string) {
  return s.trimEnd();
}
