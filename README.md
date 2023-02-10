Flurp is a functional programming library written in and for TypeScript. It contains both fundamental FP utilities such as `pipe` and `flow` and a variety of utilities for working with strings, arrays, objects, etc. immutably within pipelines.

## Warning: Early stage & Experimental

Right now, this is a better project to watch than to use. I'm "dogfooding" this library in a large project of my own, and I'm fixing issues as I discover them. While the unit tests ensure that the functions do what they claim to do, I'm finding a fair number of issues related to types and related developer experience. In some cases, I'm changing fallback and error behavior to make types more predictable.

When I believe this library is ready, I will bump the version to 1.0.

## Documentation
The docs are found [here](https://harshbarger.github.io/flurp/).

## Design Philosophy
Practicality and simplicity are more valuable than complex FP theory. You don't even need to have heard of monads, functors, or Fantasy Land to use Flurp effectively.

Concise code that clearly expresses its purpose is more important than a minimal API surface. You always can compose complex functions from a few fundamental ones, but you shouldn't always have to. 

In the spirit of TypeScript, if it looks like an error, it should be treated as an error. Like most FP libraries, Flurp does not throw exceptions, but return nullish values when appropriate. 

Flurp functions are designed to be used primarily in pipelines, so (with a few exceptions such as array creation utilities) Flurp functions are either unary functions themselves or else functions that return unary functions.

## How is Flurp different?

The big difference between Flurp and similar libraries such as [fp-ts](https://gcanti.github.io/fp-ts/) or [ts-belt](https://mobily.github.io/ts-belt/) is how error states are handled. Flurp does not have a Maybe or Either monad. Instead, it relies on `undefined` and `null` to represent error states, and it provides a wrapper function `safe` to pass such values harmlessly through your pipeline. This gives Flurp the resilient error-handling of the traditional FP monad pattern, but without so much wrapping and unwrapping.

The other difference is simply which utility functions are included. Though Flurp does not attempt to contain every utility function found in other common libraries, it does add some distinctive functions of its own.

## License

BSD 3-clause license, as described in the LICENSE.md file.



