// my-module.js
import * as yargs from 'yargs';
import chalk from 'chalk';
import { optOutput } from './lib';

const cmd = 'flatten';
const cmdFlatten:yargs.CommandModule = {
  command: `$0 ` + chalk.greenBright('<input_file>') + ` ` + ` [options]`,
  // command: `\n\n` + chalk.cyanBright(`${cmd}`) + `\n=====\n $0 ` + chalk.greenBright('<input_file>') + ` ` + ` [options]`,
  aliases: ['flatten', 'flat', 'fl', 'f'],
  // describe: 'Converts groups of paths to a fat path, combining all child paths into one',
  describe: 'Convert group to single path',
  builder: (yargs) => {
    return yargs
    // .usage(`\n\nUSAGE\n=====\n $0 <input_file> [options]`)
    // .usage(`\n\n` + chalk.cyanBright(`${cmd}`) + `\n=====\n` + chalk.cyanBright(`${cmd}`) + ` ` + chalk.greenBright('<input_file>') + ` ` + ` [options]`)
    // .usage(` ` + chalk.cyanBright(`${cmd}`) + ` ` + chalk.greenBright('<input_file>') + ` ` + ` [options]`)
    // .usage(`$0 <input_file> [options]`)
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
