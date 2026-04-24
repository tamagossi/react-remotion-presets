import path from "node:path";
import { config } from "@remotion/eslint-config-flat";
import tailwindcss from "eslint-plugin-tailwindcss";
import unusedImports from "eslint-plugin-unused-imports";
import perfectionist from "eslint-plugin-perfectionist";
import security from "eslint-plugin-security";
import promise from "eslint-plugin-promise";

import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
	...config,
	...tailwindcss.configs["flat/recommended"],
	{
		settings: {
			tailwindcss: {
				config: path.resolve(__dirname, "src/index.css"),
			},
		},
	},
	{
		plugins: {
			"unused-imports": unusedImports,
			perfectionist,
			security,
			promise,
		},
		rules: {
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"no-mixed-spaces-and-tabs": "off",
			"promise/always-return": "off",
			"react/prop-types": "off",
			"react/react-in-jsx-scope": "warn",
			"security/detect-object-injection": "off",
			"unused-imports/no-unused-imports": "error",
			"no-restricted-syntax": [
				"error",
				{
					"selector": "FunctionDeclaration[id.name=/^handle/]",
					"message": "Function names must not start with 'handle'. Use descriptive action verbs instead (e.g., 'downloadPayslip' not 'handleDownload')."
				},
				{
					"selector": "VariableDeclarator[id.name=/^handle/][init.type='ArrowFunctionExpression']",
					"message": "Function names must not start with 'handle'. Use descriptive action verbs instead (e.g., 'downloadPayslip' not 'handleDownload')."
				},
				{
					"selector": "VariableDeclarator[id.name=/^handle/][init.type='FunctionExpression']",
					"message": "Function names must not start with 'handle'. Use descriptive action verbs instead (e.g., 'downloadPayslip' not 'handleDownload')."
				},
				{
					"selector": "MethodDefinition[key.name=/^handle/]",
					"message": "Method names must not start with 'handle'. Use descriptive action verbs instead (e.g., 'downloadPayslip' not 'handleDownload')."
				},
				{
					"selector": "Property[key.name=/^handle/][value.type=/FunctionExpression$/]",
					"message": "Method names must not start with 'handle'. Use descriptive action verbs instead (e.g., 'downloadPayslip' not 'handleDownload')."
				}
			],
			"perfectionist/sort-exports": [
				"error",
				{
					"ignoreCase": true,
					"order": "asc",
					"partitionByNewLine": true,
					"type": "alphabetical"
				}
			],
			"perfectionist/sort-interfaces": [
				"error",
				{
					"ignoreCase": true,
					"order": "asc",
					"partitionByNewLine": true,
					"type": "alphabetical",
					"groups": [
						"unknown",
						"multiline-member"
					]
				}
			],
			"perfectionist/sort-objects": [
				"error",
				{
					"ignoreCase": true,
					"order": "asc",
					"partitionByNewLine": true,
					"type": "alphabetical",
					"groups": [
						"unknown",
						"multiline-member"
					]
				}
			],
			"perfectionist/sort-union-types": [
				"error",
				{
					"ignoreCase": true,
					"order": "asc",
					"partitionByNewLine": true,
					"type": "alphabetical"
				}
			],
			"perfectionist/sort-variable-declarations": [
				"error",
				{
					"ignoreCase": true,
					"order": "asc",
					"partitionByNewLine": true,
					"type": "alphabetical",
					"groups": [
						"unknown",
						"multiline-member"
					]
				}
			],
			"react/jsx-sort-props": [
				"error",
				{
					"callbacksLast": false,
					"shorthandLast": false,
					"multiline": "last",
					"ignoreCase": false,
					"noSortAlphabetically": false,
					"reservedFirst": false
				}
			],
			"unused-imports/no-unused-vars": [
				"error",
				{
					"vars": "all",
					"varsIgnorePattern": "^_",
					"args": "after-used",
					"argsIgnorePattern": "^_"
				}
			],
			"perfectionist/sort-switch-case": [
				"error",
				{
					"type": "alphabetical",
					"order": "asc"
				}
			]
		}
	}
];
