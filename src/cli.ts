#!/usr/bin/env ts-node

import chalk from 'chalk';
import * as path  from 'path';
import * as fs    from 'graceful-fs';
// import * as boxen from 'boxen';
// import * as YargsAll from 'yargs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as dotenv from 'dotenv';
import { SvgMod } from './svgmod';
import { commands } from './cmds';

// const chalk  = require('chalk');
// const path   = require('path');
// const fs     = require('graceful-fs');
// const boxen  = require('boxen');
// const yargs  = require('yargs');
// const dotenv = require('dotenv');

// import cmdFlatten from './cmds/flatten';

// const flatlib = require('./lib');
// const yargs = YargsAll.default;
// const cmd = 'svgflatten';
const cmd = 'svgmod';

dotenv.config();

// function checkCommands(yargs, argv, numRequired) {
//   if (argv._.length < numRequired) {
//     yargs.showHelp()
//   } else {
//     // check for unknown command
//   }
// }
//
// .usage(`Usage: $0 (command) [-o <output_file>] <input_file>`)
// .pathify [options] <input_file>', 'Turns SVG shapes (polygon, polyline, rect, group) into SVG paths', (yargs) => {
//     yargs.usage(`\nUsage:\n ${cmd} pathify [options] <input_file>`)
//     .option("o", {
//         alias: ["out", "output", "output-file"],
//         describe: "File name to use as output, instead of stdout",
//         type: "string",
//         demandOption: false
//     })
//     .positional("inputfile", {describe: "SVG file to pathify"})
//     .help('help')
// })
// .command('flatten [options] <input_file>', 'Converts groups of paths to a fat path, combining all child paths into one', (yargs) => {
//     yargs.usage(`\nUsage:\n ${cmd} flatten [options] <input_file>`)
//     .option("o", {
//         alias: ["out", "output", "output-file"],
//         describe: "File name to use as output, instead of stdout",
//         type: "string",
//         demandOption: false
//     })
//     .positional("inputfile", {describe: "SVG file to flatten"})
//     .help('help')
// })
// .command('transform [options] <input_file>', 'Apply SVG transformations to paths', (yargs) => {
//     yargs.usage(`\nUsage:\n ${cmd} transform [options] <input_file>`)
//     .option("o", {
//         alias: ["out", "output", "output-file"],
//         describe: "File name to use as output, instead of stdout",
//         type: "string",
//         demandOption: false
//     })
//     .positional("inputfile", {describe: "SVG file to transform"})
//     .help('help')
// })
//     }
// })

// const optOutput = {
//     alias: ["out", "output", "output-file"],
//     describe: `Output file name (default: stdout)`,
//     // type: "string",
//     demandOption: false
// };

// .command({
//   command: 'flatten',
//   describe: 'Converts groups of paths to a fat path, combining all child paths into one',
//   builder: (yargs) => {
//     return yargs.usage(`\nUsage:\n ${cmd} flatten [options] <input_file>`)
//     .option("o", optOutput).positional("inputfile", {describe: "SVG file to pathify"}).help('help');
//   },
//   handler: (a) => {
//     console.log("Flattening");
//     return;
//   },
// })

// .commandDir('cmds', {
//   recurse: true,
//   extensions: ['js'],
// })

const rawArgV = process.argv;
// console.log("RAW ARGS:\n", rawArgV);
const argv = yargs(hideBin(rawArgV))
.usage(`\n\n` + chalk.bgYellow.black('USAGE') + `\n=====\n$0 ` + chalk.cyanBright('(command)') + ` ` + chalk.greenBright(`<input_file>`) + ` [-o <output_file>]`)
.command((commands as any))
.positional("input_file", {describe: "SVG file to flatten"})
.option("o", { alias: ["output"], describe: "Output filename (default stdout)", type: "string", demandOption: false })
.option("f", { alias: ["force"], describe: "Overwrite input file", type: "boolean", demandOption: false })
// .help('h', false)
.alias('h', 'help')
.alias('v', 'version')
.help('help')
.version()
//  .command('$0', 'the default command', () => {}, (argv) => {
    // main(argv);
  // })
.demandCommand(1)
.wrap(100)
.argv;
 

