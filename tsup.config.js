import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/logic.ts",
    "src/array.ts",
    "src/number.ts",
    "src/guards.ts",
    "src/string.ts",
    "src/pojo.ts",
    "src/result.ts",
    "src/pipe.ts",
    "src/comparator.ts",
  ],
  clean: true,
  target: "es2021",
  dts: true,
});
