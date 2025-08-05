module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset', {
      jsx: {
        injectH: true
      }
    }]
  ],
  plugins: [
    ["@vue/babel-plugin-jsx", {
      mergeProps: false
    }]
  ]
}
