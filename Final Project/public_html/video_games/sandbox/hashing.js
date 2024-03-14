const bcryptjs = require('bcryptjs');

let hashedPW = bcryptjs.hashSync('csu123');

console.log(hashedPW);

let hashTest = bcryptjs.compareSync('csu1234', hashedPW);

console.log(hashTest);
