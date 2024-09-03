import { SimpleGit } from "simple-git";
import readline from "readline-sync";
import axios from "axios";
import { getConfig } from "../../config/config";

export const initRepo = async (git: SimpleGit) => {
    console.log("Initialize your git repo");
    const name = readline.question("Name: ");
    const desc = readline.question("Description: ");
    const token = getConfig();
    if (token) {

        const res = await axios.post('http://localhost:8000/repos/initRepo',
            {
                name,
                desc
            },
            {
                headers: {
                    'Authorization': `Bearer ${token.userCode}`,
                }
            }
        )

        if (res.status === 200) {
            console.log(res.data);
            git.init();
        }
        else {
            console.log("Error", res.data);
        }
    }
    else {
        console.log("Login first");
    }
}