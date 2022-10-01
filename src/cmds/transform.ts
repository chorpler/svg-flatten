// my-module.js
import * as yargs from 'yargs';
import { optOutput } from './lib';

const cmd = 'transform';
const cmdTransform:yargs.CommandModule = {
  command: `${cmd} <input_file> [options]`,
  aliases: ['transform', 'trans', 'tran', 'tr', 't'],
  describe: 'Apply SVG transformations to paths',
  builder: (yargs) => {
    return yargs.usage(`\n\nUSAGE\n=====\n $0 <input_file> [options]`)
    .positional("input_file", {describe: "SVG file to transform"})
    .option("o", optOutput)
    // .help('help');
      .help(false)
      .version(false)
  },
  handler: (argv) => {
    console.log("Transforming, argv:\n", argv);
    return;
  },
}
// export default cmdTransform;
export { cmdTransform };
// exports.usage = 'flatten [-o <output_file>] <input_file>'
// exports.describe = 'make a get HTTP request'
// exports.builder = {
//   banana: {
//     default: 'cool'
//   },
//   batman: {
//     default: 'sad'
//   }
// }

// exports.handler = function (argv) {
//   // do something with argv.
// }
