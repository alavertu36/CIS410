export function payAmount(custType, numHours) {
    if (custType == 1) {
        if (numHours > 40) {
            return 2 * 55 * numHours;
        }
        else {
            return 55 * numHours;
        }
    }
    else {
        if (numHours > 40) {
            return 2 * 60 * numHours;
        }
        else {
            return 60 * numHours;
        }
    }
}