import { SimpleGit } from "simple-git";
import axios from "axios";
import { getConfig } from "../../config/config";

const userCode=getConfig().userCode;

const commit = async (git:SimpleGit, message:string)=>{
    if (!userCode){
        console.log("Please login and then try to commit");
        process.exit(1);
    }
    const status=await git.status()
    console.log(typeof(status.staged))
    if(status.staged.length===0){
        console.log(`On branch ${status.current}\nnothing to commit, working tree clean`)
        process.exit(1);

    }
    else{
        if(!message){
            console.log("Commit message required");
            process.exit(1);
        }
    }
    console.log(await git.commit(message,status.staged));
    await axios.post('http://localhost:8000/commit',{
        userCode,
        message
    })
}

export default commit;