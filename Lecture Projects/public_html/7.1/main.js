import { payAmount } from './hr.js'

// front end 40 hours a week
console.log("Your pay this week is $" + payAmount(1, 40) + ".00");

// back end 35 hours a week
console.log("Your pay this week is $" + payAmount(2, 35) + ".00");

// front end 45 hours a week
console.log("Your pay this week is $" + payAmount(1, 45)+ ".00");

// back end 45 hours a week
console.log("Your pay this week is $" + payAmount(2, 45) + ".00");
