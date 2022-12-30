import summary from 'rollup-plugin-summary';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import { copy } from '@web/rollup-plugin-copy';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    typescript(),
    replace({'Reflect.decorate': 'undefined', preventAssignment: true }),
    nodeResolve(),
    copy({ patterns: '**/*.{css,jpg,json,svg}', rootDir: 'src' }),
    summary(),
  ],
};
