// demos export of multiple functions as object
function addTwoNums(num1, num2) {
    return (num1 + num2);
}

function greetPerson(name) {
    return "Greetings, " + name;
}

//any file that imports tthis one will have access to ufnctions addTwoNums and myGreeting
module.exports = {addTwoNums: addTwoNums, myGreetings: greetPerson};
