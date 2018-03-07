var expect    = require("chai").expect;
var Hand = require("../app/hand").hand;
var randomHand = require("../app/hand").randomHand;

describe("Poker game", function() {
  describe("Hand", function() {
    it("serves random hands", function (){
      var hand = randomHand()
      expect(hand.length).to.equal(5)
      for (i = 0; i < hand.length; i++) {
        expect(hand[i].length <= 3).to.equal(true) 
      }
    });

    it("knows its High Card combination", function () {
      var cards = ["2C", "3H", "4S", "8C", "AH"]
      var hand = new Hand(cards)
      hand.composeCards()
      expect(hand.rank()).to.equal('high_card')
    });
  
    it("knows its Pair combination", function(){
      var cards = ["2C", "2S", "4S", "8C", "AH"]
      var hand = new Hand(cards)
      hand.composeCards()
      expect(hand.rank()).to.equal('pair')
    });
  
    it("knows high combination", function(){
      var cards = ["2C", "2S", "4S", "8C", "AH"]
      var hand = new Hand(cards)
      hand.composeCards()
      var highCombination = hand.highCombination()
      expect(highCombination['count']).to.equal(2)
      expect(highCombination['card']).to.equal('2')
    })
  
    it("knows its Three of a Kind combination", function(){
      var cards = ["2C", "2S", "2H", "8C", "AH"]
      var hand = new Hand(cards)
      hand.composeCards()
      expect(hand.rank()).to.equal('threeOfaKind')
    });
  
    it("knows its Four of a Kind combination", function(){
      var cards = ["2C", "2S", "2H", "2D", "AH"]
      var hand = new Hand(cards)
      hand.composeCards()
      expect(hand.rank()).to.equal('fourOfaKind')
    });
  
    it("knows second high combination", function(){
      var cards = ["2C", "2S", "2H", "4S", "4C"]
      var hand = new Hand(cards)
      hand.composeCards()
      
      var highCombination = hand.highCombination()
      expect(highCombination['count']).to.equal(3)
      expect(highCombination['card']).to.equal('2')
      
      var secondHighCombination = hand.secondHighCombination()
      expect(secondHighCombination['count']).to.equal(2)
      expect(secondHighCombination['card']).to.equal('4')
    })
  
    it("knows its Two Pair combination", function(){
      var cards = ["2C", "2S", "4H", "4D", "AH"]
      var hand = new Hand(cards)
      hand.composeCards()
      expect(hand.rank()).to.equal('twoPair')
    });
  });
});