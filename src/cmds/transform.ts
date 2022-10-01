// my-module.js
import * as yargs from 'yargs';
import chalk from 'chalk';
import { optOutput } from './lib';

const cmd = 'transform';
const cmdTransform:yargs.CommandModule = {
  // command: `$0 <input_file> [options]`,
  // command: `$0 ` + chalk.cyanBright(`${cmd}`) + ` ` + chalk.greenBright('<input_file>') + ` ` + ` [options]`,
  command: `$0 ` + chalk.greenBright('<input_file>') + ` ` + ` [options]`,
  aliases: ['transform', 'trans', 'tran', 'tr', 't'],
  describe: 'Apply SVG transformations to paths',
  builder: (yargs) => {
    return yargs
    // .usage(`\n\nUSAGE\n=====\n $0 <input_file> [options]`)
    // .usage(`\n\n` + chalk.cyanBright(`${cmd}`) + `\n=====\n` + chalk.cyanBright(`${cmd}`) + ` ` + chalk.greenBright('<input_file>') + ` ` + ` [options]`)
    // .usage(` ` + chalk.cyanBright(`${cmd}`) + ` ` + chalk.greenBright('<input_file>') + ` ` + ` [options]`)
    // .usage(`$0 <input_file> [options]`)
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
