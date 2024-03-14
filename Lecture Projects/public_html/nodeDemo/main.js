function greet() {
    console.log("greetings, earthling");
}

greet();
const myHiFunction = require('./myFiles.js');

console.log(myHiFunction);

const thatFile = require('./otherFiles.js');

console.log(thatFile.addTwoNums(2, 8));

console.log(thatFile.myGreetings('Alex'));

const myAdd = require('./otherFiles.js').addTwoNums;

console.log(myAdd(18, 2));

// accessing build in node.js modules
const fileSystem = require('fs');

// 3 args are filename, filecontent, and callback function
fileSystem.writeFile('hellowWorld.txt', 'hi world!', ()=>{console.log('file written')});

// external NPM modules (NPM = node package manager)
const oneLinerJoke = require('one-liner-joke');

let getRandomJoke = oneLinerJoke.getRandomJoke();

console.log(getRandomJoke);