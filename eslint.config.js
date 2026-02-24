import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import tailwindcssPlugin from "eslint-plugin-tailwindcss";

export default [
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: typescriptParser,
            ecmaVersion: "latest",
            sourceType: "module",
        },
        plugins: {
            "@typescript-eslint": typescriptPlugin,
            react: reactPlugin,
            tailwindcss: tailwindcssPlugin,
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            "@typescript-eslint/no-unused-vars": ["warn"],
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
            "tailwindcss/classnames-order": "warn",
        },
    },
];
