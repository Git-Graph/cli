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
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../config/config");
const userCode = (0, config_1.getConfig)().userCode;
const commit = (git, message) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userCode) {
        console.log("Please login and then try to commit");
        process.exit(1);
    }
    const status = yield git.status();
    console.log(typeof (status.staged));
    if (status.staged.length === 0) {
        console.log(`On branch ${status.current}\nnothing to commit, working tree clean`);
        process.exit(1);
    }
    else {
        if (!message) {
            console.log("Commit message required");
            process.exit(1);
        }
    }
    console.log(yield git.commit(message, status.staged));
    yield axios_1.default.post('http://localhost:8000/commit', {
        userCode,
        message
    });
});
exports.default = commit;
