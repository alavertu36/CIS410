//part 1 of the homework
// firstName = "Malak";
// lastName = "Younis";
// string1 = firstName + " " + lastName;

// function fun(str) { 
//     len = str.length;

//     if (len % 2 == 0) {
//         return str.substring(0, 3) + lastName;
//     }
//     else {
//         return str.substring(len - 3, len) + firstName;
//     }
// }

// console.log(string1);
// str = "seven"
// console.log(fun(str));


//part 2 of the homework
function fun(str) {
    len = str.length;
    firstName = "Malak";
    lastName = "Younis";
    
    if (len % 2 == 0) {
        return str.substring(0, 3) + lastName
    }
    else {
        return str.substring(len - 3, len) + firstName;
    }
}
myString1 = "dazzlement"; //10 characters
console.log(myString1);
console.log(fun(myString1));
myString2 = "embezzlements"; //13 characters
console.log(myString2);
console.log(fun(myString2));