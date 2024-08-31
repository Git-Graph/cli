import fs from 'fs';
import os from 'os';
import path from 'path';

const CONFIG_FILE=path.join(os.homedir(),'.gg-config.json');

interface Config{
    userCode?:string,
}

export function getConfig():Config{
    try{
        if(fs.existsSync(CONFIG_FILE)){
            const data=fs.readFileSync(CONFIG_FILE,'utf8');
            return JSON.parse(data);
        }
    }
    catch(err){
        console.error("Error reading file: ",err);
    }
    return {};
}

export function setConfig(usercode:string){
    console.log(usercode)
    const config=getConfig();
    config.userCode=usercode;
    try{
        fs.writeFileSync(CONFIG_FILE,JSON.stringify(config));
    }
    catch(err){
        console.log("Error writing the file:",err);
    }
}

export function clearConfig(){
    try{
        fs.unlinkSync(CONFIG_FILE);
    }
    catch(err){
        console.log("Error clearing: ",err);
    }
}