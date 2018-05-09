import fs from "fs";

export default function makeMonad(value) {
    function isMonad() {
        return true;
    }
    function bind(func, args) {
        return func(value, ...args);
    }
    function readFile(...args) {
        const result = bind(fs.readFile, args);
        return (result && result.isMonad === true)
            ? result
            : makeMonad(result);
    }
    return Object.freeze({
        isMonad,
        bind,
        readFile
    });
};

const monad = makeMonad("./index.mjs");
console.log(monad);
console.log("Monad Value: ", monad.isMonad());
console.log(monad.readFile("utf-8", (error, data) => console.log(data)));
console.log(monad.readFile("utf-8", (error, data) => console.log(data)).isMonad());
