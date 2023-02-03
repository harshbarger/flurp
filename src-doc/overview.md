Flurp is a functional programming library written in and for TypeScript. It contains fundamental FP utilities such as `pipe` and `flow` as well as a variety of utilities for working with strings, arrays, objects, etc. immutably.

## This is early stage work.

I am "dogfooding" this library in one of my own projects, making improvements as I see issues in the developer experience, function selection, etc. Until I bump this to v-1.0, breaking changes are possible. 

## Installation

```
npm install flurp
```

## Null Checks

For type inference to work correctly with some modules, you should enable the `strictNullChecks` property in your `tsconfig.json`.

```json
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

Or, to include other type safety measures generally recommended as best practice as well:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

## General Principles

Because functional programming typically uses pipelines, almost all Flurp functions are either unary functions themselves (e.g., `S.toUpperCase` below), or functions that return unary function (e.g., `A.join` below). There are no standalone forms of the functions designed for use outside the pipeline, but you can always create and immediately invoke a function as shown in the last example below.

```ts
// A and S are the array and string modules
import { pipe, flow } from "flurp";  
import * as A from "flurp/array";
import * as S from "flurp/string";

pipe(
  ["hello", "world"],
  A.join(" "),
  S.toUpperCase
);   // "HELLO WORLD"

// Or for point-free style (often useful, but can make type inference more difficult)
const joinAndUpperCase = flow(
  A.join(" "),
  S.toUpperCase
);
joinAndUpperCase(["hello", "world"]);   // "HELLO WORLD"

// Outside of a pipeline
A.join(" ")(["hello", "world"]);  "hello world"
```
In the spirit of TypeScript, things that look like errors tend to be considered errors, even where JavaScript's specs may be more tolerant. For example, `get(NaN)(myArray)` from the `array` module is considered an error, even though JavaScript's `myArray.at(NaN)` would return `myArray[0]`. 

Since this is a functional library that seeks to avoid side effects, it does not throw exceptions. Instead, `null` and `undefined` are used to indicate error conditions. Typically, `null` is used when the inquiry itself appears to be an error, while `undefined` is used when the inquiry itself is reasonable, but doesn't work on the data (e.g., an out of bounds array index).

```ts
import * as A from "flurp/array";

const sillyIndex = A.get(1.5); 
sillyIndex([1, 2, 3]);       // null

const outOfBounds = A.get(5);
outOfBounds([1, 2, 3]);      // undefined
```

Naming conventions are always a challenge since the various existing similar libraries, as well as built-in JavaScript functions, sometimes use different conventions. As a general rule, I have given some deference to existing conventions, though I have chosen to prioritize internal consistency over external conventions. For example, I chose `get` for obtaining an array element instead of `at` for consistency with the corresponding functions in the `string` and `pojo` modules.

## `index` module 

The main module contains the workhorses of function composition--[pipe](https://harshbarger.github.io/flurp/functions/index.pipe.html) and [flow](https://harshbarger.github.io/flurp/functions/index.flow.html). There is no `compose` function, because the data-first style of `pipe` allows TypeScript to infer types more effectively than the data-last style of a `compose` function would.

This module also includes [tap](https://harshbarger.github.io/flurp/functions/index.tap.html), which is used for side effects in the midst of a pipeline. Its primary use case is to add `console.log` statements for debugging.

## `array` module

Besides the usual functions that act on arrays (or create functions that do), this module contains the array creation utility [createWith](). Functions in this module do not mutate the input arrays.

## `result` module

These functions help supply the resilient error handling capabilities provided by the Maybe monad in some other languages and libraries. Flurp uses `null` and `undefined` to represent error conditions, but supplies wrappers to pass error values through and bypass function execution, as would happen with a monad's `map` function.

```ts
import * as R from "flurp/result";
import * as N from "flurp/number";

const double = R.map(N.multiply(2));
double(5);             // 10
double(undefined);     // undefined
double(null);          // null
```

```ts
import * as A from "flurp/array";

const lastThree = A.takeLast(3);
const data = [10, 20, 30, 40, 50];
lastThree(data);    // [30, 40, 50]
data;               // still [10, 20, 30, 40, 50]
```

## `pojo` module

This module is named `pojo` rather than `object` to emphasize that it is designed for "Plain Old JavaScript Objects", not any sort of object imaginable. Furthermore, these plain old javascript objects should have only string keys. 

This module contains basic functions for working with objects, but is not extensive. For example, it does not contain a function of the form `path('x', 'y', 'z')(myObject)` to get `myObject.x.y.x`. As convenient as they seem, such functions are often difficult to type appropriately. If you use deeply nested objects regularly enough to wish for more power than Flurp provides, I recommend that you choose a robust lens library designed for the purpose.

```ts
import * as P from "flurp/pojo";

const multiplyByTen = P.map(N.multiply(10));
multiplyByTen({ x: 3, y: 4 });   // { x: 30, y: 40 }
```

## `string` module

All functions in this module either are functions (or return functions) which act on an string. These are all pure functions that do not mutate the original strings.

```ts
import * as S from "flurp/string";

const hasVowel = S.includesRegex(/[aeiou]/i);
hasVowel("weasel");     // true
```

## `number` module

These are functions that accept a number as input, or return such functions.

```ts
import * as N from "flurp/number";

const zeroToTen = N.isBetween(0, 10);
zeroToTen(-4);     // false
```

## `guard` module

This module contains boolean functions that test for common types.

```ts
import * as G from "flurp/guard";
G.isFunction(x => x + 1);     // true
G.islNullish(undefined);   // true
```

## `logic` module

This module contains various functions for applying boolean and conditional logic, as well as a handful of functions that don't quite fit elsewhere.

```ts
import * as L from "flurp/logic";
import * as N from "flurp/number";

const negativeText = L.ifElse(
  N.isNegative,
  x => `${x} is negative.`,
  x => `${x} is non-negative.`
);
negativeTExt(-4);   // '-4 is negative.'

const positiveEvenDivBy3 = L.allPass(
  N.isPositive,
  N.isEven,
  (x: number) => x % 3 === 0
);
f(6);   // true
```

## `comparator` module

The functions in this module serve as comparators to use when sorting arrays. They are designed to fix some potentially problematic behaviors of JavaScript's default comparator (e.g., converting numbers to strings for comparison).

```ts
import * as A from "flurp/array";
import * as C from "flurp/comparator";

const sortNumbers = A.sortWith(C.numericDesc);
sortNumbers([30, 6, 1, NaN, 200, 5]);      // [200, 30, 6, 5, 1, NaN]
```

