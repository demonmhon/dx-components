import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { copy } from '@web/rollup-plugin-copy';
import { glob } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import summary from 'rollup-plugin-summary';

export default {
  input: Object.fromEntries(
    glob.sync('src/**/*.ts').map((file) => [
      path.relative(
        'src',
        file.slice(0, file.length - path.extname(file).length)
      ),
      fileURLToPath(new URL(file, import.meta.url)),
    ])
  ),
  plugins: [
    typescript(),
    nodeResolve(),
    copy({ patterns: '**/*.{css,jpg,json,svg}', rootDir: 'src' }),
    summary(),
  ],
  output: [
    {
      format: 'esm',
      dir: './dist',
    },
  ],
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
};
