let myWords = ["morning", "whole", "virtue", "decadent", "meh", "entertain"]

//find the shortest word
let minimum = myWords[0];

for (let i = 0; i < myWords.length; i++) {
    if (myWords[i].length < minimum.length) {
        minimum = myWords[i];
    }
}
console.log('Shortest word: ' + minimum);


//find the longest word
let maximum = myWords[0];

for (let i = 0; i < myWords.length; i++) {
    if (myWords[i].length > maximum.length) {
        maximum = myWords[i];
    }
}
console.log('Longest word: ' + maximum);