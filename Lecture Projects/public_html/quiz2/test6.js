function calcWeekPay(custType, numHours) {
    if (custType == 1) {
        if (numHours > 40) { //overtime front end
            return 2 * 53.64 * numHours;
        }
        else { //no overtime front end
            return 53.64 * numHours;
        }
    }
    else {
        if (numHours > 40) { //overtime back end
            return 2 * 63.92 * numHours;
        }
        else { //no overtime back end
            return 63.92 * numHours;
        }
    }
}

console.log(calcWeekPay(1, 40)); //full work week
console.log(calcWeekPay(2, 40)); //full work week
console.log(calcWeekPay(1, 45)); //overtime
console.log(calcWeekPay(2, 45)); //overtime