// this file will not afect the sandbox but will
// afect the deployment and dowload

import postcss from "rollup-plugin-postcss";
import svelte from "rollup-plugin-svelte";
import livereload from "rollup-plugin-livereload";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "index.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/bundle.js"
  },
  plugins: [
    postcss({
      extract: true,
      minimize: production,
      sourceMap: !production
    }),
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      css: css => {
        css.write("public/bundle.css");
      }
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({ browser: true }),
    commonjs(),
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ]
};
