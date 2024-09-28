import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { sourceType: "module", project: "./tsconfig.json" },
      globals: globals.node,
    },
  },
  {
    rules: {
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "no-console": "warn",
    },
  },
  { ignores: ["dist/*", "build/*"] },
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      semi: "off",
      "@typescript-eslint/semi": "error",
      "no-extra-semi": "warn",
      curly: "warn",
      quotes: ["error", "double", { allowTemplateLiterals: true }],
      eqeqeq: "error",
      indent: "off",
      "@typescript-eslint/indent": ["warn", "tab", { SwitchCase: 1 }],
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "_" },
      ],
      "no-case-declarations": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-misused-promises": "off",
    },
  },
  eslintConfigPrettier
);
