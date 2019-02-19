var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
function getFollowers(callback) {


  // Connection URL
  const url = "mongodb://localhost:27017";

  // Database Name
  const dbName = "duto_guerra_followers";

  // Create a new MongoClient
  const client = new MongoClient(url);

  // Use connect method to connect to the Server
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const followers = db.collection("followers");

    followers.find({})
    .limit(100)
    .toArray(function (err, docs) {
      assert.equal(null, err);


      callback(docs);
      client.close();
    });


  });


}

function login(req, res) {


  if(!req.get('email') || !req.get('password')) {
    res.status(400);
    res.send({msg: 'Email and password required.'});
  }
  // Connection URL
  const url = "mongodb://localhost:27017";

  // Database Name
  const dbName = "users";

  // Create a new MongoClient
  const client = new MongoClient(url);

  // Use connect method to connect to the Server
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    db.collection('users').findOne({'email': req.header('email'), 'password': req.header('password')}, (err, r) => {
      if(err || !r) {
        res.status(404);
        res.send({msg:'Email or password wrong.'});
      }
      else res.send(r);
    });


  });


}

function signup(req, res) {


  if(!req.header('email') || !req.header('password')) {
    res.status(400);
    res.send('Email and password required.');
  } 
  else {
    console.log(req.header('email'));
    console.log(req.header('password'));
  // Connection URL
  const url = "mongodb://localhost:27017";

  // Database Name
  const dbName = "users";

  // Create a new MongoClient
  const client = new MongoClient(url);

  // Use connect method to connect to the Server
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    db.collection('users').findOne({'email': req.header('email')}, (err, r) => {
      if(!err && r) {
        res.status(403);
        res.send('There is already a user with the email provided.');
      }
      else {
        db.collection('users').insertOne({
          email: req.header('email'),  
          password: req.header('password')
        }, (err, r) => {
          if(err) {
            res.status(500);
            res.send('An error ocurred during the operation.');
          }
          else {
            res.send(r.ops[0]);
          }
        });
      }
    });


  });

}
}

function update(req, res, db) {

  db.collection("guess"). find({}).toArray(function(err, result) { 
    // console.log(result);
    var newCount = parseInt(result[0]['count']) + 1;
    var newTotal = parseInt(result[0]['number'])*3/2*(newCount - 1) +  parseInt(req.header('number'));
    var newNumber = parseInt(2/3*(newTotal / newCount));
    // console.log(newCount);
    // console.log(newTotal);
    // console.log(newNumber);
    db.collection('guess').findOneAndUpdate({'_id': result[0]['_id']}, {$set: {'count': newCount, 'number': newNumber}}, (err, r) => {
    });
  });
}

function guess(req, res) {


  if(!req.get('number')) {
    res.status(400);
    res.send({msg: 'Number required.'});
  }
  // Connection URL
  const url = "mongodb://localhost:27017";

  // Database Name
  const dbName = "users";

  // Create a new MongoClient
  const client = new MongoClient(url);
  // Use connect method to connect to the Server
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    db.collection('guess').findOne({'number': parseInt(req.header('number'))}, (err, r) => {
      if(err || !r) {

        update(req, res, db);
        res.status(404);
        db.collection("guess"). find({}).toArray(function(err, result) { 
          var number = parseInt(result[0]['number']);
          if (number > req.header('number')){
            res.send({msg:'Too Small'});
          }
          else{
            res.send({msg:'Too Large'});
          }
        });
      }
      else res.send({msg:'Number right.'});
    });


  });


}




/* GET home page. */
router.get("/api", function(req, res, next) {
  getFollowers(function (docs) {
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


module.exports = router;
