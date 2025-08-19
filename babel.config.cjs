const presets = [
  [
    // The preset library that we installed
    "@babel/preset-env",
    {
      // The browser versions where we want our code to support. This could
      // be adjusted to support more or less different browsers. Refer to
      // https://babeljs.io/docs/options#targets for details.
      targets: "defaults, IE 11, not dead",

      // Use polyfills for the browsers specified in the above targets option
      // Babel uses polyfills from the core-js library
      useBuiltIns: "entry",
      corejs: "^3",
    },
  ],
];

module.exports = { presets };
