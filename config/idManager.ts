import fs from "fs";
import path from "path";

const folderPath=path.join(process.cwd(),'gitgraph.json');
interface gitgraph{
    encrypted_id:string
}

export async function storeId(id:string){
    const gitgraphData:gitgraph={
        encrypted_id:id
    };


    try{
        await fs.promises.writeFile(folderPath,JSON.stringify(gitgraphData,null,2));
    }
    catch(err){
        console.error("Error storing id");
    }
}

export async function getId():Promise<string|null>{
    try{
        if(fs.existsSync(folderPath)){
            const data=await fs.promises.readFile(folderPath,'utf-8');
            const gData=JSON.parse(data) as gitgraph;
            return gData.encrypted_id;
        }
        else{
            console.log("gigraph.json does not exists");
            return null;
        }
    }
    catch(err){
        console.log("Error reading id: ", err);
        return null;
    }
}