module.exports = function PokerService() {
  this.winnerHand = function(hands) {
    var ranks = hands.map(hand => { return hand.rank() })
    var rankScores = ranks.map(rank => { return this.scoreRank(rank) })
    var higherRank = Math.max.apply( null, rankScores );
    var higherRankIndex = rankScores.indexOf(higherRank)
    return hands[higherRankIndex]
  }

  this.scoreRank = function(rank) {
    var scores = {
      'high_card': 0,
      'pair': 1,
      'twoPair': 2,
      'threeOfaKind': 3,
      'fourOfaKind': 4,
    }
    return scores[rank]
  }
}