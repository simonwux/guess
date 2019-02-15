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

/* GET home page. */
router.get("/api", function(req, res, next) {
  getFollowers(function (docs) {
    res.send(docs);
  });
});

module.exports = router;
