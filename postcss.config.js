import purgecss from "@fullhuman/postcss-purgecss";
const production = !process.env.ROLLUP_WATCH;

export const plugins = [
  require("postcss-import")(),
  require("tailwindcss"),
  require("autoprefixer"),
  // Only purge css on production
  production &&
    purgecss({
      content: ["./**/*.html", "./**/*.svelte"],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
    })
];
