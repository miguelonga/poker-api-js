var expect    = require("chai").expect;
var PokerService = require("../app/service");
var Hand = require("../app/hand").hand;

describe("Poker service", function() {
  it("knows which hand wins", function (){
    var winnerCards = ['AS', 'AC', 'AD', 'AH', 'KD']
    var otherCards = ['2C', '2H', '3C', '4C', 'KD']
    var expectedWinnerHand = new Hand(winnerCards)
    var otherHand = new Hand(otherCards)
    var hands = [expectedWinnerHand, otherHand]

    service = new PokerService
    var winnerHand = service.winnerHand(hands)

    expect(expectedWinnerHand).to.equal(winnerHand)
  });
});