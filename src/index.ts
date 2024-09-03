#! /usr/bin/env node
import { Response, SimpleGit, simpleGit, SimpleGitOptions, StatusResult } from "simple-git";
import { Option, program } from "commander";
import add from './commands/add';
import commit from "./commands/commit";
import authenticate from "./commands/authenticate";
import { initRepo } from "./commands/init";
import { getConfig } from "../config/config";

const options: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
    trimmed: false,
}

const git: SimpleGit = simpleGit(options)


program
    .name('gg')
    .description('CLI tool to make flowcharts of git repositories')

program.command('token').action(()=>console.log(getConfig()))

program
    .command('auth')
    .description("Authenticate to use website and see your flowcharts")
    .option('-r, --register','Register ')
    .option('-l, --login','login your account')
    .action((options) => authenticate(options));

program
.command('init')
.description("Initialize repositories for git and gitgraph")
.action(()=> initRepo(git))

program.command('status')
    .description('git ka status dikhata hai')
    .action(async () => {
        console.log(await git.status())
    })

program
    .command('add')
    .description('add files to git')
    .action(() => add(git, program.args))

program
    .command('commit')
    .option('-m, --message <message>', 'Commit Message')
    .action((options) => {
        // if(!options.message){
        //     console.log("Add a commit message");
        //     process.exit(1);
        // }
        commit(git, options.message)
    })

program.parse()