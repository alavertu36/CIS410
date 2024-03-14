//10.2 Middleware building
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const db = require('../dbConnectExec.js');

const auth = async (req,res,next) => {
    console.log("in the middleware",req.header("Authorization"));
    //next();
    try {
        //1. decode the token we receive
        let myToken = req.header("Authorization").replace("Bearer ","");
        console.log("token",myToken);
        let decoded = jwt.verify(myToken,config.JWT);
        console.log(decoded);

        let contactPK = decoded.pk; //possibly contactPK
 
        //2. compare the token with the databse info
        let query = `SELECT ContactPK, FirstName, LastName, Email
                    FROM Contact WHERE ContactPK=${contactPK} AND
                    Token = '${myToken}'`;
        console.log(query);
        let returnedUser = await db.executeQuery(query);
        //PROBLEM IS ^^^^^^^^^^^^^^^
        console.log(returnedUser);
        //3. save the user information we retrieve from the db
        if(returnedUser[0]) {
            req.contact = returnedUser[0];
            next();
        }
        else {
            return res.status(401).send("Invalid credentials");
        }
    }
    catch(err) {
        console.log(err);
        return res.status(401).send("Invalid credentials");
    }
} //end const auth
module.exports = auth;