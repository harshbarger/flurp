# Yep, this is an overview.

For example, `get(NaN)(myArray)` from Flurp's `array` module would return a nullish value, even though JavaScript's `myArray.at(NaN)` would return `myArray[0]`. 