// my-module.js
import * as yargs from 'yargs';
import { optOutput } from './lib';

const cmd = 'pathify';
const cmdPathify:yargs.CommandModule = {
  command: `${cmd} <input_file> [options]`,
  aliases: ['pathify', 'path', 'p'],
  describe: 'Turns SVG shapes (polygon, polyline, rect, group) into SVG paths',
  builder: (yargs) => {
    return yargs.usage(`\n\nUSAGE\n=====\n $0 <input_file> [options]`)
    .positional("input_file", {describe: "SVG file to pathify"})
    .option("o", optOutput)
    // .help('help');
      .help(false)
      .version(false)
  },
  handler: (argv) => {
    console.log("Pathifying, argv:\n", argv);
    return;
  },
}
export default cmdPathify;
export { cmdPathify };
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