// .command({
//     command: 'pathify',
//     describe: 'Turns SVG shapes (polygon, polyline, rect, group) into SVG paths',
//     builder: (yargs) => {
//         return yargs.usage(`\nUsage:\n ${cmd} pathify [options] <input_file>`)
//         .option("o", optOutput).positional("inputfile", {describe: "SVG file to pathify"}).help('help');
//     },
//     handler: (a) => {
//         console.log("Pathifying");
//         return;
//     },
// })
// .command({
//   command: 'transform',
//   describe: 'Apply SVG transformations to paths',
//   builder: (yargs) => {
//     return yargs.usage(`\nUsage:\n ${cmd} transform [options] <input_file>`)
//     .option("o", optOutput).positional("inputfile", {describe: "SVG file to pathify"}).help('help');
//
//   },
//   handler: (a) => {
//     console.log("Transforming");
//     return;
//   },
// })
// .command({
//     command: 'pathify',
//     // choices: ['pathify', 'flatten', 'transform'],
//     // type: 'string',
//     describe: 'The operation you want to perform on the SVG file',
//     builder: {(yargs, helpOrVersionSet) => {
//         return yargs.option('o', optOutput).positional("inputfile", {describe: "SVG file to transform", type: 'string'});
//     },
//     handler: ({sub, key, value}) => {
//         if (sub === 'pathify') {
//             console.log("Pathifying");
//             return;
//         } else if (sub === 'flatten') {
//             console.log("flattening");
//             return;
//         } else if (sub === 'transform') {
//             console.log("Transforming");
//             return;
//         } else {
//             console.log("Command not found!");
//         }
//     },
// })


//  yargs(hideBin(process.argv))
//  .command('serve [port]', 'start the server', (yargs) => {
//    return yargs
//      .positional('port', {
//        describe: 'port to bind on',
//        default: 5000
//      })
//  }, (argv) => {
//    if (argv.verbose) console.info(`start server on :${argv.port}`)
//    serve(argv.port)
//  })
//  .option('verbose', {
//    alias: 'v',
//    type: 'boolean',
//    description: 'Run with verbose logging'
//  });
 
// const boxenOptions = {
//   padding: 1,
//   margin: 1,
//   borderStyle: "round",
//   borderColor: "green",
//   backgroundColor: "#555555"
//  };
 
// let inputFilename = argv._.inputfile;

async function main(inputargs) {
  // console.log(`Main Args:\n`, inputargs);
  let cmdToRun = inputargs._[0];
  let inputFilename = inputargs._[1];
  // console.log("Main: arguments object is:\n", inputargs);
  // return;
  // console.log("Input SVG: ", inputFilename);
  let inputFilePath = path.resolve(inputFilename);
  // console.log("Attempting to read input file at: ", inputFilePath);
  // let tempDir = fs.mkdtempSync('svgflatten');
  // let tempFilename = "flatten_temp.svg";
  // let tempFilePath = path.join(tempDir, tempFilename);
  // // fs.copyFileSync(inputFile, tempFilePath);
  // fs.copyFileSync(inputFilePath, tempFilePath);
  // let inputFile = fs.readFileSync(tempFilePath, { flag: 'r' });
  let inputFile = fs.readFileSync(inputFilePath, 'utf-8', { flag: 'r'});
  let svgSource = inputFile.toString();
  console.log(`Read input file, size: ${svgSource.length}`);
  let svglib = new SvgMod(svgSource);
  let outsvg:string;
  if(cmdToRun === 'pathify') {
    outsvg = svglib.pathify().value();
  } else if(cmdToRun === 'flatten') {
    outsvg = svglib.pathify().flatten().value();
  } else if(cmdToRun === 'transform') {
    outsvg = svglib.pathify().flatten().transform().value();
  } else {
    console.warn(`Unrecognized subcommand: ${cmdToRun}`);
    return 2;
  }
  if(inputargs.output) {
    let outfilePath = path.resolve(inputargs.output);
    fs.writeFileSync(outfilePath, outsvg, { encoding: 'utf8' });
    return 0;
  } else {
    console.log(outsvg);
  }
  // fs.unlinkSync(tempFilePath);
  // fs.rmdirSync(tempDir);
  return 0;
}

main(argv);