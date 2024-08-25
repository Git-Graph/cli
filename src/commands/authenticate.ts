import crypto from 'crypto';
import axios from 'axios';
import readline from "readline";
import { setConfig } from '../../config/config';

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout,
})

const authenticate=()=>{
    const userCode=crypto.randomBytes(4).toString('hex').toUpperCase();
    rl.question("Username: ",async (username)=>{
        console.log(userCode,username)
        axios.post("http://localhost:8000/auth",{
            userCode,
            username,
        })
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
        rl.close();
    })
    console.log(`This is your user code, use to login through the website ${userCode}`)
    setConfig(userCode);
}

export default authenticate;