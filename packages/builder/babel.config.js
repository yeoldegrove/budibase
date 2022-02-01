module.exports = {
  presets: ["@babel/preset-env"],
  sourceMaps: "inline",
  retainLines: true,
  plugins: [
    "svelte-inline-compile",
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true,
      },
    ],
  ],
}
