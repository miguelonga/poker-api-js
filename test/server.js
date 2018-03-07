var expect  = require("chai").expect;
var rp = require('request-promise');
var randomHand = require("../app/hand").randomHand;

describe("Poker API", function() {

  var baseUri = "http://localhost:3000"

  describe("GET hand", function() {
    var url = baseUri + "/get-hand";

    it("returns status 200", function(done) {
      var options = { uri: url, resolveWithFullResponse: true }
      rp(options).then(response => {
        expect(response.statusCode).to.equal(200);
        done()
      }).catch(error => {
        done(error)
      });
    });

    it("returns a random five cards hand", function(done) {
      var firstRequest = rp(url);
      var secondRequest = rp(url);

      Promise.all([firstRequest, secondRequest]).then(responses => {
        var firstHand = responses[0]
        var secondHand = responses[1]
        expect(firstHand).to.not.equal(secondHand)
        done()
      }).catch(error => {
        console.log(error)
      })

    });
  });

  describe("POST results", function() {
    it("declares a winner", function(done) {
      var hands = []
      hands.push(randomHand())
      hands.push(randomHand())

      var options = {
        method: "POST",
        uri: baseUri + "/results",
        body: {
          hands: hands
        },
        json: true
      }

      rp(options).then(body => {
        var winnerHand = body
        var winnerHands = hands.filter(hand => {
          return hand.toString() === winnerHand.toString()
        })
        expect(winnerHands.length).to.equal(1)
        done()
      }).catch(error => {
        console.log(error)
      })
    })
  })
});