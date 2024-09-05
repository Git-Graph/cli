import { SimpleGit } from "simple-git";
import axios from "axios";
import { getConfig } from "../../config/config";
import { getId } from "../../config/idManager";

const userCode=getConfig().userCode;

const commit = async (git:SimpleGit, message:string)=>{
    const token=getConfig().userCode;
    const repoId=await getId();
    if (!token && !repoId){
        console.log("Please login and initialize repo then try to commit");
        process.exit(1);
    }

    console.log(token," ",repoId)
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
    const response=await axios.post('http://localhost:8000/commands/commit',{
        message
    },{
        headers:{
            Authorization:`Bearer ${token}`,
            repoId
        }
    })

    console.log(response.data);
}

export default commit;