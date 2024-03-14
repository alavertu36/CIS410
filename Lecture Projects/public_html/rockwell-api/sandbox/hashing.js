const bcryptjs = require('bcryptjs');

let hashedPW = bcryptjs.hashSync('csu123');

console.log('Password: ' + 'csu123');

console.log('Hashed password: ' + hashedPW);

let hashTest = bcryptjs.compareSync('csu123', hashedPW);

console.log('Password is valid: ' + hashTest);