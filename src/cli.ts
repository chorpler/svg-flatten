#!/usr/bin/env ts-node

import * as chalk from 'chalk';
import * as path  from 'path';
import * as fs    from 'graceful-fs';
import * as boxen from 'boxen';
import * as YargsAll from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as dotenv from 'dotenv';
import { SvgMod } from './svgmod';
// const chalk  = require('chalk');
// const path   = require('path');
// const fs     = require('graceful-fs');
// const boxen  = require('boxen');
// const yargs  = require('yargs');
// const dotenv = require('dotenv');

// const flatlib = require('./lib');
const yargs = YargsAll.default;

dotenv.config();

const argv = yargs(hideBin(process.argv))
 .usage("Usage: svgflatten (command) [-o <output_file>] <input_file>")
 .option("o", { alias: ["out", "output", "output-file"], describe: "File name to use as output, instead of stdout", type: "string", demandOption: false })
 .positional("inputfile", {describe: "SVG file to flatten"})
//  .command('$0', 'the default command', () => {}, (argv) => {
    // main(argv);
  // })
.demandCommand(1)
 .argv;
 
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
  let inputFilename = inputargs._[0];
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
  let svglib = new SvgMod(svgSource);
  let outsvg = svglib.transform().value();
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