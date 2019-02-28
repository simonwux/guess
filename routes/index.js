var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
require('dotenv').config()
// function getFollowers(callback) {


//   // Connection URL
//   const url = "mongodb://localhost:27017";

//   // Database Name
//   const dbName = "duto_guerra_followers";

//   // Create a new MongoClient
//   const client = new MongoClient(url);

//   // Use connect method to connect to the Server
//   client.connect(function(err) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");

//     const db = client.db(dbName);

//     const followers = db.collection("followers");

//     followers.find({})
//       .limit(100)
//       .toArray(function (err, docs) {
//         assert.equal(null, err);


//         callback(docs);
//         client.close();
//       });


//   });


// }
//const url = "mongodb://localhost:27017/";
const dbUser = process.env.MONGODB_USER;
const dbPassword = process.env.MONGODB_PASSWORD;
const url = `mongodb+srv://user:1234@cluster0-ewiok.mongodb.net/test?retryWrites=true`;

const dbName = "users";

function login(req, res) {


    if (!req.get("email") || !req.get("password")) {
        res.send({ msg: "Email and password required." });
        return;
    }
    // // Connection URL
    // const url = "mongodb://localhost:27017";
    // // Connection URL of cluster
    // //const url = "mongodb+srv://user:1234@cluster0-ewiok.mongodb.net/test?retryWrites=true";

    // // Database Name
    // const dbName = "users";

    // // Create a new MongoClient
    // const client = new MongoClient(url);

    // Use connect method to connect to the Server
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        db.collection("users").findOne({ "email": req.header("email"), "password": req.header("password") }, (err, r) => {
            if (err || !r) {
                res.send({ msg: "Email or password wrong." });
                return;
            } else {
              r["msg"] = "Successfully login";
              res.send(r);
            }
        });


    });


}

function signup(req, res) {
    if (!req.body.email || !req.body.password) {
        res.send({ msg: "Email and password required." });
        return;
    } else {
        // // Connection URL
        // const url = "mongodb://localhost:27017";

        // // Database Name
        // const dbName = "users";

        // // Create a new MongoClient
        // const client = new MongoClient(url);

        // Use connect method to connect to the Server
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");

            const db = client.db(dbName);

            db.collection("users").findOne({ "email": req.body.email }, (err, r) => {
                if (!err && r) {
                    res.send({ msg: "There is already a user with the email provided." });
                    return;
                } else {
                    db.collection("users").insertOne({
                        email: req.body.email,
                        password: req.body.password
                    }, (err, r) => {
                        if (err) {
                            res.status(500).send({ msg: "An error ocurred during the operation." });
                            return;
                        }
                        db.collection("count").findOne({ "email": req.body.email }, (err, r) => {
                            if (!err && r) {
                                res.send({ msg: "There is already a user with the email provided." });
                                return;
                            } else {
                                db.collection("count").insertOne({
                                    email: req.body.email,
                                    count: 0,
                                    won: false
                                }, (err, r) => {
                                    if (err) {
                                        res.status(500).send({ msg: "An error ocurred during the operation." });
                                        return;
                                    } else res.send({ msg: "Successfully signed up." });
                                });
                            }
                        });
                    });

                }
            });




        });

    }
}

// NOT USED
function update(req, res, db) {

    db.collection("guess").findOne({}, function(err, result) {
        if (!result) {
            db.collection("guess").insertOne({
                    count: 0,
                    number: parseInt(req.header("number"))
                },
                (err, r) => {
                    if (err) {
                        throw err
                    }
                });
        }
        // console.log(result);
        const newCount = parseInt(result["count"]) + 1;
        const newTotal = parseInt(result["number"]) * (newCount - 1) + parseInt(req.header("number"));
        const newNumber = parseInt((newTotal / newCount));
        // console.log(newCount);
        // console.log(newTotal);
        // console.log(newNumber);
        db.collection("guess").findOneAndUpdate({ "_id": result["_id"] }, { $set: { "count": newCount, "number": newNumber } }, (err, r) => {});
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function guess(req, res) {


    if (!req.get("number")) {
        res.status(400);
        res.send({ msg: "Number required." });
        return;
    }
    // // Connection URL
    // const url = "mongodb://localhost:27017";

    // // Database Name
    // const dbName = "users";
    const email = req.header("email");

    // // Create a new MongoClient
    // const client = new MongoClient(url);
    // Use connect method to connect to the Server
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        let won = false;
        db.collection("guess").findOne({}, (err, r) => {
            if (err) throw err;
            if (!r) {
                let sum = 0;
                let allCount = 0;
                db.collection("guess").insert({ number: (sum / allCount), count: allCount }, (err, r) => {});
                for (let i = 1; i <= 100; i++) {
                    let cnt = getRandomInt(0, 2);
                    db.collection("hist").insert({
                        number: i,
                        count: cnt
                    }, (err, r) => {
                        allCount += cnt;
                        sum += i * cnt;
                        
                    })

                }

                realGuess(db, req, res);
            } else realGuess(db, req, res);

        });
    });
}

function realGuess(db, req, res) {
    const email = req.header("email");
    let won = false;
    db.collection("guess").findOne({}, function(err, result) {
        let number = Math.round(result.number * 2 / 3);
        // console.log("AAA" + number);
        if (number > req.header("number")) {
            res.status(404).send({ msg: "Too Small" });
        } else if (number < req.header("number")) {
            res.status(404).send({ msg: "Too Large" });
        } else {
            res.send({ msg: "Number right." });
            won = true;
        }
        db.collection("hist").updateOne({ number: parseInt(req.header("number")) }, { $inc: { count: 1 } }, { upsert: true }, (err, r) => {
            db.collection('hist').aggregate([{ $group: { _id: 1, number: { $sum: { "$multiply": ["$number", "$count"] } }, count: { $sum: "$count" } } }]).toArray((err, res) => {
                assert.equal(err, null);
                db.collection("guess").updateOne({}, { $set: { "number": res[0]["number"] / res[0]["count"], "count": res[0]["count"] } }, (err, r) => {
                    // client.close();
                    db.collection("count").updateOne({ email: email }, { $inc: { count: 1 } }, { upsert: true });
                });
            })
        });

    });
}

function getWinner(req, res, callback) {
    // const url = "mongodb://localhost:27017";

    // // Database Name
    // const dbName = "users";

    // // Create a new MongoClient
    // const client = new MongoClient(url);

    // Use connect method to connect to the Server
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        assert.equal(null, err);
        if (err) {
            res.status(404).send({ msg: "Get winner wrong." });
            return;
        }
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        db.collection("count")
            .find({ count: { $gt: 0 } })
            .sort({ "count": 1 })
            .limit(10)
            .toArray(function(err, docs) {
                assert.equal(null, err);
                //console.log(docs);
                callback(docs);
                client.close();
            });
    });
}

