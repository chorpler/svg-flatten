// my-module.js
import * as yargs from 'yargs';
import { optOutput } from './lib';

const cmd = 'flatten';
const cmdFlatten:yargs.CommandModule = {
  command: `${cmd} <input_file> [options]`,
  aliases: ['flatten', 'flat', 'fl', 'f'],
  describe: 'Converts groups of paths to a fat path, combining all child paths into one',
  builder: (yargs) => {
    return yargs.usage(`\n\nUSAGE\n=====\n $0 <input_file> [options]`)
    .positional("input_file", {describe: "SVG file to flatten"})
    .option("o", optOutput)
    // .help('help');
      .help(false)
      .version(false)
  },
  handler: (argv) => {
    console.log("Flattening, argv:\n", argv);
    return;
  },
}
export { cmdFlatten };
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
