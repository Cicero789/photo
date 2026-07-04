import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    files: ["functions/**/*.ts"],
    languageOptions: { parser: tsparser, parserOptions: { project: "./functions/tsconfig.json" } },
    plugins: { "@typescript-eslint": tseslint },
    rules: { "@typescript-eslint/no-floating-promises": "error", "@typescript-eslint/no-misused-promises": "error" },
  },
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: { parser: tsparser, parserOptions: { project: "./tsconfig.json" } },
    plugins: { "@typescript-eslint": tseslint, "react-hooks": reactHooks },
    rules: {
      "@typescript-eslint/no-floating-promises": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];
