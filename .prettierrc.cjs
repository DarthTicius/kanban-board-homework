module.exports = {
	extends: [
	  'eslint:recommended',
	  'plugin:react/recommended',
	  'prettier',
	],
	settings: {
	  react: {
		pragma: 'h',
		version: 'detect',
	  },
	},
	plugins: ['react'],
  };
