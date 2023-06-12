module.exports = {
    env: {
        node : true
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended'
    ],
    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 12,
        requireConfigFile: false,
    },
    plugins: [
        'vue'
    ],
    rules: {
        'no-unused-vars': 'off',
        'no-undefined': 'off'
    }
}
