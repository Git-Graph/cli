import crypto from 'crypto';
import axios from 'axios';
import readline from "readline-sync"
import { setConfig } from '../../config/config';

interface authOptions {
    register: boolean,
    login: boolean,
}

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// })

const authenticate = async (options: authOptions) => {
    if (options.register) {
        const username = readline.question("Username: ");
        const password = readline.question('Password: ', {
            hideEchoBack: true
        });
        if(username==='' || password===''){
            console.log("Re-enter the values: ");
            authenticate(options);
        }
        const data={
            username,
            password
        }
        axios.post('http://localhost:8000/auth/register',data)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err));
        //rl.question("Password")
        // console.log(`This is your user code, use to login through the website ${userCode}`)
        //setConfig(userCode);
        console.log(username, " ", password);
    }
}

export default authenticate;