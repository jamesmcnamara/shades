import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    format: 'cjs',
    file: 'lib/bundle.js',
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**', 
    }),
    commonjs(),
  ]
}
