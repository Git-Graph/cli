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
Object.defineProperty(exports, "__esModule", { value: true });
const add = (git, args) => __awaiter(void 0, void 0, void 0, function* () {
    if (args.length === 1)
        console.log('use \'.\' to add all files \n or add file names as arguments');
    if (args[0] === 'add') {
        let files;
        if (args[1] === '.') {
            files = (yield git.status()).not_added;
        }
        else {
            files = args.slice(1);
        }
        yield git.add(files);
    }
    else {
        console.error('it is an add funtion');
    }
});
exports.default = add;
