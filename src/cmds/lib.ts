import * as yargs from 'yargs';

export const optOutput:yargs.Options = {
    // alias: ["output"],
    describe: `Output file (default stdout)`,
    // type: "string",
    demandOption: false,
};
