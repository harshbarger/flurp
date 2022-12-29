# Flurp: An Overview

Flurp is a functional programming library written in and for TypeScript. In contains both fundamental FP utilities such as `pipe` and `flow` and a variety of utilities for working with strings, arrays, objects, etc. immutably within pipelines.

## This is early stage work in progress. Not really ready for production.

For example, `get(NaN)(myArray)` from Flurp's `array` module would return a nullish value, even though JavaScript's `myArray.at(NaN)` would return `myArray[0]`. 