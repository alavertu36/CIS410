const express = require('express');
const port = 6060;
const cors = require ('cors');
const app = express();
const db = require('./dbConnectExec.js');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require('./config.js');
const auth = require('./middleware/authenticate.js');
app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log("app is running on port", port);
});

//checks to see if the api is run ning
app.get("/", (req, res) => {
    res.send("API running");
});

// get all records in the data entity
app.get("/videogame", (req, res) => {
    db.executeQuery(`SELECT * FROM VideoGame INNER JOIN Genre ON
    VideoGame.GenreFK=Genre.GenrePK`)
        .then((theResults) => {
            res.status(200).send(theResults);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send();
        });
});

//gets all records in the reviews table
app.get("/review", (req, res) => {
    db.executeQuery(`SELECT * FROM Review`)
    .then((theResults) => {
        res.status(200).send(theResults);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send();
    });
})

/////////////////////////////////////////////

//Get a particular record in the data entity
app.get("/VideoGame/:pk", (req, res) => {
    let pk = req.params.pk;
    console.log(pk);
    let myQuery = `SELECT * FROM VideoGame INNER JOIN Genre ON
    VideoGame.GenreFK=Genre.GenrePK WHERE 
    VideoGame.VideoGamePK=${pk}`;

    console.log("SQL Query:", myQuery);

    db.executeQuery(myQuery)
        .then((result) => {
            if (result[0]) {
                res.send(result[0]);
            }
            else {
                res.status(404).send("bad request");
            }
        })
        .catch((err) => {
            console.log("error in /videogame/pk", err);
            res.status(500).send();
        });
});
/////////////////////////////////////////////////

//POST a new user
app.post("/customer", async (req, res) => {
    let nameFirst = req.body.nameFirst;
    let nameLast = req.body.nameLast;
    let email = req.body.email;
    let password = req.body.password;

    if (!nameFirst || !nameLast || !email || !password) {
        return res.status(400).send("bad request");
    }
    nameFirst = nameFirst.replace("'", "''"); //to prevent sql errors
    nameLast = nameLast.replace("'", "''");

    let emailCheckQuery = `SELECT email FROM Customer WHERE email='${email}'`;
    let existingUser = await db.executeQuery(emailCheckQuery);

    if (existingUser[0]) {
        return res.status(409).send("duplicate email");
    }
    let hashedPW = bcryptjs.hashSync(password);

    let insertQuery = `INSERT INTO Customer(NameFirst,NameLast,Email,Password)
                       VALUES ('${nameFirst}', '${nameLast}','${email}','${hashedPW}')`;
    db.executeQuery(insertQuery)
        .then(() => {
            res.status(201).send();
        })
        .catch((err) => {
            console.log("error in POST /customer", err);
            res.status(500).send();
        });
});//end 9.2 contacts/ create user endpoint
/////////////////////////////////////////////////////

//POST API to login user
app.post("/customer/login", async (req, res) => {
    //1. light data validation
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(400).send("Bad request");
    }
    //2. check that user exists in the db
    let query = `SELECT * FROM Customer WHERE Email='${email}'`;
    let result;
    try {
        result = await db.executeQuery(query);
    }
    catch (err) {
        console.log("Error in /customer/login", err);
        return res.status(500).send();
    }
    console.log("results", result);

    //3. for users that exist, check password
    if (!result[0]) {
        return res.status(401).send("Invalid credentials");
    }
    let user = result[0];
    if (!bcryptjs.compareSync(password, user.Password)) {
        return res.status(401).send("invalid credentials");
    }
    //4.generate json web token
    let token = jwt.sign({ pk: user.CustomerPK }, config.JWT, { expiresIn: "60 minutes" });
    //3 args: userPK, secret code, expiresIn data
    //5. save that token in the db, and send response back
    let setTokenQuery = `UPDATE Customer SET token = '${token}'
                         WHERE CustomerPK = ${user.CustomerPK}`;
    try {
        await db.executeQuery(setTokenQuery);
        res.status(200).send({
            token: token,
            user: {
                FirstName: user.NameFirst,
                LastName: user.NameLast,
                Email: user.Email,
                CustomerPK: user.CustomerPK
            }
        });
    }
    catch (err) {
        console.log("error setting up token", err);
        res.status(500).send();
    }



});
////////////////////////////////////

//POST link to create transaction
app.post("/review", auth, async (req, res) => {
    try {
        //validation of the request
        let videoGameFK = req.body.videoGameFK;
        let summary = req.body.summary;
        let rating = req.body.rating;

        if (!videoGameFK || !summary || !rating) {
            return res.status(400).send("Bad request");
        }
        summary = summary.replace("'", "''"); //prevent sql errors
        console.log("here is the customer", req.customer);

        let insertQuery = `INSERT INTO Review(Summary,Rating,
                            VideoGameFK,CustomerFK)
                            OUTPUT inserted.ReviewPK, inserted.Summary,inserted.Rating, inserted.VideoGameFK
                            VALUES('${summary}',${rating},${videoGameFK}, ${req.customer.CustomerPK})
                            `;
        let insertedReview = await db.executeQuery(insertQuery);
        console.log("inserted review", insertedReview);
        res.status(201).send(insertedReview[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
});
//////////////////////////////////////

//6 GET route to get all transactions (events/orders) records for a user?
app.get("/customer/me", auth, async (req, res) => {
    try {
        // Get the user ID from the authenticated request
        const userId = req.customer.CustomerPK; // Update this based on your actual user ID retrieval logic

        // Query to retrieve all transactions for the user
        // const reviewsQuery = `SELECT * FROM Review WHERE CustomerFK = ${userId}`;
        let reviewsQuery = `SELECT VideoGame.Title, Review.Summary, Review.Rating FROM VideoGame INNER JOIN Review ON VideoGame.VideoGamePK=Review.VideoGameFk WHERE Review.CustomerFK=${userId}`;

        // Execute the query
        const reviews = await db.executeQuery(reviewsQuery);

        // Send the transactions as a response
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
/////////////////////////////////

//Logout
app.post("/customer/logout", auth, (req, res) => {
    let updateQuery = `UPDATE Customer SET token=NULL WHERE CustomerPK=${req.customer.CustomerPK}`;
    db.executeQuery(updateQuery)
        .then(() => {
            res.status(200).send();
        })
        .catch((err) => {
            console.log("error in post/customer/logout", err);
            res.status(500).send();
        });
});

