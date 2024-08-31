import crypto from 'crypto';
import axios from 'axios';
import readline from "readline-sync"
import { clearConfig, setConfig } from '../../config/config';

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
        if (username === '' || password === '') {
            console.log("Re-enter the values: ");
            authenticate(options);
        }
        const data = {
            username,
            password
        }
        try {
            const res = await axios.post('http://localhost:8000/auth/register', data);
            if (res.status === 409) {
                console.log("Username already exists, try again");
                authenticate(options);
            }
            else {
                console.log("Registered successfully");
            }
        }
        catch (err: any) {
            if (err.response && err.response.status === 409) {
                console.log("Username already exists, try again");
                authenticate(options);
            }
            else {
                console.error('An error occurred:', err.message);
            }
        }
    }
    else if (options.login) {
        const username = readline.question("Username: ");
        const password = readline.question('Password: ', {
            hideEchoBack: true
        });
        if (username === '' || password === '') {
            console.log("Re-enter the values: ");
            authenticate(options);
        }
        const data = {
            username,
            password
        }
        try {
            const res = await axios.post('http://localhost:8000/auth/login', data);
            if (res.status == 200) {
                const token = res.data.token;
                setConfig(token);
            }
        }
        catch (err: any) {
            console.log("Err:", err.response.data.message);
        }
    }
}

export default authenticate;