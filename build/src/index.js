#! /usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simple_git_1 = require("simple-git");
const commander_1 = require("commander");
const add_1 = __importDefault(require("./commands/add"));
const commit_1 = __importDefault(require("./commands/commit"));
const authenticate_1 = __importDefault(require("./commands/authenticate"));
const options = {
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
    trimmed: false,
};
const git = (0, simple_git_1.simpleGit)(options);
commander_1.program
    .name('gg')
    .description('CLI tool to make flowcharts of git repositories');
commander_1.program
    .command('auth')
    .description("Authenticate to use website and see your flowcharts")
    .action(() => (0, authenticate_1.default)());
commander_1.program.command('status')
    .description('git ka status dikhata hai')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log(yield git.status());
}));
commander_1.program
    .command('add')
    .description('add files to git')
    .action(() => (0, add_1.default)(git, commander_1.program.args));
commander_1.program
    .command('commit')
    .option('-m, --message <message>', 'Commit Message')
    .action((options) => {
    // if(!options.message){
    //     console.log("Add a commit message");
    //     process.exit(1);
    // }
    (0, commit_1.default)(git, options.message);
});
commander_1.program.parse();
// const option:Option=
//hello
console.log("hello");
console.log("bye");
console.log("chalo");
