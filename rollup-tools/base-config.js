/* global process */

import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';

const production = !process.env.ROLLUP_WATCH;
const unminify = process.env.UNMINIFY;

export default function createConfig({
  input,
  outputFile,
  reloadPath,
  serve,
  serveOpts = {},
}) {
  return {
    input,
    output: {
      sourcemap: true,
      format: 'iife',
      name: 'app',
      file: outputFile,
    },
    plugins: [
      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration -
      // consult the documentation for details:
      // https://github.com/rollup/plugins/tree/master/packages/commonjs
      resolve({
        browser: true,
      }),
      commonjs(),

      // In dev mode, call `npm run start` once
      // the bundle has been generated
      !production && serve && serve(serveOpts),

      // Watch the directory and refresh the
      // browser on changes when not in production
      !production && livereload(reloadPath),

      // If we're building for production (npm run build
      // instead of npm run dev), minify
      production && !unminify && terser(),

      json(),
    ],
    watch: {
      clearScreen: false,
    },
  };
}