function getWinner_old(callback) {

    // const url = "mongodb://localhost:27017";

    // // Database Name
    // const dbName = "users";

    // // Create a new MongoClient
    // const client = new MongoClient(url);

    // Use connect method to connect to the Server
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        assert.equal(null, err);
        if (err) {
            res.status(404).send({ msg: "Get winner wrong." });
            return;
        }
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        db.collection("winner")
            .find()
            .sort({ "count": 1 })
            .limit(10)
            .toArray(function(err, docs) {
                assert.equal(null, err);
                //console.log(docs);
                callback(docs);
            });
    });
}


function setWinner(req, res) {

    // const url = "mongodb://localhost:27017";

    // // Database Name
    // const dbName = "users";

    // // Create a new MongoClient
    // const client = new MongoClient(url);

    const email = req.body.email;
    const count = req.body.count;
    // console.log(email);
    // console.log(count);

    // Use connect method to connect to the Server
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        db.collection("winner").findOne({ "email": email }, (err, r) => {
            if (!err && r) {
                res.status(403);
                res.send({ msg: "There is already a user with the email provided." });
            } else {
                db.collection("winner").insertOne({
                    email: email,
                    count: parseInt(count)
                }, (err, r) => {
                    if (err) {
                        res.status(500);
                        res.send({ msg: "An error ocurred during the operation." });
                        client.close();
                        return;
                    } else res.send({ msg: "set a winner" });

                    // else {
                    //   res.send(r.ops[0]);
                    // }
                });
            }
        });
    });
    client.close();
}

function getCount(req, res) {

    // const url = "mongodb://localhost:27017";

    // // Database Name
    // const dbName = "users";

    // // Create a new MongoClient
    // const client = new MongoClient(url);

    // Use connect method to connect to the Server
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        db.collection("count")
            .find({ "email": req.header("email") })
            .toArray(function(err, docs) {
                assert.equal(null, err);
                res.send(docs);
            });
    });
}

function addCount(req, res) {

    // const url = "mongodb://localhost:27017";
    // //console.log(req.toString());
    const email = req.body.email;
    //console.log(req.body.email);
    // Database Name
    // const dbName = "users";

    // // Create a new MongoClient
    // const client = new MongoClient(url);

    // Use connect method to connect to the Server
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        //console.log(email);


        const db = client.db(dbName);
        db.collection("count").find({ "email": email }).toArray(function(err, result) {
            assert.equal(null, err);
            // console.log(result);
            // console.log(result.length);
            if (result.length == 0) {
                res.status(404).send({ msg: "Email is wrong." });
            } else {
                //console.log("Successfuly found one.");
                //console.log(result);
                let count = parseInt(result[0]["count"]) + 1;
                db.collection("count").findOneAndUpdate({ "email": email }, { $set: { "count": count } }, (err, r) => {});
                res.send({ msg: "adding counter" });
            }
        });

    });
}


/* GET home page. */
/*
router.get("/api", function(req, res, next) {
  getFollowers(function (docs) {
    res.send(docs);
  });
});
*/

/* GET home page. */
router.get("/api", function(req, res, next) {
    getFollowers(function(docs) {
        res.send(docs);
    });
});

/* login. */
router.get("/users", function(req, res) {
    login(req, res);
});

/* signup. */
router.post("/users", function(req, res) {
    signup(req, res);
});

/* guess. */
router.get("/guess", function(req, res) {
    guess(req, res);
});

/* guess. */
router.get("/winner", function(req, res) {
    getWinner(req, res, function(docs) {
        res.status(200).send(docs);
    });
});


/* guess. */
router.post("/winner", function(req, res) {
    setWinner(req, res);
});


/* get count. */
router.get("/count", function(req, res) {
    getCount(req, res);
});


/* add count. */
router.post("/count", function(req, res) {
    addCount(req, res);
});



module.exports = router;