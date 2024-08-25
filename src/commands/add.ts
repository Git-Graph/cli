import { SimpleGit } from "simple-git";

const add =async (git: SimpleGit, args:string[]) =>{
    if(args.length===1) console.log('use \'.\' to add all files \n or add file names as arguments')
    if(args[0]==='add'){
        let files:string[];
        if(args[1]==='.'){
            files=(await git.status()).not_added
        }
        else{
            files=args.slice(1)
        }
        await git.add(files)
    }
    else{
        console.error('it is an add funtion')
    }
}

export default add;