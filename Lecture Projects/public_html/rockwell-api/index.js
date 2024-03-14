const express = require('express');
const port = 5000;
const app = express();
const db = require('./dbConnectExec.js');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require('./config.js');
const auth = require('./middleware/authenticate.js');
app.use(express.json());

app.listen(port, () => {
    console.log("app is running on port", port);
});

app.get("/", (req, res) => {
    res.send("API running");
});

app.get("/hi", (req, res) => {
    res.send("hello world");
});
app.get("/movies", (req, res) => {
    db.executeQuery(`SELECT * FROM FILM INNER JOIN FilmRating 
    ON FILM.RatingFK=FilmRating.RatingPK;`)
        .then((theResults) => {
            res.status(200).send(theResults);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send();
        });
});

app.get("/movies/:pk", (req, res) => {
    let pk = req.params.pk;
    console.log(pk);
    let myQuery = `SELECT * FROM Film INNER JOIN FilmRating ON
                    Film.RatingFK = FilmRating.RatingPK WHERE Film.FilmPK=${pk}`;
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
            console.log("error in /movies/pk", err);
            res.status(500).send();
        });
});

// post api for contacts, aka create a new user

app.post("/contacts", async (req, res) => {
    let nameFirst = req.body.nameFirst;
    let nameLast = req.body.nameLast;
    let email = req.body.email;
    let password = req.body.password;

    if (!nameFirst || !nameLast || !email || !password) {
        return res.status(400).send("bad request");
    }
    nameFirst = nameFirst.replace("'", "''"); //to prevent sql errors
    nameLast = nameLast.replace("'", "''");

    let emailCheckQuery = `SELECT email FROM Contact WHERE email='${email}'`;
    let existingUser = await db.executeQuery(emailCheckQuery);

    if (existingUser[0]) {
        return res.status(409).send("duplicate email");
    }
    let hashedPW = bcryptjs.hashSync(password);

    let insertQuery = `INSERT INTO CONTACT(FirstName,LastName,Email,UserPassword)
                        VALUES ('${nameFirst}', '${nameLast}','${email}','${hashedPW}')`;
    db.executeQuery(insertQuery)
        .then(() => {
            res.status(201).send();
        })
        .catch((err) => {
            console.log("error in POST /contacts", err);
            res.status(500).send();
        });
});//end 9.2 contacts/ create user endpoint
//10.1 Login
//POST endpoint /contacts/login async req,res
//START HERE TUESDAY 10/24
app.post("/contacts/login", async (req, res) => {
    //1. light data validation
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(400).send("Bad request");
    }
    //2. check that user exists in the db
    let query = `SELECT * FROM Contact WHERE Email='${email}'`;
    let result;
    try {
        result = await db.executeQuery(query);
    }
    catch (err) {
        console.log("Error in /contacts/login", err);
        return res.status(500).send();
    }
    console.log("results", result);

    //3. for users that exist, check password
    if (!result[0]) {
        return res.status(401).send("Invalid credentials");
    }
    let user = result[0];
    if (!bcryptjs.compareSync(password, user.UserPassword)) {
        return res.status(401).send("invalid credentials");
    }
    //4.generate json web token
    let token = jwt.sign({ pk: user.ContactPK }, config.JWT, { expiresIn: "60 minutes" });
    //3 args: userPK, secret code, expiresIn data
    //5. save that token in the db, and send response back
    let setTokenQuery = `UPDATE Contact SET token = '${token}'
                             WHERE ContactPK = ${user.ContactPK}`;
    try {
        await db.executeQuery(setTokenQuery);
        res.status(200).send({
            token: token,
            user: {
                FirstName: user.FirstName,
                LastName: user.LastName,
                Email: user.Email,
                ContactPK: user.ContactPK
            }
        });
    }
    catch (err) {
        console.log("error setting up token", err);
        res.status(500).send();
    }



});
//10.2 (Thurs) Reviews/authentication /reviews' auth async(req,res)
app.post("/reviews", auth, async (req, res) => {
    try {
        //validation of the request
        let filmFK = req.body.filmFK;
        let summary = req.body.summary;
        let rating = req.body.rating;

        if (!filmFK || !summary || !rating || !Number.isInteger(rating)) {
            return res.status(400).send("Bad request");
        }
        summary = summary.replace("'", "''"); //prevent sql errors
        console.log("here is the contact", req.contact);

        let insertQuery = `INSERT INTO FilmReview(ReviewSummary,ReviewRating,
                                FilmFK,ContactFK)
                                OUTPUT inserted.ReviewPK, inserted.ReviewSummary,inserted.ReviewRating, inserted.FilmFK
                                VALUES('${summary}',${rating},${filmFK}, ${req.contact.ContactPK})
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
//11.1