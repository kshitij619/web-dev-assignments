let { adding } = require("./myModules/add.js");
let { subtracting } = require("./myModules/subtract.js");
let { multiplying } = require("./myModules/multiply.js");
let { dividing } = require("./myModules/divide.js");

let first = 24;
let second = 3;

console.log("Addition: " + adding(first, second));
console.log("Subtraction: " + subtracting(first, second));
console.log("Multiplication: " + multiplying(first, second));
console.log("Division: " + dividing(first, second));
