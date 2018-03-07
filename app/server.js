var express = require("express");
var app = express();
var Hand = require("./hand").hand;
var randomHand = require('./hand').randomHand;
var bodyParser = require('body-parser');

app.use(bodyParser.json())

app.get("/get-hand", function(req, res) {
  var hand = randomHand()
  res.send(hand);
});

app.post("/results", function(req, res) {
  var winnerHand = req.body.hands[0]
  res.send(winnerHand)
});

app.listen(3000);