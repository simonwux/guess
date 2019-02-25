var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
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

function login(req, res) {


  if(!req.get("email") || !req.get("password")) {
    res.status(400).send({msg: "Email and password required."});
    return;
  }
  // Connection URL
  const url = "mongodb://localhost:27017";
  // Connection URL of cluster
  //const url = "mongodb+srv://user:1234@cluster0-ewiok.mongodb.net/test?retryWrites=true";

  // Database Name
  const dbName = "users";

  // Create a new MongoClient
  const client = new MongoClient(url);

  // Use connect method to connect to the Server
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    db.collection("users").findOne({"email": req.header("email"), "password": req.header("password")}, (err, r) => {
      if(err || !r) {
        res.status(404).send({msg:"Email or password wrong."});
        return;
      }
      else res.send(r);
    });


  });


}

function signup(req, res) {
  if(!req.body.email || !req.body.password) {
    res.status(400).send({msg:"Email and password required."});
    return;
  } 
  else {
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

      db.collection("users").findOne({"email": req.body.email}, (err, r) => {
        if(!err && r) {
          res.status(403).send({msg:"There is already a user with the email provided."});
          return;
        }
        else {
          db.collection("users").insertOne({
            email: req.body.email,  
            password: req.body.password
          }, (err, r) => {
            if(err) {
              res.status(500).send({msg:"An error ocurred during the operation."});
              return;
            }
          });
        }
      });

      db.collection("count").findOne({"email":req.body.email}, (err, r) => {
        if(!err && r) {
          res.status(403).send({msg:"There is already a user with the email provided."});
          return;
        }
        else {
          db.collection("count").insertOne({
            email: req.body.email,  
            count: 0
          }, (err, r) => {
            if(err) {
              res.status(500).send({msg:"An error ocurred during the operation."});
              return;
            }
            else res.send({msg:"Successfully signed up."});
          });
        }
      });


    });

  }
}

function update(req, res, db) {

  db.collection("guess"). find({}).toArray(function(err, result) { 
    // console.log(result);
    var newCount = parseInt(result[0]["count"]) + 1;
    var newTotal = parseInt(result[0]["number"])*3/2*(newCount - 1) +  parseInt(req.header("number"));
    var newNumber = parseInt(2/3*(newTotal / newCount));
    // console.log(newCount);
    // console.log(newTotal);
    // console.log(newNumber);
    db.collection("guess").findOneAndUpdate({"_id": result[0]["_id"]}, {$set: {"count": newCount, "number": newNumber}}, (err, r) => {
    });
  });
}

function guess(req, res) {


  if(!req.get("number")) {
    res.status(400);
    res.send({msg: "Number required."});
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

    db.collection("guess").findOne({"number": parseInt(req.header("number"))}, (err, r) => {
      if(err || !r) {

        update(req, res, db);
        res.status(404);
        db.collection("guess"). find({}).toArray(function(err, result) { 
          var number = parseInt(result[0]["number"]);
          if (number > req.header("number")){
            res.send({msg:"Too Small"});
          }
          else{
            res.send({msg:"Too Large"});
          }
        });
      }
      else res.send({msg:"Number right."});
    });


  });


}

function getWinner(req, res) {

  const url = "mongodb://localhost:27017";

  // Database Name
  const dbName = "users";

  // Create a new MongoClient
  const client = new MongoClient(url);

  // Use connect method to connect to the Server
  client.connect({ useNewUrlParser: true }, function(err) {
    assert.equal(null, err);
    if (err) {
        res.status(404).send({msg:"Get winner wrong."});
    }
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    db.collection("winner")
      .find()
      .sort({"count":1})
      .limit(10)
      .toArray(function (err, docs) {
        assert.equal(null, err);
        res.send(docs);
      });
  });
}

function setWinner(req, res) {

  const url = "mongodb://localhost:27017";

  // Database Name
  const dbName = "users";

  // Create a new MongoClient
  const client = new MongoClient(url);

  var email = req.body.email;
  var count = req.body.count;

  // Use connect method to connect to the Server
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    db.collection("winner").findOne({"email": email}, (err, r) => {
      if(!err && r) {
        res.status(403);
        res.send({msg:"There is already a user with the email provided."});
      }
      else {
        db.collection("winner").insertOne({
          email: email,  
          count: parseInt(count)
        }, (err, r) => {
          if(err) {
            res.status(500);
            res.send("An error ocurred during the operation.");
          }
          // else {
          //   res.send(r.ops[0]);
          // }
        });
      }
    });
  });
  res.send({msg:"set a winner"})
}

function getCount(req, res) {

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
    db.collection("count")
      .find({"email":req.header("email")})
      .toArray(function (err, docs) {
        assert.equal(null, err);
        res.send(docs);
      });
  });
}

function addCount(req, res) {

  const url = "mongodb://localhost:27017";
  //console.log(req.toString());
  var email = req.body.email;
  //console.log(req.body.email);
  // Database Name
  const dbName = "users";

  // Create a new MongoClient
  const client = new MongoClient(url);

  // Use connect method to connect to the Server
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    //console.log(email);


    const db = client.db(dbName);
    db.collection("count"). find({"email":email}).toArray(function(err, result) { 
    assert.equal(null, err);
    // console.log(result);
    // console.log(result.length);
    if (result.length == 0){
        res.status(404).send({msg:"Email is wrong."});
    } else {
    //console.log("Successfuly found one.");
      //console.log(result);
      var count = parseInt(result[0]["count"]) + 1;
      db.collection("count").findOneAndUpdate({"email":email}, {$set: {"count": count}}, (err, r) => {
      });
      res.send({msg:"adding counter"});
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

/* guess. */
router.get("/winner", function(req, res) {
  getWinner(req, res);
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
