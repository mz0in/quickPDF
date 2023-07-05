module.exports = {
  singleQuote: true,
  semi: false,
  printWidth: 100,
  trailingComma: 'none',
  tabWidth: 2,
  proseWrap: 'always',
  overrides: [
    {
      files: ['*.html'],
      options: {
        parser: 'go-template'
      }
    }
  ],
  plugins: [require.resolve('prettier-plugin-go-template')]
}
