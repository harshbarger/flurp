# Flurp
Flurp is a functional programming library written in and for TypeScript. In contains both fundamental FP utilities such as `pipe` and `flow` and a variety of utilities for working with strings, arrays, objects, etc. immutably within pipelines.

# This is early stage work.
If you've stumbled upon this, you're welcome to use it. But if this hasn't been bumped to v-1.0 yet, assume all sorts of things could change.

## Design Philosophy
Practicality and simplicity are more valuable than complex FP theory. You don't even need to have heard of monads, functors, or Fantasy Land to use Flurp effectively.

Concise code that clearly expresses its purpose is more important than a minimal API surface. You always can compose complex functions from a few fundamental ones, but you shouldn't always have to. 

In the spirit of TypeScript, if it looks like an error, it should be treated as an error. Like most FP libraries, Flurp does not throw exceptions, but it's not afraid to return nullish values when the input looks strange. 

Flurp functions are designed to be used primarily in pipelines, so (with a few exceptions such as array creation utilities) Flurp functions are either unary functions themselves or else functions that return unary functions.

## How is Flurp different?

The big difference between Flurp and similar libraries such as fp-ts (TODO: link) or ts-belt is how error states are handled. Flurp does not have a Maybe or Either monad. Instead, it relies on `undefined` and `null` to represent error states, and it provides utilities in the `result` module to pass such values harmlessly through your pipeline. Essentially, Flurp provides the resilient error-handling of the traditional FP monad pattern, but without so much wrapping and unwrapping.

The other difference is simply which utility functions are included. Though Flurp does not attempt to contain every utility function found in other common libraries, it does add some distinctive functions of its own.




