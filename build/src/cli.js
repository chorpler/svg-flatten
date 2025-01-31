#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var chalk = require('chalk');
var path = require('path');
var fs = require('graceful-fs');
var boxen = require('boxen');
var yargs = require('yargs');
var dotenv = require('dotenv');
var flatlib = require('./lib');
dotenv.config();
var argv = yargs(hideBin(process.argv))
    .usage("Usage: svgflatten (command) [-o <output_file>] <input_file>")
    .option("o", { alias: ["out", "output", "output-file"], describe: "File name to use as output, instead of stdout", type: "string", demandOption: false })
    .positional("inputfile", { describe: "SVG file to flatten" })
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
function main(inputargs) {
    return __awaiter(this, void 0, void 0, function () {
        var inputFilename, inputFilePath, inputFile, svgSource, svglib, outsvg, outfilePath;
        return __generator(this, function (_a) {
            inputFilename = inputargs._[0];
            inputFilePath = path.resolve(inputFilename);
            inputFile = fs.readFileSync(inputFilePath, 'utf-8', { flag: 'r' });
            svgSource = inputFile.toString();
            svglib = flatlib(svgSource);
            outsvg = svglib.flatten().value();
            if (inputargs.output) {
                outfilePath = path.resolve(inputargs.output);
                fs.writeFileSync(outfilePath, outsvg, { encoding: 'utf8' });
                return [2 /*return*/, 0];
            }
            else {
                console.log(outsvg);
            }
            fs.unlinkSync(tempFilePath);
            fs.rmdirSync(tempDir);
            return [2 /*return*/, 0];
        });
    });
}
return main(argv);
//# sourceMappingURL=cli.js.map