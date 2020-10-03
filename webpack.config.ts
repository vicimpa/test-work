import { join } from "path";
import { Configuration } from "webpack";

const { argv, env } = process

const testArg = (arg: string) =>
  argv.indexOf(arg) !== -1

const devMode = !testArg('--prod')
const watchMode = testArg('--watch')

const mode = env.NODE_ENV = devMode ?
  'development' : 'production'

const entry: Configuration['entry'] =
  { main: "./index.tsx" }

const output: Configuration['output'] = {
  filename: '[name].js',
  path: join(__dirname, 'dist'),
  publicPath: 'dist/'
}

const devtool: Configuration['devtool'] =
  devMode ? 'source-map' : false

const watch: Configuration['watch'] =
  devMode || watchMode

const resolve: Configuration['resolve'] = {
  extensions:
    ['.ts', '.tsx', '.js', '.json']
}

const modules: Configuration['module'] = {
  rules: [
    {
      test: /\.(eot|woff|woff2|ttf|gif|svg|png|jpg)$/,
      loader: {
        loader: 'file-loader',
        options: {
          regExp: /([a-z0-9]+)\/([a-z0-9\-\_]+)\/[a-z0-9\-\_]+\.[a-z]+$/i,
          name: `[2]/[1]/[name].[ext]`
        }
      }
    },
    {
      test: /\.tsx?$/,
      loader: "ts-loader"
    }
  ]
}

export {
  entry, output,
  mode, devtool,
  watch, resolve,
  modules as module
}