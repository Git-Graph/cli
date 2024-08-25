"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = getConfig;
exports.setConfig = setConfig;
exports.clearConfig = clearConfig;
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const CONFIG_FILE = path_1.default.join(os_1.default.homedir(), '.gg-config.json');
function getConfig() {
    try {
        if (fs_1.default.existsSync(CONFIG_FILE)) {
            const data = fs_1.default.readFileSync(CONFIG_FILE, 'utf8');
            return JSON.parse(data);
        }
    }
    catch (err) {
        console.error("Error reading file: ", err);
    }
    return {};
}
function setConfig(usercode) {
    const config = getConfig();
    config.userCode = usercode;
    try {
        fs_1.default.writeFileSync(CONFIG_FILE, JSON.stringify(config));
    }
    catch (err) {
        console.log("Error writing the file:", err);
    }
}
function clearConfig() {
    try {
        fs_1.default.unlinkSync(CONFIG_FILE);
    }
    catch (err) {
        console.log("Error clearing: ", err);
    }
}
