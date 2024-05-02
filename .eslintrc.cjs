module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        '@typescript-eslint/no-namespace': 'off',
        'react/react-in-jsx-scope': 'off',
        // 'react/jsx-max-props-per-line': ['warn', { maximum: 4 }],
        'react/prop-types': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
    settings: {
        react: {
            "version": "detect"
        }
    }
};

