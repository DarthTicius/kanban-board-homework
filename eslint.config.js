import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
	parser: '@typescript-eslint/parser',
    languageOptions: {
		ecmaVersion: 2020,
		globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
	  ...react.configs.recommended.rules,
	  ...react.configs['jsx-runtime'].rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
		// plugins: ['react', '@typescript-eslint', 'jsx-a11y', 'prettier'],
		overrides: [
			{
				files: ['*.astro'],
				parser: 'astro-eslint-parser',
				parserOptions: {
					parser: '@typescript-eslint/parser',
					extraFileExtensions: ['.astro'],
				},
				rules: {
					'astro/prefer-class-list-directive': 'error',
					'astro/no-conflict-set-directives': 'error',
					'astro/no-set-html-directive': 'off',
					'react/no-unknown-property': 'off',
					'import/no-unresolved': [
						'error',
						{ ignore: ['astro:content'] },
					],
					'astro/prefer-split-class-list': [
						'error',
						{
							splitLiteral: true,
						},
					],
					'react/self-closing-comp': 'off',
				},
			},
		],
		settings: {
			'import/parsers': {
				'@typescript-eslint/parser': ['.ts', '.tsx'],
			},
			'import/resolver': {
				typescript: {
					project: ['tsconfig.json'],
				},
			},
		},
		rules: {
			'import/no-extraneous-dependencies': [
				'error',
				{ devDependencies: true },
			],
			curly: ['error', 'all'],
			'react/jsx-no-leaked-render': 'error',
			'react/jsx-filename-extension': [
				'warn',
				{ extensions: ['.js', '.jsx', '.tsx', '.ts'] },
			],
			'react/prop-types': 0,
			'react/no-danger': 'warn',
			'react/destructuring-assignment': 'warn',
			'array-callback-return': 'warn',
			'no-shadow': 'warn',
			eqeqeq: 'error',
			'no-dupe-else-if': 'error',
			'react/jsx-no-useless-fragment': 'error',
			'react/state-in-constructor': 'error',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'prettier/prettier': ['warn'],
			'import/order': [
				'error',
				{
					groups: [
						['builtin', 'external'],
						'internal',
						['parent', 'sibling', 'index'],
					],
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],
		},

    },
  },
)
