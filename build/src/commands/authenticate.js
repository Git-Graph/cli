"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const axios_1 = __importDefault(require("axios"));
const readline_1 = __importDefault(require("readline"));
const config_1 = require("../../config/config");
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const authenticate = () => {
    const userCode = crypto_1.default.randomBytes(4).toString('hex').toUpperCase();
    rl.question("Username: ", (username) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(userCode, username);
        axios_1.default.post("http://localhost:8000/auth", {
            userCode,
            username,
        })
            .then((res) => {
            console.log(res);
        })
            .catch((err) => {
            console.log(err);
        });
        rl.close();
    }));
    console.log(`This is your user code, use to login through the website ${userCode}`);
    (0, config_1.setConfig)(userCode);
};
exports.default = authenticate;
