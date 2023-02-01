Flurp is a functional programming library written in and for TypeScript. In contains both fundamental FP utilities such as `pipe` and `flow` and a variety of utilities for working with strings, arrays, objects, etc. immutably within pipelines.

## This is early stage work.

I am "dogfooding" this library in one of my own projects, making improvements as I see issues in the developer experience, function selection, etc. Until I bump this to v-1.0, breaking changes are possible. 

## Installation

```
npm install flurp
```

## General Principles

Because functional programming typically uses pipelines, almost all Flurp functions are either unary functions themselves (e.g., `S.toUpperCase` below), or functions that return unary function (e.g., `A.join` below). There are no standalone forms of the functions designed for use outside the pipeline, but you can always create and immediately invoke a function as shown in the last example below.

```ts
// A and S are the array and string modules
import { pipe, flow, A, S } from "flurp";  

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

## `pipe` module

The module contains the workhorses of function composition--[pipe](https://harshbarger.github.io/flurp/functions/pipe.pipe.html) and [flow](https://harshbarger.github.io/flurp/functions/pipe.flow.html). There is no `compose` function, because the data-first style of `pipe` allows TypeScript to infer types more effectively than the data-last style of a `compose` function would.

This module also includes [tap](https://harshbarger.github.io/flurp/functions/pipe.tap.html), which is used for side effects in the midst of a pipeline. Its primary use case is to add `console.log` statements for debugging.

## `array` module

Except for [createWith](), the functions in this module either are functions (or return functions) which act on an array. These are all pure functions that do not mutate the original array.

```ts
import { A } from "flurp";

const lastThree = A.takeLast(3);
const data = [10, 20, 30, 40, 50];
lastThree(data);    // [30, 40, 50]
data;               // still [10, 20, 30, 40, 50]
```

## `pojo` module

This module is named `pojo` rather than `object` to emphasize that it is designed for "Plain Old JavaScript Objects", not any sort of object imaginable. Furthermore, these plain old javascript objects should have only string keys. 

This module contains basic functions for working with objects, but is not extensive. For example, it does not contain a function of the form `path('x', 'y', 'z')(myObject)` to get `myObject.x.y.x`. As convenient as they seem, such functions are often difficult to type appropriately. If you use deeply nested objects regularly enough to wish for more power than Flurp provides, I recommend that you choose a robust lens library designed for the purpose.

```ts
import { P } from "flurp";

const multiplyByTen = P.map(N.multiply(10));
multiplyByTen({ x: 3, y: 4 });   // { x: 30, y: 40 }
```

## `string` module

All functions in this module either are functions (or return functions) which act on an array. These are all pure functions that do not mutate the original array.

## `number` module

## `guards` module

## `logic` module

For example, `get(NaN)(myArray)` from Flurp's `array` module would return a nullish value, even though JavaScript's `myArray.at(NaN)` would return `myArray[0]`. 